import type { badge } from './badges'
import { firstWords } from './text'

// The Social Badge is given by plain code, never by the model.
// It marks the act of sharing, whatever the listener wrote.
export function makeSocialBadge(reflection: string): badge {
  return {
    title: 'Shared and Heard',
    meaning: 'You shared this with someone, and they answered in their own words.',
    category: 'people',
    quote: firstWords(reflection, 12),
  }
}