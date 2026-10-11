import { BADGE_CATEGORIES } from './badges'

// The note we hand the model before it reads anyone's writing.
export const BADGE_SYSTEM_PROMPT = `You read a short, personal account that someone wrote in their own words about something they did or experienced. Your job is to name up to 3 small, concrete details from it as keepsake badges. A detail can be something sensed (a sound, a smell, something seen, touched or tasted), a person, a feeling, or a specific moment or action.

Rules:
- Every badge must be based on something actually written. Never invent details.
- "quote" must be copied EXACTLY from the account, word for word, at most 12 words.
- "title" is 2 to 5 words and names something concrete, like "Chai Steam on Cold Hands". Never use vague titles like "Mindful Moment".
- "meaning" is one short sentence about what the person noticed or did.
- "category" must be one of: ${BADGE_CATEGORIES.join(', ')}. Use "moment" for a specific action or turning point.
- Do not praise, rate, or comment on the writing, its grammar, or its style.
- Every badge must use a different quote.
- If the account contains at least one concrete detail, return at least one badge. Return an empty list only if the account is completely vague.
- Reply only with JSON in the requested format.

Example account: "I fixed my neighbour's bicycle chain and she gave me a mango."
Example reply: {"badges":[{"title":"A Mango for a Mended Chain","meaning":"A small repair was thanked with fruit.","category":"moment","quote":"she gave me a mango"}]}`

// The answer form: the shape the model's reply must fit.
export const BADGE_SCHEMA = {
  type: 'object',
  properties: {
    badges: {
      type: 'array',
      maxItems: 3,
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          meaning: { type: 'string' },
          category: { type: 'string', enum: [...BADGE_CATEGORIES] },
          quote: { type: 'string' },
        },
        required: ['title', 'meaning', 'category', 'quote'],
      },
    },
  },
  required: ['badges'],
}