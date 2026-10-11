export interface RitualStep{
    title: string,
    when: string,
    description:string
}

export const ritualsteps : RitualStep[]=[
    {
    title: 'Go out',
    when: 'Day 1',
    description:
      'Step outside and notice what is around you. No photos, no notes, no AI. Nothing has to be special.',
  },
  {
    title: 'Remember',
    when: 'In between',
    description:
      'Let the experience settle. Trust what stays with you and what fades.',
  },
  {
    title: 'Write',
    when: 'Day 2',
    description:
      'Describe it in your own words. No rewriting tools, no polishing. Plain and honest is the goal.',
  },
  {
    title: 'Share',
    when: 'Day 2 or 3',
    description:
      'Tell someone. They write four or five lines of their own about what they noticed.',
  },
]

export const rules: string[] = [
  'Nothing here takes photos, records audio, or accepts uploads.',
  'No AI touches your words until you and your listener are both finished.',
  'After you seal, a small model on your own computer names your badges. Nothing is sent anywhere.',
  'Badges are private keepsakes, not something to post or compare.',
]