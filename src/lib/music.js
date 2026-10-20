const MELODY = [440, 550, 660, 550, 495, 440, 412.5, 440]

export function createAmbient(ctx) {
  const master = ctx.createGain()
  master.gain.setValueAtTime(0.0001, ctx.currentTime)
  master.gain.exponentialRampToValueAtTime(0.65, ctx.currentTime + 1.6)
  master.connect(ctx.destination)

  const filter = ctx.createBiquadFilter()
  filter.type = "lowpass"
  filter.frequency.value = 1400
  filter.Q.value = 0.5
  filter.connect(master)

  const pads = [110, 220, 275, 330].map((freq, index) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "sine"
    osc.frequency.value = freq
    gain.gain.value = [0.07, 0.05, 0.035, 0.025][index]
    osc.connect(gain)
    gain.connect(filter)
    osc.start()
    return osc
  })

  let step = 0
  let timer = 0
  let stopped = false

  function chime() {
    if (stopped || ctx.state === "closed") return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "sine"
    osc.frequency.value = MELODY[step % MELODY.length]
    step += 1
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.08)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2)
    osc.connect(gain)
    gain.connect(filter)
    osc.start(now)
    osc.stop(now + 2.3)
    timer = window.setTimeout(chime, 2800)
  }

  chime()

  return {
    ctx,
    setMuted(muted) {
      if (ctx.state === "closed") return
      const now = ctx.currentTime
      master.gain.cancelScheduledValues(now)
      const current = Math.max(master.gain.value, 0.0001)
      master.gain.setValueAtTime(current, now)
      master.gain.exponentialRampToValueAtTime(muted ? 0.0001 : 0.65, now + 0.3)
    },
    stop() {
      stopped = true
      window.clearTimeout(timer)
      pads.forEach((osc) => {
        try {
          osc.stop()
        } catch {
          /* already stopped */
        }
      })
      if (ctx.state !== "closed") ctx.close()
    },
  }
}
