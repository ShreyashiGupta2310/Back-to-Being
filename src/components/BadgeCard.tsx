import {
  Eye,
  Heart,
  Users,
  Utensils,
  Volume2,
  Wind,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import type { badge, BadgeCategory } from '../lib/badges'
import { wrapText } from '../lib/text'

interface Look {
  bg: string
  ink: string
  Icon: LucideIcon
}

// One look per category. If a category is missing here, TypeScript complains.
const LOOKS: Record<BadgeCategory, Look> = {
  sound: { bg: '#e8eef7', ink: '#2c4a73', Icon: Volume2 },
  smell: { bg: '#e6f0e4', ink: '#34552f', Icon: Wind },
  sight: { bg: '#f7efd9', ink: '#6b5217', Icon: Eye },
  taste: { bg: '#f6e6d4', ink: '#7a4a1d', Icon: Utensils },
  people: { bg: '#ece5f4', ink: '#4d3a73', Icon: Users },
  feeling: { bg: '#f4e3ec', ink: '#7a3558', Icon: Heart },
    moment: { bg: '#e2eeee', ink: '#2b5555', Icon: Sparkles },
}

export default function BadgeCard({ badge }: { badge: badge }) {
  const { bg, ink, Icon } = LOOKS[badge.category]
  const titleLines = wrapText(badge.title, 18, 2)
  const quoteLines = wrapText(`“${badge.quote}”`, 34, 3)

  return (
    <svg
      viewBox="0 0 320 220"
      role="img"
      aria-label={`${badge.category} badge: ${badge.title}`}
      className="w-full max-w-sm"
    >
      <rect width="320" height="220" rx="16" fill={bg} />
      <rect
        x="8"
        y="8"
        width="304"
        height="204"
        rx="11"
        fill="none"
        stroke={ink}
        strokeOpacity="0.35"
      />

      <text x="24" y="38" fontSize="11" letterSpacing="2" fill={ink} opacity="0.7">
        {badge.category.toUpperCase()}
      </text>
      <g transform="translate(272 22)">
        <Icon size={24} color={ink} />
      </g>

      <text x="24" y="80" fontSize="22" fontWeight="600" fill={ink}>
        {titleLines.map((line, i) => (
          <tspan key={i} x="24" dy={i === 0 ? 0 : 26}>
            {line}
          </tspan>
        ))}
      </text>

      <text x="24" y="150" fontSize="13" fontStyle="italic" fill={ink} opacity="0.85">
        {quoteLines.map((line, i) => (
          <tspan key={i} x="24" dy={i === 0 ? 0 : 18}>
            {line}
          </tspan>
        ))}
      </text>
    </svg>
  )
}