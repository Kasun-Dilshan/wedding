import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { getInvitation } from "../data/weddingConfig.js"
import { pageDescription, pageTitle, themeVars } from "../lib/meta.js"
import CoupleSection from "../components/CoupleSection.jsx"
import CountdownTimer from "../components/CountdownTimer.jsx"
import EnvelopeIntro from "../components/EnvelopeIntro.jsx"
import FallingPetals from "../components/FallingPetals.jsx"
import MusicControl from "../components/MusicControl.jsx"
import RSVPForm from "../components/RSVPForm.jsx"
import ShareButtons from "../components/ShareButtons.jsx"
import VenueSection from "../components/VenueSection.jsx"
import WeddingCard from "../components/WeddingCard.jsx"
import WeddingSchedule from "../components/WeddingSchedule.jsx"
import NotFound from "./NotFound.jsx"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export default function InvitationPage({ slug }) {
  const wedding = getInvitation(slug)
  if (!wedding) return <NotFound />
  return <InvitationExperience wedding={wedding} />
}

function InvitationExperience({ wedding }) {
  const musicRef = useRef(null)
  const timerRef = useRef(0)
  const [reduce] = useState(prefersReducedMotion)
  const [phase, setPhase] = useState(() => (prefersReducedMotion() ? "revealed" : "sealed"))

  useEffect(() => {
    document.title = pageTitle(wedding)
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute("content", pageDescription(wedding))
    let themeMeta = document.querySelector('meta[name="theme-color"]')
    if (!themeMeta) {
      themeMeta = document.createElement("meta")
      themeMeta.setAttribute("name", "theme-color")
      document.head.appendChild(themeMeta)
    }
    themeMeta.setAttribute("content", wedding.theme.cream || "#fff7fa")
  }, [wedding])

  useEffect(() => {
    document.body.style.overflow = phase === "revealed" ? "" : "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [phase])

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  function openInvite() {
    if (phase !== "sealed") return
    musicRef.current?.start()
    if (reduce) {
      setPhase("revealed")
      return
    }
    setPhase("opening")
    timerRef.current = window.setTimeout(() => setPhase("revealed"), 2500)
  }

  function skip() {
    musicRef.current?.start()
    window.clearTimeout(timerRef.current)
    setPhase("revealed")
  }

  return (
    <div className="invite-shell" style={themeVars(wedding.theme)}>
      <MusicControl ref={musicRef} musicUrl={wedding.musicUrl} docked={phase === "revealed"} />
      {phase === "revealed" && !reduce && <FallingPetals active front />}
      <AnimatePresence>
        {phase !== "revealed" && (
          <motion.div
            key="intro"
            className="intro-overlay"
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          >
            {phase === "opening" && !reduce && <FallingPetals active front />}
            <EnvelopeIntro wedding={wedding} opening={phase === "opening"} onOpen={openInvite} onSkip={skip} />
          </motion.div>
        )}
      </AnimatePresence>
      {(phase === "opening" || phase === "revealed") && (
        <div className={phase === "revealed" ? "page-content" : "page-preload"} inert={phase === "revealed" ? undefined : true}>
          <nav className="topnav no-print" aria-label="Invitation sections">
            <a className="brand-link" href="#invitation">
              {wedding.bride.shortName} & {wedding.groom.shortName}
            </a>
            <a href="#couple">Couple</a>
            <a href="#schedule">Schedule</a>
            <a href="#venue">Venue</a>
            <a href="#rsvp">RSVP</a>
          </nav>
          <div className="section" style={{ paddingTop: "2.2rem" }}>
            <div className="section-narrow">
              <WeddingCard wedding={wedding} />
            </div>
          </div>
          <CountdownTimer wedding={wedding} />
          <CoupleSection wedding={wedding} />
          <WeddingSchedule wedding={wedding} />
          <VenueSection wedding={wedding} />
          <section className="section" aria-labelledby="reply-heading">
            <div className="section-narrow action-card">
              <p className="script kicker">Save your place</p>
              <h2 id="reply-heading">Will you join us?</h2>
              <p className="lede">
                {wedding.rsvpNote} You are welcome to enjoy the invitation without sending a reply.
              </p>
              <div className="no-print">
                <RSVPForm wedding={wedding} />
                <ShareButtons wedding={wedding} />
              </div>
            </div>
          </section>
          <footer className="site-footer">
            <p className="script footer-love">{wedding.footerMessage}</p>
            <p className="footer-names">
              {wedding.bride.shortName} & {wedding.groom.shortName}
            </p>
            <p>{wedding.dateLabel}</p>
            <p>{wedding.venue.name}</p>
          </footer>
        </div>
      )}
    </div>
  )
}
