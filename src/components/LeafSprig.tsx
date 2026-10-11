import { LeafPaths } from './Leaf'

// Where each leaf sits on the stem: position (x, y), angle, and size.
const LEAVES = [
  { x: 40, y: 166, r: -10, s: 0.4 },
  { x: 40, y: 166, r: 85, s: 0.36 },
  { x: 78, y: 136, r: 0, s: 0.38 },
  { x: 78, y: 136, r: 90, s: 0.34 },
  { x: 118, y: 100, r: 5, s: 0.36 },
  { x: 118, y: 100, r: 95, s: 0.32 },
  { x: 156, y: 62, r: 10, s: 0.32 },
  { x: 156, y: 62, r: 100, s: 0.28 },
  { x: 188, y: 24, r: 45, s: 0.3 },
]

// A curved stem with leaves along it. Used as a soft decoration.
export default function LeafSprig({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <path
        d="M8 192 C 56 156, 110 112, 190 22"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {LEAVES.map((leaf, index) => (
        <g
          key={index}
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s}) translate(-50 -96)`}
        >
          <LeafPaths />
        </g>
      ))}
    </svg>
  )
}