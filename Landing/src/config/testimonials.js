/**
 * Home testimonials — editable list (Reelly has no reviews API).
 * Portrait URLs: Unsplash (stable CDN).
 */
export const TESTIMONIAL_GRID = { columns: 4, rows: 4 }

export const TESTIMONIALS = [
  {
    text: 'Kardosh Realty made buying our Dubai Marina apartment straightforward. We saved over AED 36,000 in fees and closed in three weeks.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    name: 'Sarah Mitchell',
    role: 'UK Investor',
  },
  {
    text: 'I listed my Business Bay studio and received verified off-plan offers within 48 hours. Transparent AED pricing and RERA-ready documentation throughout.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    name: 'Omar Al Hashimi',
    role: 'Property Seller',
  },
  {
    text: 'The team guided us through payment plans on a Downtown off-plan project. Clear communication at every stage — exactly what we needed from abroad.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    name: 'Priya Nair',
    role: 'First-time Buyer',
  },
  {
    text: 'Curated developer projects and live inventory saved us weeks of research. We reserved our unit with confidence in the developer and escrow process.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    name: 'James Chen',
    role: 'Singapore Investor',
  },
  {
    text: 'Professional, responsive, and deeply knowledgeable about Dubai communities. Kardosh helped us compare Marina vs Hills Estate with real numbers.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
    name: 'Elena Volkov',
    role: 'Relocation Client',
  },
  {
    text: 'From WhatsApp enquiry to site visit scheduling, everything was seamless. We felt supported as international buyers navigating UAE regulations.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    name: 'David Okonkwo',
    role: 'Nigeria Investor',
  },
  {
    text: 'Honest advice on yields and completion timelines — no pressure tactics. Our Dubai Hills investment aligned perfectly with our long-term plan.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
    name: 'Fatima Al Mansoori',
    role: 'UAE National',
  },
  {
    text: 'Brochures, floor plans, and payment schedules in one place. The live catalogue on their site is a huge time-saver for busy executives.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f0c02d9318?w=80&h=80&fit=crop&crop=face',
    name: 'Michael Torres',
    role: 'Corporate Buyer',
  },
  {
    text: 'We completed our Golden Visa property purchase with full transparency. Kardosh coordinated developer, mortgage, and handover milestones brilliantly.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
    name: 'Anna Kowalski',
    role: 'EU Resident',
  },
  {
    text: 'Renting through Kardosh was painless — accurate listings, fair terms, and quick responses when we needed maintenance coordination.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
    name: 'Thomas Berger',
    role: 'Tenant — JLT',
  },
  {
    text: 'We compared three developers on off-plan payment plans side by side. The advisory saved us from overpaying on a secondary launch.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
    name: 'Layla Hassan',
    role: 'Egypt Investor',
  },
  {
    text: 'Site visits, SPA review, and DLD steps were explained clearly. As a first-time Dubai buyer from India, that clarity mattered enormously.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=80&h=80&fit=crop&crop=face',
    name: 'Arjun Mehta',
    role: 'India Investor',
  },
  {
    text: 'Our Palm Jumeirah resale closed faster than expected because pricing was backed by real comparable sales, not guesswork.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face',
    name: 'Marc Dubois',
    role: 'French Seller',
  },
  {
    text: 'Kardosh filtered projects that matched our budget and Golden Visa goals. No time wasted on unsuitable launches.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face',
    name: 'Sofia Andersson',
    role: 'Sweden Investor',
  },
  {
    text: 'Excellent follow-up after handover — introductions to property management and rental yield benchmarks for our two units.',
    image: 'https://images.unsplash.com/photo-1463453091185-913a40d1f325?w=80&h=80&fit=crop&crop=face',
    name: 'Khalid Rahman',
    role: 'Portfolio Landlord',
  },
  {
    text: 'Transparent from day one. We always knew which fees were developer, DLD, or agency — no surprises at signing.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face',
    name: 'Isabella Romano',
    role: 'Italy Buyer',
  },
]

/** Static grid on About page: 4 columns × 2 rows */
export const ABOUT_TESTIMONIAL_GRID = { columns: 4, rows: 2 }

/** Repeat items until `size` is reached (keeps marquee/grid full with few reviews). */
export function padTestimonials(items, size) {
  if (!items?.length || size <= 0) return []
  if (items.length >= size) return items.slice(0, size)
  const out = []
  while (out.length < size) {
    for (const item of items) {
      out.push(item)
      if (out.length >= size) break
    }
  }
  return out
}

export function getAboutPageTestimonials(
  items = TESTIMONIALS,
  { columns = ABOUT_TESTIMONIAL_GRID.columns, rows = ABOUT_TESTIMONIAL_GRID.rows } = {}
) {
  const size = columns * rows
  return padTestimonials(items, size)
}

/** Split flat list into column chunks for the marquee grid (4×4 default). */
export function splitTestimonialsIntoColumns(
  items = TESTIMONIALS,
  columns = TESTIMONIAL_GRID.columns,
  rows = TESTIMONIAL_GRID.rows
) {
  const size = columns * rows
  const pool = padTestimonials(items, size)
  return Array.from({ length: columns }, (_, col) =>
    pool.slice(col * rows, col * rows + rows)
  )
}
