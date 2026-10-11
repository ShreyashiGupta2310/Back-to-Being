import type { badge } from '../lib/badges'

// A saved example. Not a live run.
export const demoWriting =
  'The path smelled like wet earth after the rain. A man was selling roasted corn and the smoke drifted over everyone. I counted seven crows on the wire, and one kept calling.'

export const demoReflection =
  'I never noticed how many small things happen on a short walk. The smoke and the crows made me picture the whole evening, and now I want to walk that way too.'

// The badges a small local model really returned for this account.
export const demoBadges: badge[] = [
  {
    title: 'Wet Earth Smell',
    meaning: 'The path had the scent of wet earth after rain.',
    category: 'smell',
    quote: 'The path smelled like wet earth after the rain.',
  },
  {
    title: 'Drifting Smoke',
    meaning: 'Smoke was moving over the people gathered there.',
    category: 'sight',
    quote: 'the smoke drifted over everyone.',
  },
  {
    title: 'Crow Calling Sound',
    meaning: 'One crow continued to make a sound.',
    category: 'sound',
    quote: 'one kept calling',
  },
]

// One suggestion the checker refused, from a different test run.
export const demoRejected: { reason: string; badge: badge } = {
  reason: 'This quote was already used',
  badge: {
    title: 'Feeling Relaxed',
    meaning: 'The writer noticed a state of relaxation.',
    category: 'feeling',
    quote: 'I felt calm and happy and relaxed.',
  },
}