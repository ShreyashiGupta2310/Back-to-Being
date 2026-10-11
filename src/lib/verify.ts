import { BADGE_CATEGORIES, type badge, type BadgeCategory } from './badges'
import { countWords } from './text'

const MAX_QUOTE_WORDS = 12
const MAX_BADGES = 3


export interface RejectedBadge {
  badge: unknown
  reason: string
}

export interface VerifyResult {
  verified: badge[]
  rejected: RejectedBadge[]
}

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function asBadge(value: unknown): badge | null {
  if (typeof value !== 'object' || value === null) return null
  const v = value as Record<string, unknown>

  if (
    typeof v.title !== 'string' ||
    typeof v.meaning !== 'string' ||
    typeof v.quote !== 'string' ||
    typeof v.category !== 'string'
  ) {
    return null
  }

  if (!(BADGE_CATEGORIES as readonly string[]).includes(v.category)) return null
  if (v.title.trim() === '' || v.meaning.trim() === '') return null

  return {
    title: v.title.trim(),
    meaning: v.meaning.trim(),
    category: v.category as BadgeCategory,
    quote: v.quote.trim(),
  }
}

export function verifyBadges(writing: string, candidates: unknown[]): VerifyResult {
 
  const haystack = ` ${normalize(writing)} `
  const verified: badge[] = []
  const rejected: RejectedBadge[] = []
  const seenQuotes = new Set<string>()

  for (const candidate of candidates) {
    const badge = asBadge(candidate)
    if (!badge) {
      rejected.push({ badge: candidate, reason: 'Missing or invalid fields' })
      continue
    }

    const quote = normalize(badge.quote)
    if (quote === '') {
      rejected.push({ badge: candidate, reason: 'The quote was empty' })
      continue
    }
    if (countWords(badge.quote) > MAX_QUOTE_WORDS) {
      rejected.push({ badge: candidate, reason: 'The quote was too long' })
      continue
    }
    if (!haystack.includes(` ${quote} `)) {
      rejected.push({ badge: candidate, reason: 'The quote is not in your writing' })
      continue
    }
    if (seenQuotes.has(quote)) {
      rejected.push({ badge: candidate, reason: 'This quote was already used' })
      continue
    }
    if (verified.length >= MAX_BADGES) {
      rejected.push({ badge: candidate, reason: 'More than 3 badges' })
      continue
    }

    seenQuotes.add(quote)
    verified.push(badge)
  }

  return { verified, rejected }
}