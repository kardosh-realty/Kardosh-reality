/** Dashboard nav for Kardosh Realty admin */

export const MAIN_SITE_URL = import.meta.env.VITE_MAIN_SITE_URL || 'http://localhost:5173'

export const DASHBOARD_NAV = [
  { path: '/', label: 'Dashboard', icon: 'ri-dashboard-line' },
  {
    id: 'offplan',
    label: 'Off Plan',
    icon: 'ri-building-2-line',
    children: [
      { path: '/off-plan/communities', label: 'Communities', icon: 'ri-map-pin-line' },
      { path: '/off-plan/developers', label: 'Developers', icon: 'ri-community-line' },
      { path: '/off-plan/projects', label: 'Projects', icon: 'ri-building-line' },
    ],
  },
  { path: '/inquiries', label: 'Inquiries', icon: 'ri-mail-line' },
  { path: '/testimonials', label: 'Testimonials', icon: 'ri-chat-quote-line' },
  { path: '/blog', label: 'Blog', icon: 'ri-article-line' },
  { path: '/team', label: 'Team', icon: 'ri-team-line' },
  { path: '/notifications', label: 'Notifications', icon: 'ri-notification-3-line' },
  { path: '/reports', label: 'Reports', icon: 'ri-bar-chart-box-line' },
  { path: '/settings', label: 'Settings', icon: 'ri-settings-3-line' },
]
