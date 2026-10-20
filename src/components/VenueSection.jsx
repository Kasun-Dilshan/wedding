import { MapPin } from "lucide-react"

export default function VenueSection({ wedding }) {
  const { venue } = wedding
  return (
    <section id="venue" className="section">
      <div className="section-narrow">
        <p className="script kicker">Where to join us</p>
        <h2>Venue</h2>
        <div className="venue-card">
          <p className="venue-name">{venue.name}</p>
          <p className="venue-address">{venue.address}</p>
          <p className="reception-copy">{wedding.receptionDetails}</p>
          {venue.mapsUrl && (
            <div className="center-actions">
              <a className="btn btn-gold" href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin size={18} aria-hidden="true" />
                Open in Google Maps
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
