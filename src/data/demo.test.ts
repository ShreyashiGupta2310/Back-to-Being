import { describe, expect, it } from 'vitest'
import { verifyBadges } from '../lib/verify'
import { demoBadges, demoWriting } from './demo'

describe('demo data', () => {
  it('has badges whose quotes really appear in the demo writing', () => {
    const result = verifyBadges(demoWriting, demoBadges)
    expect(result.verified).toHaveLength(demoBadges.length)
    expect(result.rejected).toHaveLength(0)
  })
})