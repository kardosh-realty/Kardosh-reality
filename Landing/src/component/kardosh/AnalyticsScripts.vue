<script setup>
import { watch } from 'vue'
import { ANALYTICS } from '@/config/marketing'
import { hasAnalyticsConsent } from '@/composables/useCookieConsent'

let analyticsLoaded = false

function gtmAlreadyLoaded() {
  return (
    typeof window.google_tag_manager !== 'undefined' ||
    Boolean(document.querySelector('script[src*="googletagmanager.com/gtm.js"]'))
  )
}

function appendInlineScript(content) {
  const script = document.createElement('script')
  script.textContent = content
  document.head.appendChild(script)
}

function loadAnalytics() {
  if (ANALYTICS.gtmId && !gtmAlreadyLoaded()) {
    appendInlineScript(`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${ANALYTICS.gtmId}');`)
  }

  if (ANALYTICS.gaId && !ANALYTICS.gtmId && !window.gtag) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.gaId}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', ANALYTICS.gaId)
  }

  if (ANALYTICS.metaPixelId && !window.fbq) {
    appendInlineScript(`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${ANALYTICS.metaPixelId}');fbq('track','PageView');`)
  }
}

function tryLoadAnalytics() {
  if (analyticsLoaded || !hasAnalyticsConsent.value) return
  analyticsLoaded = true
  const run = () => loadAnalytics()
  if ('requestIdleCallback' in window) {
    requestIdleCallback(run, { timeout: 5000 })
  } else {
    setTimeout(run, 500)
  }
}

watch(hasAnalyticsConsent, tryLoadAnalytics, { immediate: true })
</script>

<template>
  <noscript v-if="ANALYTICS.gtmId && !gtmAlreadyLoaded()">
    <iframe
      :src="`https://www.googletagmanager.com/ns.html?id=${ANALYTICS.gtmId}`"
      height="0"
      width="0"
      style="display: none; visibility: hidden"
      title="gtm"
    />
  </noscript>
</template>
