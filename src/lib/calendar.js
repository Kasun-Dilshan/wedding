function pad(value) {
  return String(value).padStart(2, "0")
}

export function weddingDate(wedding) {
  const date = new Date(wedding.dateTime)
  return Number.isNaN(date.getTime()) ? null : date
}

function stamp(date) {
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    "Z"
  )
}

function escapeIcs(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
}

export function googleCalendarUrl(wedding) {
  const start = weddingDate(wedding)
  if (!start) return ""
  const hours = Number(wedding.calendarHours) || 5
  const end = new Date(start.getTime() + hours * 60 * 60 * 1000)
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Wedding of ${wedding.bride.name} & ${wedding.groom.name}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: `${wedding.invitationMessage}. ${wedding.receptionDetails}`,
    location: `${wedding.venue.name}, ${wedding.venue.address}`,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function downloadIcs(wedding) {
  const start = weddingDate(wedding)
  if (!start) return false
  const hours = Number(wedding.calendarHours) || 5
  const end = new Date(start.getTime() + hours * 60 * 60 * 1000)
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${wedding.slug}@wedding-invitation`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escapeIcs(`Wedding of ${wedding.bride.name} & ${wedding.groom.name}`)}`,
    `LOCATION:${escapeIcs(`${wedding.venue.name}, ${wedding.venue.address}`)}`,
    `DESCRIPTION:${escapeIcs(`${wedding.hostLine} ${wedding.invitationMessage} ${wedding.receptionDetails}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${wedding.slug}-wedding.ics`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
  return true
}
