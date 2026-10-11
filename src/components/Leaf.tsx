// Just the shapes of one leaf. Other drawings reuse this.
export function LeafPaths() {
  return (
    <>
      <path d="M50 4 C86 26 90 68 50 96 C10 68 14 26 50 4 Z" fill="currentColor" />
      <path
        d="M50 18 L50 92"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M50 42 L67 30 M50 42 L33 30 M50 60 L70 46 M50 60 L30 46 M50 76 L64 66 M50 76 L36 66"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </>
  )
}

// One leaf as a small icon.
export default function Leaf({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <LeafPaths />
    </svg>
  )
}