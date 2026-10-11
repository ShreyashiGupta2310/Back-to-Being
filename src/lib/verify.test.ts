import { describe, expect, it } from 'vitest'
import { verifyBadges } from './verify'

const writing =
  'The path smelled like wet earth after the rain. A man was selling roasted corn and the smoke drifted over everyone. I counted seven crows on the wire, and one kept calling.'

function badge(quote: string, overrides: Record<string, unknown> = {}) {
  return {
    title: 'A Detail',
    meaning: 'Something they noticed.',
    category: 'smell',
    quote,
    ...overrides,
  }
}

describe('verifyBadges', () => {
  it('keeps a badge whose quote is really in the writing', () => {
    const result = verifyBadges(writing, [badge('smelled like wet earth')])
    expect(result.verified).toHaveLength(1)
    expect(result.rejected).toHaveLength(0)
  })

  it('ignores capital letters and punctuation when matching', () => {
    const result = verifyBadges(writing, [badge('The SMOKE drifted, over everyone!')])
    expect(result.verified).toHaveLength(1)
  })

  it('rejects a quote that is not in the writing', () => {
    const result = verifyBadges(writing, [badge('the sun was setting')])
    expect(result.verified).toHaveLength(0)
    expect(result.rejected[0].reason).toBe('The quote is not in your writing')
  })

  it('rejects a quote that only matches part of a word', () => {
    const result = verifyBadges(writing, [badge('cro')])
    expect(result.verified).toHaveLength(0)
  })

  it('rejects an unknown category', () => {
    const result = verifyBadges(writing, [badge('wet earth', { category: 'vibes' })])
    expect(result.verified).toHaveLength(0)
  })

  it('rejects badges with missing fields', () => {
    const result = verifyBadges(writing, [{ title: 'Only a title' }, 'not even an object'])
    expect(result.verified).toHaveLength(0)
    expect(result.rejected).toHaveLength(2)
  })

  it('rejects a second badge that reuses the same quote', () => {
    const result = verifyBadges(writing, [badge('wet earth'), badge('Wet earth.')])
    expect(result.verified).toHaveLength(1)
    expect(result.rejected).toHaveLength(1)
  })

  it('keeps at most 3 badges', () => {
    const result = verifyBadges(writing, [
      badge('wet earth'),
      badge('roasted corn'),
      badge('seven crows'),
      badge('one kept calling'),
    ])
    expect(result.verified).toHaveLength(3)
    expect(result.rejected).toHaveLength(1)
  })
})