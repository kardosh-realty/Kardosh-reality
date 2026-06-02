import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { BRAND, RERA_LICENSE_LABEL } from '@/config/brand'
import { BRAND_LOGO } from '@/config/brand-assets'
import { site } from '@/composables/useSiteSettings'
import { sourceLabel } from '@/services/reports'
import { leadStatusLabel } from '@/utils/leadFilters'

const SLATE_RGB = [71, 85, 105]
const FALLBACK_PRIMARY_RGB = [30, 58, 95]

function readCssColor(varName, fallback) {
  if (typeof document === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  return value || fallback
}

function hexToRgb(hex) {
  if (!hex) return null
  const raw = String(hex).trim()
  const m = raw.match(/^#([0-9a-f]{3,8})$/i)
  if (m) {
    let h = m[1]
    if (h.length === 3) h = h.split('').map((c) => c + c).join('')
    if (h.length < 6) return null
    const n = Number.parseInt(h.slice(0, 6), 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  }
  const rgbMatch = raw.match(/^rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)/)
  if (rgbMatch) {
    return [Number(rgbMatch[1]), Number(rgbMatch[2]), Number(rgbMatch[3])]
  }
  return null
}

/** Live theme from the active website/dashboard palette (CSS variables). */
export function getReportTheme() {
  const primaryHex =
    readCssColor('--btn-primary-bg', '') || readCssColor('--color-primary', '#1e3a5f')
  const primaryRgb = hexToRgb(primaryHex) || FALLBACK_PRIMARY_RGB
  const rowTintRgb = primaryRgb.map((c) => Math.min(255, Math.round(c * 0.06 + 255 * 0.94)))
  return {
    primaryHex,
    primaryRgb,
    rowTintRgb,
    logoUrl: site.logo || BRAND_LOGO,
  }
}

function formatDateTime(iso) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso))
}

function formatGeneratedAt() {
  return formatDateTime(new Date().toISOString())
}

function escapeCsv(val) {
  const s = String(val ?? '').trim()
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function csvRow(cells) {
  return cells.map(escapeCsv).join(',')
}

function sectionHeader(title) {
  return csvRow([title, '', '', '', '', '', '', '', '', '', ''])
}

function truncate(text, max = 120) {
  const s = String(text ?? '').replace(/\s+/g, ' ').trim()
  if (s.length <= max) return s
  return `${s.slice(0, max - 1)}…`
}

function resolveAssetUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  if (typeof window === 'undefined') return path
  return new URL(path, window.location.origin).href
}

function imageToPngDataUrl(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const w = img.naturalWidth || 320
      const h = img.naturalHeight || 80
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas unavailable'))
        return
      }
      ctx.drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = () => reject(new Error(`Could not load image: ${src}`))
    img.src = src
  })
}

async function loadReportLogo(logoUrl) {
  const url = resolveAssetUrl(logoUrl)
  if (!url) return null
  try {
    return await imageToPngDataUrl(url)
  } catch {
    try {
      const res = await fetch(url, { mode: 'cors' })
      if (!res.ok) return null
      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      try {
        return await imageToPngDataUrl(objectUrl)
      } finally {
        URL.revokeObjectURL(objectUrl)
      }
    } catch {
      return null
    }
  }
}

export function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export function downloadCsv(filename, content) {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8' })
  downloadBlob(filename, blob)
}

function reportStamp() {
  return new Date().toISOString().slice(0, 10)
}

function buildReportMeta({ periodLabel, leads }) {
  return {
    title: `${BRAND.name} — Inquiries Report`,
    periodLabel,
    generatedAt: formatGeneratedAt(),
    totalInquiries: leads.length,
  }
}

/** Structured CSV with clear sections for Excel / Google Sheets. */
export function exportReportCsv({ leads, periodLabel, stats, sourceRows }) {
  const meta = buildReportMeta({ periodLabel, leads })
  const lines = [
    csvRow(['Report', meta.title]),
    csvRow(['Period', meta.periodLabel]),
    csvRow(['Generated', meta.generatedAt]),
    csvRow(['Total inquiries', meta.totalInquiries]),
    csvRow(['RERA', RERA_LICENSE_LABEL.replace('RERA License No. ', '')]),
    csvRow([]),
    sectionHeader('SUMMARY METRICS'),
    csvRow(['Metric', 'Value']),
    ...stats.map((s) => csvRow([s.title, s.exportValue ?? s.value])),
    csvRow([]),
    sectionHeader('INQUIRY SOURCES'),
    csvRow(['Source', 'Count', 'Share']),
    ...(sourceRows.length
      ? sourceRows.map((r) => csvRow([r.source, r.count, r.percent]))
      : [csvRow(['—', 0, '0%'])]),
    csvRow([]),
    sectionHeader('INQUIRY DETAILS'),
    csvRow([
      'Name',
      'Email',
      'Phone',
      'Status',
      'Interest',
      'Project',
      'Project ID',
      'Source',
      'Message',
      'Internal notes',
      'Received',
    ]),
    ...leads.map((l) =>
      csvRow([
        l.name,
        l.email,
        l.phone,
        leadStatusLabel(l.status || 'new'),
        l.listing_type,
        l.project_name || 'General',
        l.project_id,
        sourceLabel(l.source),
        l.message,
        l.internal_notes,
        formatDateTime(l.created_at),
      ])
    ),
  ]
  downloadCsv(`kardosh-inquiries-report-${reportStamp()}.csv`, lines.join('\r\n'))
}

function tableStyles(theme) {
  return {
    headStyles: {
      fillColor: theme.primaryRgb,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      cellPadding: 4,
    },
    alternateRowStyles: { fillColor: theme.rowTintRgb },
    bodyStyles: {
      fontSize: 8,
      textColor: [30, 41, 59],
      cellPadding: 3,
      overflow: 'linebreak',
    },
    columnStyles: {},
    margin: { left: 14, right: 14 },
  }
}

function drawReportHeader(doc, meta, theme) {
  const pageW = doc.internal.pageSize.getWidth()
  const hasLogo = Boolean(theme.logoDataUrl)
  const headerH = hasLogo ? 42 : 36

  doc.setFillColor(...theme.primaryRgb)
  doc.rect(0, 0, pageW, headerH, 'F')

  let textX = 14
  if (hasLogo) {
    const logoW = 44
    const logoH = 12
    const padX = 12
    const padY = 11
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(padX, padY, logoW + 6, logoH + 6, 2, 2, 'F')
    doc.addImage(theme.logoDataUrl, 'PNG', padX + 3, padY + 3, logoW, logoH)
    textX = padX + logoW + 12
  }

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(hasLogo ? 14 : 16)
  doc.text('Inquiries Report', textX, hasLogo ? 17 : 16)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(`${meta.periodLabel}  ·  Generated ${meta.generatedAt}`, textX, hasLogo ? 24 : 24)
  doc.text(`${meta.totalInquiries} inquiries  ·  ${RERA_LICENSE_LABEL}`, textX, hasLogo ? 31 : 31)
  doc.setTextColor(...SLATE_RGB)
  return headerH + 6
}

function drawContinuationHeader(doc, meta, theme) {
  doc.setFillColor(...theme.primaryRgb)
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 10, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text(`${BRAND.name} — ${meta.periodLabel}`, 14, 7)
}

function drawPageFooter(doc, theme) {
  const pageCount = doc.getNumberOfPages()
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setDrawColor(...theme.rowTintRgb)
    doc.line(14, pageH - 16, pageW - 14, pageH - 16)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...SLATE_RGB)
    doc.text(BRAND.name, 14, pageH - 8)
    doc.text(`Page ${i} of ${pageCount}`, pageW - 14, pageH - 8, { align: 'right' })
  }
}

/** Branded multi-page PDF — uses live palette colors and site logo. */
export async function exportReportPdf({ leads, periodLabel, stats, sourceRows }) {
  const meta = buildReportMeta({ periodLabel, leads })
  const baseTheme = getReportTheme()
  const logoDataUrl = await loadReportLogo(baseTheme.logoUrl)
  const theme = { ...baseTheme, logoDataUrl }

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  let startY = drawReportHeader(doc, meta, theme)
  const styles = tableStyles(theme)

  autoTable(doc, {
    startY,
    head: [['Summary metric', 'Value']],
    body: stats.map((s) => [s.title, String(s.exportValue ?? s.value)]),
    ...styles,
    theme: 'plain',
    tableWidth: 'auto',
  })

  startY = doc.lastAutoTable.finalY + 10

  autoTable(doc, {
    startY,
    head: [['Inquiry source', 'Count', 'Share']],
    body: sourceRows.length
      ? sourceRows.map((r) => [r.source, String(r.count), r.percent])
      : [['—', '0', '0%']],
    ...styles,
    theme: 'plain',
  })

  startY = doc.lastAutoTable.finalY + 10

  const inquiryRows = leads.map((l) => [
    l.name || '—',
    [l.email, l.phone].filter(Boolean).join('\n') || '—',
    leadStatusLabel(l.status || 'new'),
    l.project_name || 'General',
    sourceLabel(l.source),
    truncate(l.message, 80) || '—',
    formatDateTime(l.created_at),
  ])

  autoTable(doc, {
    startY,
    head: [['Name', 'Contact', 'Status', 'Project', 'Source', 'Message', 'Received']],
    body: inquiryRows,
    ...styles,
    theme: 'striped',
    styles: { fontSize: 7, cellPadding: 2.5 },
    columnStyles: {
      0: { cellWidth: 22 },
      1: { cellWidth: 32 },
      5: { cellWidth: 38 },
      6: { cellWidth: 28 },
    },
    didDrawPage: (data) => {
      if (data.pageNumber > 1) drawContinuationHeader(doc, meta, theme)
    },
  })

  drawPageFooter(doc, theme)
  doc.save(`kardosh-inquiries-report-${reportStamp()}.pdf`)
}

/** Download CSV then PDF (short delay avoids some browsers blocking the second file). */
export async function exportReportBundle(payload) {
  exportReportCsv(payload)
  await new Promise((r) => setTimeout(r, 400))
  await exportReportPdf(payload)
}
