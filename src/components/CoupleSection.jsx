import { useState } from "react"

function Portrait({ src, alt, position, initial }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className="medallion script" aria-hidden="true">
        {initial}
      </div>
    )
  }
  return (
    <img
      className="portrait"
      src={src}
      alt={alt}
      style={{ objectPosition: position || "center 20%" }}
      onError={() => setFailed(true)}
    />
  )
}

function Person({ person }) {
  return (
    <article className="person-card">
      <Portrait
        src={person.photo}
        alt={person.name}
        position={person.photoPosition}
        initial={person.shortName?.charAt(0) || person.name.charAt(0)}
      />
      <p className="script role-label">{person.role}</p>
      <h3>{person.name}</h3>
      <p className="parents">{person.parents}</p>
      <p className="bio">{person.bio}</p>
    </article>
  )
}

export default function CoupleSection({ wedding }) {
  const [photoFailed, setPhotoFailed] = useState(false)
  const coupleSrc = wedding.photos?.couple || ""
  const coupleAlt = `${wedding.bride.name} and ${wedding.groom.name}`

  return (
    <section id="couple" className="section">
      <div className="section-inner">
        <p className="script kicker">The couple</p>
        <h2>
          {wedding.bride.shortName} & {wedding.groom.shortName}
        </h2>
        <p className="lede">{wedding.story}</p>
        {coupleSrc && !photoFailed && (
          <div className="couple-frame">
            <img
              className="couple-photo"
              src={coupleSrc}
              alt={coupleAlt}
              width="900"
              height="1200"
              loading="lazy"
              decoding="async"
              onError={() => setPhotoFailed(true)}
            />
          </div>
        )}
        {(!coupleSrc || photoFailed) && (
          <div className="couple-frame medallion script" aria-hidden="true">
            {wedding.bride.shortName?.charAt(0)}
            {wedding.groom.shortName?.charAt(0)}
          </div>
        )}
        <div className="person-grid" style={{ marginTop: "1.4rem" }}>
          <Person person={wedding.bride} />
          <Person person={wedding.groom} />
        </div>
      </div>
    </section>
  )
}
