import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Music, Volume2, VolumeX } from "lucide-react"
import { createAmbient } from "../lib/music.js"

const MusicControl = forwardRef(function MusicControl({ musicUrl, docked = false }, ref) {
  const audioRef = useRef(null)
  const ambientRef = useRef(null)
  const modeRef = useRef("")
  const [status, setStatus] = useState("idle")

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      ambientRef.current?.stop()
    }
  }, [])

  function launchAmbient() {
    if (ambientRef.current) {
      modeRef.current = "ambient"
      return ambientRef.current
    }
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) {
      setStatus("unavailable")
      return null
    }
    try {
      const ctx = new AudioContextClass()
      const engine = createAmbient(ctx)
      ambientRef.current = engine
      modeRef.current = "ambient"
      ctx.resume().then(() => {
        setStatus(ctx.state === "running" ? "playing" : "idle")
      })
      return engine
    } catch {
      setStatus("unavailable")
      return null
    }
  }

  function begin() {
    if (modeRef.current === "file" || modeRef.current === "ambient" || modeRef.current === "pending") {
      return
    }
    if (musicUrl) {
      const audio = new Audio(musicUrl)
      audio.loop = true
      audio.preload = "auto"
      audio.volume = 0.45
      audioRef.current = audio
      modeRef.current = "pending"
      const playback = audio.play()
      playback
        ?.then(() => {
          modeRef.current = "file"
          setStatus("playing")
        })
        .catch(() => {
          audioRef.current = null
          modeRef.current = ""
          launchAmbient()
        })
      audio.addEventListener(
        "error",
        () => {
          if (modeRef.current === "pending" || modeRef.current === "file") {
            audio.pause()
            audioRef.current = null
            modeRef.current = ""
            launchAmbient()
          }
        },
        { once: true },
      )
      return
    }
    launchAmbient()
  }

  function mute() {
    if (modeRef.current === "file" && audioRef.current) audioRef.current.muted = true
    if (modeRef.current === "ambient") ambientRef.current?.setMuted(true)
    setStatus("muted")
  }

  function unmute() {
    if (modeRef.current === "file" && audioRef.current) {
      audioRef.current.muted = false
      audioRef.current.play().catch(() => launchAmbient())
    }
    if (modeRef.current === "ambient") {
      ambientRef.current?.ctx.resume()
      ambientRef.current?.setMuted(false)
    }
    setStatus("playing")
  }

  useImperativeHandle(ref, () => ({
    start() {
      if (modeRef.current === "file" || modeRef.current === "ambient") {
        if (status === "muted") unmute()
        return
      }
      begin()
    },
  }))

  function toggle() {
    if (status === "unavailable") return
    if (!modeRef.current || modeRef.current === "pending") {
      if (!modeRef.current) begin()
      return
    }
    if (modeRef.current === "ambient" && ambientRef.current?.ctx.state !== "running") {
      ambientRef.current.ctx.resume()
      ambientRef.current.setMuted(false)
      setStatus("playing")
      return
    }
    if (status === "playing") mute()
    else unmute()
  }

  const label =
    status === "playing" ? "Mute music" : status === "muted" ? "Unmute music" : status === "unavailable" ? "Music unavailable" : "Play music"
  const Icon = status === "playing" ? Volume2 : status === "unavailable" ? Music : status === "muted" ? VolumeX : Music

  return (
    <button
      type="button"
      className={`music-btn no-print${docked ? " is-docked" : ""}`}
      onClick={toggle}
      aria-pressed={status === "playing"}
      aria-label={label}
      title={label}
      disabled={status === "unavailable"}
    >
      <Icon size={20} aria-hidden="true" />
    </button>
  )
})

export default MusicControl
