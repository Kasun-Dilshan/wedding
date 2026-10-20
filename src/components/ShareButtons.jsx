import { CalendarPlus, Printer } from "lucide-react"
import { downloadIcs, googleCalendarUrl, weddingDate } from "../lib/calendar.js"
import { invitationPath } from "../lib/meta.js"

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 17.2L1 23l5.9-1.1A11 11 0 0 0 20.5 3.5zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.5.7.7-3.4-.2-.3A9.1 9.1 0 1 1 12 20.5zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 12 12 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3z" />
    </svg>
  )
}

export default function ShareButtons({ wedding }) {
  const shareUrl = `${window.location.origin}${invitationPath(wedding)}`
  const shareText = `${wedding.bride.shortName} & ${wedding.groom.shortName} invite you to their wedding on ${wedding.dateLabel}. ${shareUrl}`
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(shareText)}`
  const calendar = googleCalendarUrl(wedding)
  const canCalendar = Boolean(weddingDate(wedding))

  return (
    <div className="center-actions">
      <a className="btn btn-line" href={whatsapp} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
        Share on WhatsApp
      </a>
      <button type="button" className="btn btn-line" onClick={() => downloadIcs(wedding)} disabled={!canCalendar}>
        <CalendarPlus size={18} aria-hidden="true" />
        Add to Calendar
      </button>
      {calendar && (
        <a className="btn btn-line" href={calendar} target="_blank" rel="noopener noreferrer">
          Google Calendar
        </a>
      )}
      <button type="button" className="btn btn-line" onClick={() => window.print()}>
        <Printer size={18} aria-hidden="true" />
        Download / Print
      </button>
    </div>
  )
}
