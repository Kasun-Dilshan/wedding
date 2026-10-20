import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { FlowerCorner, GlowField, Ornament } from "./decor.jsx"
import { monogram } from "../lib/meta.js"

const ease = [0.16, 1, 0.3, 1]

export default function EnvelopeIntro({ wedding, opening, onOpen, onSkip }) {
  const initials = monogram(wedding)

  return (
    <div className="intro-layout">
      <div className="intro-atmosphere" aria-hidden="true">
        <span className="intro-bloom intro-bloom-a" />
        <span className="intro-bloom intro-bloom-b" />
        <span className="intro-bloom intro-bloom-c" />
        <span className="intro-sparkle intro-sparkle-1" />
        <span className="intro-sparkle intro-sparkle-2" />
        <span className="intro-sparkle intro-sparkle-3" />
        <span className="intro-sparkle intro-sparkle-4" />
      </div>

      <FlowerCorner className="intro-flower intro-flower-tl" />
      <FlowerCorner className="intro-flower intro-flower-br" />

      <motion.header
        className="intro-brand"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <p className="intro-kicker">Wedding Invitation</p>
        <p className="script intro-names">
          {wedding.bride.shortName} <span aria-hidden="true">&</span> {wedding.groom.shortName}
        </p>
        <p className="intro-date">{wedding.dateLabel}</p>
      </motion.header>

      <div className="reveal-stage">
        {opening && (
          <motion.article
            className={`invite-card reveal-card${wedding.cardImage ? " invite-card-image" : ""}`}
            initial={{ rotateX: 72, opacity: 0, y: 36 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 1.05, ease }}
          >
            {wedding.cardImage ? (
              <img
                className="invite-card-photo"
                src={wedding.cardImage}
                alt=""
              />
            ) : (
              <>
                <GlowField />
                <FlowerCorner className="corner corner-tl" />
                <FlowerCorner className="corner corner-tr" />
                <div className="card-inner">
                  <p className="script host-line">{wedding.hostLine}</p>
                  <p className="couple-names">
                    <span>{wedding.bride.shortName}</span>
                    <span className="amp" aria-hidden="true">&</span>
                    <span>{wedding.groom.shortName}</span>
                  </p>
                  <Ornament />
                  <p className="invite-message">{wedding.dateLabel}</p>
                </div>
              </>
            )}
          </motion.article>
        )}

        <motion.div
          className="envelope-stage"
          animate={opening ? { opacity: 0, y: 36, scale: 0.96 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: opening ? 1 : 0, duration: 0.55, ease }}
          style={{ pointerEvents: opening ? "none" : "auto" }}
        >
          <span className="envelope-glow" aria-hidden="true" />
          <Envelope opening={opening} initials={initials} />
        </motion.div>
      </div>

      <motion.div
        className="intro-actions"
        initial={{ opacity: 0, y: 16 }}
        animate={opening ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
        transition={{ duration: opening ? 0.35 : 0.7, delay: opening ? 0 : 0.25, ease }}
        style={{ pointerEvents: opening ? "none" : "auto" }}
      >
        <p className="you-are-invited">You Are Invited</p>
        <p className="intro-subline">Tap below to open our wedding card</p>
        <button type="button" className="btn btn-gold btn-invite" onClick={onOpen}>
          <Heart size={15} fill="currentColor" aria-hidden="true" />
          Open Invitation
        </button>
      </motion.div>

      <button type="button" className={`skip-btn${opening ? " is-floating" : ""}`} onClick={onSkip}>
        Skip animation
      </button>
    </div>
  )
}

function Envelope({ opening, initials }) {
  return (
    <motion.div
      className="envelope"
      aria-hidden="true"
      animate={opening ? { y: 0 } : { y: [0, -7, 0] }}
      transition={
        opening
          ? { duration: 0.3 }
          : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <div className="envelope-back" />
      <motion.div
        className="envelope-letter"
        initial={false}
        animate={opening ? { y: -78, opacity: 1 } : { y: 10, opacity: 0.95 }}
        transition={{ delay: opening ? 0.35 : 0, duration: 0.8, ease }}
      >
        <span className="letter-rule" />
        <span className="letter-rule" />
        <span className="letter-rule short" />
      </motion.div>
      <div className="envelope-pocket" />
      <div className="envelope-liner" />
      <motion.div
        className="envelope-flap"
        initial={false}
        animate={opening ? { rotateX: 175, opacity: 0 } : { rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.95, ease, opacity: { delay: 0.35, duration: 0.4 } }}
      />
      <div className="seal-slot">
        <motion.div
          className="seal script"
          initial={false}
          animate={opening ? { scale: 0.4, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <span className="seal-rim" />
          {initials}
        </motion.div>
      </div>
    </motion.div>
  )
}
