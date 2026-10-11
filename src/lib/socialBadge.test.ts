import { describe, expect, it } from 'vitest'
import { makeSocialBadge } from './socialBadge'

describe('makeSocialBadge', () => {
  it('gives the same badge whether the words are kind or harsh', () => {
    const kind = makeSocialBadge('This was wonderful and I loved every single part of it.')
    const harsh = makeSocialBadge('Honestly I found this boring and I did not really get it.')
    expect(kind.title).toBe(harsh.title)
    expect(kind.meaning).toBe(harsh.meaning)
    expect(kind.category).toBe(harsh.category)
  })

  it('quotes at most 12 words of the reflection', () => {
    const long = Array.from({ length: 40 }, (_, i) => `word${i}`).join(' ')
    const badge = makeSocialBadge(long)
    expect(badge.quote.split(' ')).toHaveLength(12)
  })
})