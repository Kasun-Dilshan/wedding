import fs from "node:fs"
import path from "node:path"
import { defaultSlug, invitations } from "../src/data/weddingConfig.js"
import { absoluteAsset, invitationPath, pageDescription, pageTitle } from "../src/lib/meta.js"

const dist = path.resolve("dist")
const templatePath = path.join(dist, "index.html")
const template = fs.readFileSync(templatePath, "utf8")

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
}

function replaceMeta(html, attribute, key, content) {
  const pattern = new RegExp(
    `<meta\\s+${attribute}=["']${key}["']\\s+content=["'][\\s\\S]*?["']\\s*/?>`,
    "i",
  )
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`
  if (pattern.test(html)) return html.replace(pattern, tag)
  return html.replace("</head>", `    ${tag}\n  </head>`)
}

function render(wedding, routePath) {
  const title = pageTitle(wedding)
  const description = pageDescription(wedding)
  const image = absoluteAsset(wedding, wedding.ogImage)
  const origin = String(wedding.siteUrl || "").replace(/\/$/, "")
  const url = origin ? `${origin}${routePath}` : routePath
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
  html = replaceMeta(html, "name", "description", description)
  html = replaceMeta(html, "property", "og:title", title)
  html = replaceMeta(html, "property", "og:description", description)
  html = replaceMeta(html, "property", "og:image", image)
  html = replaceMeta(html, "property", "og:url", url)
  html = replaceMeta(html, "property", "og:type", "website")
  html = replaceMeta(html, "name", "twitter:card", "summary_large_image")
  html = replaceMeta(html, "name", "twitter:title", title)
  html = replaceMeta(html, "name", "twitter:description", description)
  html = replaceMeta(html, "name", "twitter:image", image)
  return html
}

function writePage(routePath, wedding) {
  const html = render(wedding, routePath)
  if (routePath === "/") {
    fs.writeFileSync(path.join(dist, "index.html"), html)
    return
  }
  const directory = path.join(dist, routePath)
  fs.mkdirSync(directory, { recursive: true })
  fs.writeFileSync(path.join(directory, "index.html"), html)
}

const fallback = invitations[defaultSlug]
writePage("/", fallback)
for (const wedding of Object.values(invitations)) {
  writePage(invitationPath(wedding), wedding)
}

console.log(`Wrote invitation metadata for ${Object.keys(invitations).length} wedding page(s).`)
