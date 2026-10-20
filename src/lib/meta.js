export function pageTitle(wedding) {
  return `${wedding.bride.name} & ${wedding.groom.name} | Wedding Invitation`
}

export function pageDescription(wedding) {
  return `${wedding.bride.shortName} and ${wedding.groom.shortName} joyfully invite you to their wedding on ${wedding.dateLabel} at ${wedding.venue.name}.`
}

export function invitationPath(wedding) {
  return `/wedding/${wedding.slug}`
}

export function monogram(wedding) {
  const bride = wedding.bride.shortName || wedding.bride.name
  const groom = wedding.groom.shortName || wedding.groom.name
  return `${bride.charAt(0)}·${groom.charAt(0)}`
}

export function themeVars(theme = {}) {
  return {
    "--cream": theme.cream || "#fff7fa",
    "--blush": theme.blush || "#f5c4d1",
    "--rose": theme.rose || "#d16b86",
    "--gold": theme.gold || "#d4af37",
    "--gold-deep": theme.goldDeep || "#a8842a",
    "--sage": theme.sage || "#e8a0b0",
    "--sage-deep": theme.sageDeep || "#9b3d56",
    "--ink": theme.ink || "#3a2430",
    "--paper": theme.paper || "#ffffff",
    "--muted": theme.muted || "#7a6570",
  }
}

export function absoluteAsset(wedding, assetPath) {
  const origin = String(wedding.siteUrl || "").replace(/\/$/, "")
  if (!assetPath) return ""
  if (/^https?:\/\//i.test(assetPath)) return assetPath
  return origin ? `${origin}${assetPath}` : assetPath
}
