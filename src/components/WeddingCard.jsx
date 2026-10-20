import { FlowerCorner, Ornament } from "./decor.jsx"
import { monogram } from "../lib/meta.js"

export default function WeddingCard({ wedding }) {
  if (wedding.cardImage) {
    return (
      <article id="invitation" className="invite-card invite-card-image">
        <img
          className="invite-card-photo"
          src={wedding.cardImage}
          alt={`Wedding invitation for ${wedding.bride.shortName} and ${wedding.groom.shortName}`}
        />
      </article>
    )
  }

  return (
    <article id="invitation" className="invite-card">
      <FlowerCorner className="corner corner-tl" />
      <FlowerCorner className="corner corner-tr" />
      <FlowerCorner className="corner corner-bl" />
      <FlowerCorner className="corner corner-br" />
      <div className="card-inner">
        <p className="script card-monogram" aria-hidden="true">
          {monogram(wedding)}
        </p>
        <p className="script host-line">{wedding.hostLine}</p>
        <h1 className="couple-names">
          <span>{wedding.bride.name}</span>
          <span className="amp">&</span>
          <span>{wedding.groom.name}</span>
        </h1>
        <Ornament />
        <p className="invite-message">{wedding.invitationMessage}</p>
        <dl className="detail-list">
          <div>
            <dt>Wedding Date</dt>
            <dd>{wedding.dateLabel}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{wedding.timeLabel}</dd>
          </div>
          <div>
            <dt>Venue</dt>
            <dd>
              {wedding.venue.name}
              <div className="sub">{wedding.venue.address}</div>
            </dd>
          </div>
          <div>
            <dt>Reception Details</dt>
            <dd>{wedding.receptionDetails}</dd>
          </div>
        </dl>
        <Ornament />
        <p className="closing-message">{wedding.closingMessage}</p>
        <p className="script card-footer">{wedding.footerMessage}</p>
      </div>
    </article>
  )
}
