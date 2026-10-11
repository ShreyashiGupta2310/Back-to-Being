import type { badge } from "./badges";

export interface Draft {
  writing: string
  reflection: string
}

export interface ritual{
  id: string
  sealedAt: string
  writing: string
  reflection: string
  badges: badge[]
}

const DRAFT_KEY = 'back-to-being:draft'
const RITUALS_KEY = 'back-to-being:rituals'

const emptyDraft: Draft = { writing: '', reflection: '' }

export function loadDraft(): Draft {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return { ...emptyDraft }
    return { ...emptyDraft, ...JSON.parse(raw) }
  } catch {
    return { ...emptyDraft }
  }
}

export function saveDraft(draft: Draft): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  } catch {
    // storage is full or blocked; the page stillll works, it just won't remember it.......
  }
}


export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY)
  } catch {
    // nothing to do if storage is blocked
  }
}


export function loadRituals(): ritual[] {
  try {
    const raw = localStorage.getItem(RITUALS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}


export function addRitual(ritual: ritual): boolean {
  try {
    localStorage.setItem(RITUALS_KEY, JSON.stringify([ritual, ...loadRituals()]))
    return true
  } catch {
    return false
  }
}

// The seal: turn the draft into a locked ritual.
export function sealDraft(): ritual {
  const draft = loadDraft()
  const ritual: ritual = {
    id: crypto.randomUUID(),
    sealedAt: new Date().toISOString(),
    writing: draft.writing,
    reflection: draft.reflection,
    badges: [],
  }
  const saved = addRitual(ritual)
  if (saved) clearDraft() 
  return ritual
}


export function saveBadges(ritualId: string, badges: badge[]): boolean {
  try {
    const updated = loadRituals().map((ritual) =>
      ritual.id === ritualId ? { ...ritual, badges } : ritual,
    )
    localStorage.setItem(RITUALS_KEY, JSON.stringify(updated))
    return true
  } catch {
    return false
  }
}
// Removes one sealed ritual for good.
export function deleteRitual(ritualId: string): boolean {
  try {
    const remaining = loadRituals().filter((ritual) => ritual.id !== ritualId)
    localStorage.setItem(RITUALS_KEY, JSON.stringify(remaining))
    return true
  } catch {
    return false
  }
}