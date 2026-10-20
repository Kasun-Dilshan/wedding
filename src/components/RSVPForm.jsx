import { useRef, useState } from "react"

function whatsappLink(wedding, message) {
  const phone = String(wedding.rsvpPhone || "").replace(/\D/g, "")
  if (!phone) return ""
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export default function RSVPForm({ wedding }) {
  const dialogRef = useRef(null)
  const [name, setName] = useState("")
  const [attending, setAttending] = useState("yes")
  const [guests, setGuests] = useState("1")
  const [note, setNote] = useState("")
  const [error, setError] = useState("")
  const [done, setDone] = useState(null)

  function openForm() {
    setDone(null)
    setError("")
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }

  function closeForm() {
    dialogRef.current?.close()
  }

  function onSubmit(event) {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError("Please add your name so the couple knows who replied.")
      return
    }
    const response = attending === "yes" ? "Joyfully accepts" : "Regretfully declines"
    const guestCount = attending === "yes" ? guests : "0"
    const message = [
      `Wedding RSVP for ${wedding.bride.name} & ${wedding.groom.name}`,
      `Name: ${trimmed}`,
      `Response: ${response}`,
      `Guests: ${guestCount}`,
      note.trim() ? `Note: ${note.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n")
    const link = whatsappLink(wedding, message)
    if (link) window.open(link, "_blank", "noopener,noreferrer")
    setError("")
    setDone({ whatsapp: Boolean(link) })
  }

  function onDialogClick(event) {
    if (event.target === dialogRef.current) closeForm()
  }

  return (
    <div id="rsvp">
      <div className="center-actions">
        <button type="button" className="btn btn-sage" onClick={openForm}>
          RSVP
        </button>
      </div>
      <dialog ref={dialogRef} className="rsvp-dialog" onClick={onDialogClick}>
        <div className="dialog-head">
          <p className="script kicker">Kindly reply</p>
          <h2 className="block-title">RSVP</h2>
          <button type="button" className="dialog-close" onClick={closeForm} aria-label="Close RSVP form">
            ×
          </button>
        </div>
        <p className="lede">{wedding.rsvpNote}</p>
        {wedding.rsvpPhoneDisplay && <p className="lede">Replies are sent to {wedding.rsvpPhoneDisplay}.</p>}
        {done ? (
          <div>
            <p className="form-success">
              {done.whatsapp
                ? "Thank you. WhatsApp opened with your reply. Send the message when you are ready. The invitation stays here either way."
                : "Thank you. Add an RSVP phone number in the wedding config to deliver this reply on WhatsApp."}
            </p>
            <div className="center-actions">
              <button type="button" className="btn btn-line" onClick={closeForm}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <form className="form-grid" onSubmit={onSubmit} noValidate>
            <label>
              Your name
              <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
            </label>
            <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
              <legend>Will you attend?</legend>
              <div className="choice-row">
                <label>
                  <input type="radio" name="attending" value="yes" checked={attending === "yes"} onChange={() => setAttending("yes")} />
                  Joyfully accepts
                </label>
                <label>
                  <input type="radio" name="attending" value="no" checked={attending === "no"} onChange={() => setAttending("no")} />
                  Regretfully declines
                </label>
              </div>
            </fieldset>
            {attending === "yes" && (
              <label>
                Number of guests
                <select value={guests} onChange={(event) => setGuests(event.target.value)}>
                  {["1", "2", "3", "4", "5", "6"].map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label>
              A note for the couple
              <textarea value={note} onChange={(event) => setNote(event.target.value)} maxLength={400} />
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn btn-gold">
              Send RSVP
            </button>
          </form>
        )}
      </dialog>
    </div>
  )
}
