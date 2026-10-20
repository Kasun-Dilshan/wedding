import fs from "node:fs"
import path from "node:path"

const sampleRate = 22050
const duration = 24
const total = sampleRate * duration
const notes = [440, 550, 660, 550, 495, 440, 412.5, 440]
const raw = new Float32Array(total)

function sampleAt(time) {
  const tremolo = 0.84 + 0.16 * Math.sin(2 * Math.PI * 0.25 * time)
  const pad =
    Math.sin(2 * Math.PI * 110 * time) * 0.16 +
    Math.sin(2 * Math.PI * 220 * time) * 0.2 +
    Math.sin(2 * Math.PI * 275 * time) * 0.13 +
    Math.sin(2 * Math.PI * 330 * time) * 0.1
  const noteLength = 3
  const local = time % noteLength
  const freq = notes[Math.floor(time / noteLength) % notes.length]
  let envelope = 1
  if (local < 0.07) envelope = local / 0.07
  else if (local > noteLength - 0.2) envelope = Math.max(0, (noteLength - local) / 0.2)
  const bell = Math.sin(2 * Math.PI * freq * time) * envelope * 0.15
  return (pad * tremolo + bell) * 0.5
}

let peak = 0
for (let index = 0; index < total; index += 1) {
  const value = sampleAt(index / sampleRate)
  raw[index] = value
  peak = Math.max(peak, Math.abs(value))
}

const gain = peak > 0 ? 0.34 / peak : 0
const pcm = Buffer.alloc(44 + total * 2)
pcm.write("RIFF", 0)
pcm.writeUInt32LE(36 + total * 2, 4)
pcm.write("WAVE", 8)
pcm.write("fmt ", 12)
pcm.writeUInt32LE(16, 16)
pcm.writeUInt16LE(1, 20)
pcm.writeUInt16LE(1, 22)
pcm.writeUInt32LE(sampleRate, 24)
pcm.writeUInt32LE(sampleRate * 2, 28)
pcm.writeUInt16LE(2, 32)
pcm.writeUInt16LE(16, 34)
pcm.write("data", 36)
pcm.writeUInt32LE(total * 2, 40)

for (let index = 0; index < total; index += 1) {
  const sample = Math.max(-1, Math.min(1, raw[index] * gain))
  pcm.writeInt16LE(Math.round(sample * 32767), 44 + index * 2)
}

const file = path.resolve("public/music/wedding.wav")
fs.mkdirSync(path.dirname(file), { recursive: true })
fs.writeFileSync(file, pcm)
console.log(`Wrote ${file} (${pcm.length} bytes)`)
