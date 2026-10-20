import { useEffect, useState } from "react"
import { weddingDate } from "../lib/calendar.js"

function remaining(target) {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { ended: true }
  const total = Math.floor(diff / 1000)
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

function Cell({ value, label }) {
  return (
    <div className="count-cell">
      <strong>{String(value).padStart(2, "0")}</strong>
      <span>{label}</span>
    </div>
  )
}

export default function CountdownTimer({ wedding }) {
  const dateTime = wedding.dateTime
  const [time, setTime] = useState(() => {
    const target = weddingDate(wedding)
    return target ? remaining(target) : null
  })

  useEffect(() => {
    const target = weddingDate({ dateTime })
    if (!target) return undefined
    const timer = window.setInterval(() => setTime(remaining(target)), 1000)
    return () => window.clearInterval(timer)
  }, [dateTime])

  const target = weddingDate(wedding)

  return (
    <section id="countdown" className="section no-print" aria-label="Countdown to the wedding">
      <div className="section-narrow">
        <p className="script kicker">Until we say I do</p>
        <h2>{wedding.dateLabel}</h2>
        {!target && <p className="lede">The wedding time will appear here once a date is added.</p>}
        {target && time?.ended && <p className="lede">The wedding day has arrived.</p>}
        {target && time && !time.ended && (
          <div className="countdown-grid">
            <Cell value={time.days} label="Days" />
            <Cell value={time.hours} label="Hours" />
            <Cell value={time.minutes} label="Minutes" />
            <Cell value={time.seconds} label="Seconds" />
          </div>
        )}
      </div>
    </section>
  )
}
