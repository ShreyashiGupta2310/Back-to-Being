export interface Draft {
  writing: string
  reflection: string
}

const DRAFT_KEY = 'back-to-being:draft'

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
    // storage is full or blocked; the page still works, it just won't remember it.......
  }
}