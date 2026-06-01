import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { BRAND, RERA_LICENSE_LABEL } from '@/config/brand'
import { sourceLabel } from '@/services/reports'
import { leadStatusLabel } from '@/utils/leadFilters'

/** Brand green — matches Kardosh primary palette */
const BRAND_RGB = [0, 166, 62]
const SLATE_RGB = [71, 85, 105]
const LIGHT_ROW_RGB = [248, 250, 252]

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

function tableStyles() {
  return {
    headStyles: {
      fillColor: BRAND_RGB,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      cellPadding: 4,
    },
    alternateRowStyles: { fillColor: LIGHT_ROW_RGB },
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

function drawReportHeader(doc, meta, y = 14) {
  const pageW = doc.internal.pageSize.getWidth()
  doc.setFillColor(...BRAND_RGB)
  doc.rect(0, 0, pageW, 36, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text(meta.title, 14, 16)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(`${meta.periodLabel}  ·  Generated ${meta.generatedAt}`, 14, 24)
  doc.text(`${meta.totalInquiries} inquiries  ·  ${RERA_LICENSE_LABEL}`, 14, 31)
  doc.setTextColor(...SLATE_RGB)
  return 44
}

function drawPageFooter(doc) {
  const pageCount = doc.getNumberOfPages()
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setDrawColor(226, 232, 240)
    doc.line(14, pageH - 16, pageW - 14, pageH - 16)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...SLATE_RGB)
    doc.text(BRAND.name, 14, pageH - 8)
    doc.text(`Page ${i} of ${pageCount}`, pageW - 14, pageH - 8, { align: 'right' })
  }
}

/** Branded multi-page PDF with summary, sources, and inquiry tables. */
export function exportReportPdf({ leads, periodLabel, stats, sourceRows }) {
  const meta = buildReportMeta({ periodLabel, leads })
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  let startY = drawReportHeader(doc, meta)

  autoTable(doc, {
    startY,
    head: [['Summary metric', 'Value']],
    body: stats.map((s) => [s.title, String(s.exportValue ?? s.value)]),
    ...tableStyles(),
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
    ...tableStyles(),
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
    ...tableStyles(),
    theme: 'striped',
    styles: { fontSize: 7, cellPadding: 2.5 },
    columnStyles: {
      0: { cellWidth: 22 },
      1: { cellWidth: 32 },
      5: { cellWidth: 38 },
      6: { cellWidth: 28 },
    },
    didDrawPage: (data) => {
      if (data.pageNumber > 1) {
        doc.setFillColor(...BRAND_RGB)
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 10, 'F')
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(8)
        doc.setFont('helvetica', 'bold')
        doc.text(`${meta.title} — ${meta.periodLabel}`, 14, 7)
      }
    },
  })

  drawPageFooter(doc)
  doc.save(`kardosh-inquiries-report-${reportStamp()}.pdf`)
}

/** Download CSV then PDF (short delay avoids some browsers blocking the second file). */
export async function exportReportBundle(payload) {
  exportReportCsv(payload)
  await new Promise((r) => setTimeout(r, 400))
  exportReportPdf(payload)
}
