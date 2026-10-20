export function FlowerCorner({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 140 140" fill="none" aria-hidden="true">
      <path d="M14 126C40 92 54 74 96 34" stroke="currentColor" strokeWidth="1.2" />
      <path d="M30 110c14-8 20-20 16-32" stroke="var(--sage)" strokeWidth="1.1" />
      <path d="M42 102c10 12 24 16 36 10" stroke="var(--sage)" strokeWidth="1.1" />
      <ellipse cx="36" cy="94" rx="9" ry="4.2" transform="rotate(-28 36 94)" fill="color-mix(in srgb, var(--sage) 50%, white)" />
      <ellipse cx="58" cy="108" rx="10" ry="4.4" transform="rotate(18 58 108)" fill="color-mix(in srgb, var(--sage) 42%, white)" />
      <circle cx="104" cy="34" r="11" fill="color-mix(in srgb, var(--blush) 82%, white)" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="104" cy="34" r="4" fill="color-mix(in srgb, var(--rose) 75%, white)" />
      <circle cx="88" cy="24" r="6.5" fill="color-mix(in srgb, var(--blush) 70%, white)" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="118" cy="22" r="5.5" fill="#ffffff" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="120" cy="42" r="5" fill="color-mix(in srgb, var(--blush) 78%, white)" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="90" cy="46" r="4.6" fill="#fff" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  )
}

export function Ornament() {
  return (
    <svg className="ornament" viewBox="0 0 220 28" fill="none" aria-hidden="true">
      <path d="M8 14H78" stroke="currentColor" strokeWidth="1" />
      <path d="M142 14H212" stroke="currentColor" strokeWidth="1" />
      <path d="M86 14c8-8 14-8 24 0 10 8 16 8 24 0" stroke="currentColor" strokeWidth="1" />
      <circle cx="110" cy="14" r="2.4" fill="currentColor" />
    </svg>
  )
}

export function GlowField() {
  return (
    <div className="glow-field" aria-hidden="true">
      {Array.from({ length: 7 }, (_, index) => (
        <span key={index} className={`glow glow-${index + 1}`} />
      ))}
    </div>
  )
}
