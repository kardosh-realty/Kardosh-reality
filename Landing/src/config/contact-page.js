/** Content for /contact */

import { BRAND } from './brand'

export const CONTACT_PAGE_STATS = [
  { value: '24h', label: 'Typical response time' },
  { value: 'Business Bay', label: 'Dubai headquarters' },
  { value: 'EN · AR · PT', label: 'Advisory languages' },
  { value: BRAND.reraLicense, label: 'RERA license no.' },
]

export const CONTACT_EXPECTATIONS = [
  {
    title: 'Tell us your brief',
    text: 'Budget, emirate, off-plan vs ready, and timeline — we align search before sending options.',
  },
  {
    title: 'Curated shortlist',
    text: 'Live projects from our off-plan catalogue with AED pricing and payment plan context.',
  },
  {
    title: 'Licensed next steps',
    text: 'Viewings, reservation, escrow, and SPA guidance with your legal counsel when needed.',
  },
]

export const CONTACT_FAQ = [
  {
    id: 'response',
    question: 'How quickly will you reply?',
    answer:
      'We aim to respond within one business day — WhatsApp is often fastest for international clients across time zones.',
  },
  {
    id: 'offplan',
    question: 'Can you help with off-plan only?',
    answer:
      'Yes. We specialise in UAE off-plan alongside rent, resale, and sell mandates. Tell us your goal in the enquiry form.',
  },
  {
    id: 'visit',
    question: 'Do I need to visit Dubai first?',
    answer:
      'Many buyers reserve remotely with video walkthroughs and developer packs. Site visits can be arranged when you travel.',
  },
  {
    id: 'fees',
    question: 'Are there brokerage fees?',
    answer:
      'Developer-paid commissions on many off-plan sales are standard in Dubai; we explain fee structures transparently before you proceed.',
  },
]
