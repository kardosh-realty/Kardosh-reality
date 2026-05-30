const STAGE_LABELS = {
  on_booking: 'On booking',
  during_construction: 'During construction',
  on_handover: 'On handover',
  post_handover: 'Post-handover',
}

function formatEoi(value) {
  if (value === undefined || value === null || value === '') return null
  const n = Number(String(value).replace(/[^\d.]/g, ''))
  if (!Number.isFinite(n) || n <= 0) return null
  return n
}

function normalizeStep(step, depth = 0) {
  if (!step || depth > 4) return null
  const children = (step.children || [])
    .map((c) => normalizeStep(c, depth + 1))
    .filter(Boolean)

  const pct = Number(step.percentage)
  return {
    id: step.id,
    name: step.name || step.label || 'Payment stage',
    percentage: Number.isFinite(pct) ? pct : null,
    stageType: step.stage_type || step.stageType || null,
    stageLabel: STAGE_LABELS[step.stage_type] || step.name || 'Stage',
    notes: step.notes || '',
    fixedAmount: step.fixed_amount != null && step.fixed_amount !== '' ? Number(step.fixed_amount) : null,
    start: step.start || null,
    end: step.end || null,
    children,
  }
}

function bucketPercentages(steps) {
  let onBooking = 0
  let duringConstruction = 0
  let onHandover = 0
  let postHandover = 0

  for (const s of steps) {
    const p = s.percentage || 0
    switch (s.stageType) {
      case 'on_booking':
        onBooking += p
        break
      case 'during_construction':
        duringConstruction += p
        break
      case 'on_handover':
        onHandover += p
        break
      case 'post_handover':
        postHandover += p
        break
      default:
        break
    }
  }

  const beforeHandover = onBooking + duringConstruction
  const hasPostHandover = postHandover > 0
  const splitBefore = Math.round(beforeHandover)
  const splitAfter = Math.round(hasPostHandover ? postHandover : onHandover)
  const total = steps.reduce((sum, s) => sum + (s.percentage || 0), 0)

  return {
    onBooking,
    duringConstruction,
    onHandover,
    postHandover,
    beforeHandover,
    splitBefore,
    splitAfter,
    hasPostHandover,
    totalPercentage: Math.round(total),
    showSplitRatio: total > 0 && !(steps.length === 1 && steps[0]?.percentage >= 99),
  }
}

function normalizePlan(plan, index) {
  if (!plan) return null
  const steps = (plan.steps || plan.milestones || [])
    .map((s) => normalizeStep(s))
    .filter(Boolean)

  return {
    id: plan.id ?? index,
    name: plan.name || plan.title || `Payment plan ${index + 1}`,
    description: plan.description || '',
    eoi: formatEoi(plan.eoi),
    durationMonths: plan.duration_months ?? null,
    monthsAfterHandover: plan.months_after_handover ?? null,
    isHandover: Boolean(plan.is_handover),
    modified: plan.modified || plan.updated || null,
    steps,
    ...bucketPercentages(steps),
  }
}

/** Reelly project `payment_plans` → UI-ready structure */
export function normalizePaymentPlans(raw) {
  if (!raw) return []
  const list = Array.isArray(raw) ? raw : [raw]
  return list.map(normalizePlan).filter(Boolean)
}

export function formatPaymentStageType(stageType) {
  return STAGE_LABELS[stageType] || stageType?.replace(/_/g, ' ') || 'Stage'
}
