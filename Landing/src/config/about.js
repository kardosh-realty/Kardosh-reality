/** Content for /aboutus */

import { BRAND } from './brand'

export const ABOUT_STATS = [
  { value: '1,500+', label: 'UAE off-plan projects' },
  { value: '7', label: 'Emirates covered' },
  { value: 'Business Bay', label: 'Dubai headquarters' },
  { value: 'AED', label: 'Transparent pricing' },
]

export const ABOUT_MISSION = {
  eyebrow: 'Our mission',
  title: 'Clarity and confidence for every UAE property decision',
  body: 'Kardosh Realty helps international and regional clients buy, sell, and rent across the Emirates — with curated off-plan stock, live AED pricing, and licensed advisory from first enquiry through handover.',
}

export const ABOUT_PILLARS = [
  {
    title: 'Efficiency',
    desc: 'Fast responses, structured shortlists, and clear next steps from enquiry to reservation.',
  },
  {
    title: 'Transparency',
    desc: 'AED pricing, payment plans, and RERA-aligned documentation — no hidden surprises.',
  },
  {
    title: 'Control',
    desc: 'You set the pace. We guide with data and expertise, never pressure.',
  },
]

export const ABOUT_SERVICES = [
  {
    title: 'Off-plan advisory',
    desc: 'Compare developers, communities, and payment plans from our live Reelly catalogue.',
    to: '/off-plan',
  },
  {
    title: 'Rent & resale',
    desc: 'Verified rental and sale listings with human support for viewings and offers.',
    to: '/rent',
  },
  {
    title: 'Sell with us',
    desc: 'Market your property with professional presentation and qualified buyer outreach.',
    to: '/sell',
  },
  {
    title: 'Investor education',
    desc: 'Why Dubai, Golden Visa context, and community guides for area-first research.',
    to: '/why-dubai',
  },
  {
    title: 'Map discovery',
    desc: 'Explore UAE projects geographically before you shortlist brochures.',
    to: '/grid-map',
  },
  {
    title: 'Developer profiles',
    desc: 'Track records, offices, and active pipelines for leading UAE builders.',
    to: '/developers',
  },
]

export const HOW_WE_WORK = [
  {
    step: '01',
    title: 'Understand your brief',
    text: 'Budget, timeline, emirate, rental vs end-use — we align search criteria before sending options.',
  },
  {
    step: '02',
    title: 'Curate & compare',
    text: 'Live projects, floor plans, and payment schedules in one place — plus community context.',
  },
  {
    step: '03',
    title: 'Advise & reserve',
    text: 'Licensed brokerage support for booking, escrow, and SPA review with your legal counsel.',
  },
  {
    step: '04',
    title: 'Support through handover',
    text: 'Snagging, title deed, and optional property management referrals when you need them.',
  },
]

export const COUNTER_METRICS = [
  { target: 1500, suffix: '+', label: 'Projects in catalogue' },
  { target: 7, suffix: '', label: 'Emirates on platform' },
  { target: 50, suffix: '+', label: 'Developer partners' },
]

export const ABOUT_DIFFERENTIATORS = [
  {
    title: 'Live data',
    text: 'Off-plan stock synced via Reelly so prices and availability stay current.',
  },
  {
    title: 'Licensed brokerage',
    text: `RERA License No. ${BRAND.reraLicense} — regulated workflows and escrow-aware off-plan processes.`,
  },
  {
    title: 'International buyers',
    text: 'English, Arabic, and Portuguese-friendly advisory for overseas clients.',
  },
  {
    title: 'Business Bay office',
    text: 'Floor 10, Metropolis Tower — a central Dubai address for cross-border deals.',
  },
]
