/** Static trail segments before the current page (Home is added automatically). */
export const ROUTE_BREADCRUMB_TRAILS = {
  'off-plan': [{ label: 'Off-Plan', to: '/off-plan' }],
  rent: [{ label: 'Rent', to: '/rent' }],
  sell: [{ label: 'Sell', to: '/sell' }],
  'grid-map': [
    { label: 'Off-Plan', to: '/off-plan' },
    { label: 'Map', to: '/grid-map' },
  ],
  developers: [{ label: 'Developers', to: '/developers' }],
  'developer-detail': [
    { label: 'Developers', to: '/developers' },
  ],
  communities: [{ label: 'Communities', to: '/communities' }],
  'community-detail': [{ label: 'Communities', to: '/communities' }],
  'property-detail': [{ label: 'Off-Plan', to: '/off-plan' }],
  'why-dubai': [{ label: 'Why Dubai', to: '/why-dubai' }],
  aboutus: [{ label: 'About', to: '/aboutus' }],
  contact: [{ label: 'Contact', to: '/contact' }],
  terms: [{ label: 'Terms', to: '/terms' }],
  privacy: [{ label: 'Privacy', to: '/privacy' }],
  NotFound: [{ label: 'Page not found' }],
}

export function buildBreadcrumbItems(route, currentLabel = null) {
  const items = [{ label: 'Home', to: '/' }]
  const trail = ROUTE_BREADCRUMB_TRAILS[route.name] || []

  trail.forEach((crumb, index) => {
    const isLastInTrail = index === trail.length - 1
    if (isLastInTrail && !currentLabel && crumb.to === route.path) {
      items.push({ label: crumb.label, current: true })
    } else {
      items.push({ label: crumb.label, to: crumb.to })
    }
  })

  if (currentLabel) {
    items.push({ label: currentLabel, current: true })
  } else if (trail.length && !items[items.length - 1].current) {
    const last = items[items.length - 1]
    last.current = true
    delete last.to
  }

  return items
}

/** Hide on homepage hero */
export function shouldShowBreadcrumbs(route) {
  return route.name !== 'index'
}
