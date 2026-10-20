import { useEffect, useMemo, useRef, useState } from "react"

const COLORS = [
  { from: "#e10600", to: "#8b0000" },
  { from: "#c41e3a", to: "#7a0018" },
  { from: "#d32f2f", to: "#9a0007" },
  { from: "#b71c1c", to: "#6d0000" },
  { from: "#ff1744", to: "#c62828" },
  { from: "#ad1457", to: "#880e4f" },
]

function createPetals() {
  const mobile = window.matchMedia("(max-width: 700px)").matches
  const count = mobile ? 16 : 24
  return Array.from({ length: count }, (_, id) => {
    const sideways = id % 3 === 0
    const tone = COLORS[id % COLORS.length]
    return {
      id,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * -14}s`,
      duration: `${10 + Math.random() * 8}s`,
      drift: `${sideways ? 70 + Math.random() * 150 : -40 + Math.random() * 80}px`,
      spin: `${160 + Math.random() * 380}deg`,
      size: 14 + Math.random() * (mobile ? 12 : 16),
      from: tone.from,
      to: tone.to,
      opacity: 0.92 + Math.random() * 0.08,
    }
  })
}

export default function FallingPetals({ active = false, front = false }) {
  const layerRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const petals = useMemo(() => (active ? createPetals() : []), [active])

  useEffect(() => {
    const onChange = () => setPaused(document.hidden)
    document.addEventListener("visibilitychange", onChange)
    return () => document.removeEventListener("visibilitychange", onChange)
  }, [])

  if (!active) return null

  return (
    <div
      ref={layerRef}
      className={`petal-layer no-print ${front ? "petals-front" : "petals-back"}${paused ? " is-paused" : ""}`}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.35,
            background: `linear-gradient(145deg, ${petal.from}, ${petal.to})`,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
            "--drift": petal.drift,
            "--spin": petal.spin,
            "--petal-opacity": petal.opacity,
          }}
        />
      ))}
    </div>
  )
}
