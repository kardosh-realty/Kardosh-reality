import { ref, computed } from 'vue'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

/**
 * Strict admin auth for the dashboard.
 *
 * Authentication: Supabase email/password.
 * Authorization: the signed-in user's email must exist in the `admins` table.
 * Both are enforced in the UI (here) AND in the database via RLS (see SQL in README/notes),
 * so a non-admin session cannot read inquiries or write visibility overrides even if the
 * client guard is bypassed.
 */

const user = ref(null)
const isAdmin = ref(false)
const ready = ref(false)
let initPromise = null

const configured = isSupabaseConfigured()

async function refreshAdmin() {
  if (!user.value || !configured) {
    isAdmin.value = false
    return
  }
  const { data, error } = await supabase
    .from('admins')
    .select('email')
    .eq('email', user.value.email)
    .maybeSingle()
  isAdmin.value = !error && !!data
}

export function initAuth() {
  if (initPromise) return initPromise

  if (!configured) {
    ready.value = true
    initPromise = Promise.resolve()
    return initPromise
  }

  initPromise = (async () => {
    const { data } = await supabase.auth.getSession()
    user.value = data.session?.user ?? null
    await refreshAdmin()

    // NOTE: never `await` Supabase calls directly inside this callback — it runs
    // while the auth lock is held and would deadlock updateUser/getUser. Defer instead.
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
      setTimeout(() => { refreshAdmin() }, 0)
    })

    ready.value = true
  })()

  return initPromise
}

export function ensureAuthReady() {
  return initPromise || initAuth()
}

export function useAuth() {
  async function signIn(email, password) {
    if (!configured) {
      throw new Error('Authentication is not configured. Add Supabase keys to .env.')
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error('Invalid email or password.')

    const { data } = await supabase.auth.getUser()
    user.value = data.user ?? null
    await refreshAdmin()

    if (!isAdmin.value) {
      await supabase.auth.signOut()
      user.value = null
      throw new Error('This account is not authorized to access the dashboard.')
    }
  }

  async function signOut() {
    if (configured) await supabase.auth.signOut()
    user.value = null
    isAdmin.value = false
  }

  return {
    user,
    isAdmin,
    ready,
    configured,
    isAuthenticated: computed(() => Boolean(user.value && isAdmin.value)),
    signIn,
    signOut,
  }
}
