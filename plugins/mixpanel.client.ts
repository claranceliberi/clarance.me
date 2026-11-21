// Core build without the bundled rrweb session recorder: session replay is off,
// so the recorder only added weight to the entry chunk.
import mixpanel from 'mixpanel-browser/dist/mixpanel-core.cjs.js'

export default defineNuxtPlugin(() => {
  mixpanel.init('92b694410fc0c77b742d59416933ed81', {
    api_host: 'https://api-eu.mixpanel.com',
    debug: process.env.NODE_ENV !== 'production',
    track_pageview: true,
    persistence: 'localStorage',
  })

  mixpanel.identify(mixpanel.get_distinct_id())
  const now = new Date().toISOString()
  mixpanel.people.set_once({ first_seen_at: now })
  mixpanel.people.set({
    last_seen_at: now,
    referrer: document.referrer || 'direct',
  })

  return {
    provide: { mixpanel },
  }
})
