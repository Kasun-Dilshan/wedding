# Digital Wedding Invitation

A responsive wedding invitation website built with React, Vite, Tailwind CSS, and Framer Motion. Guests open one link on a phone, tablet, or computer and see a short envelope animation, then the full invitation.

The sample celebration is **Dilsha Fernando & Kasun Jayawardena**. A second sample, **Amaya Perera & Nimantha Silva**, shows how one project can host more than one invitation.

## Quick start

```bash
npm install
npm run dev
```

Open the address Vite prints, usually `http://localhost:5173`.

- `/` is the default invitation
- `/wedding/2027-kasun-dilsha` is the same invitation on its shareable path
- `/wedding/2027-amaya-nimantha` is the second sample

Check the production build with:

```bash
npm run build
npm run preview
```

## Customise the invitation

Edit `src/data/weddingConfig.js`. Saving the file updates the site.

You can change:

- the bride’s and groom’s names
- the wedding date, time, and countdown
- the venue, address, and Google Maps link
- couple photos
- the invitation message and closing lines
- theme colours
- the background music file
- the wedding schedule
- the RSVP WhatsApp number

To add another couple, copy one object in `invitations`, use a new slug as the key, and set `slug` to that same value. The page will be:

```text
/wedding/your-slug
```

Set `defaultSlug` if a different invitation should open at `/`.

### Photos

Couple photos already in the project are temporary placeholders. Replace them before you share a real invitation.

1. Put your images in `public/photos`.
2. Set `photos.couple`, `bride.photo`, and `groom.photo` to paths such as `"/photos/bride.jpg"`.
3. Leave a photo as `""` if you prefer the monogram. If a file is missing, the monogram appears automatically.

### Music

Music starts only after a guest taps **Open Invitation**, **Skip animation**, or the music button. It does not autoplay.

The included file, `public/music/wedding.wav`, is an original soft placeholder. For the real day, add a track you have the rights to use:

1. Save it as `public/music/wedding.mp3`.
2. Set `musicUrl` to `"/music/wedding.mp3"`.

If the file cannot be played, the page falls back to a gentle generated tone. The mute button stays available.

You can regenerate the placeholder with `npm run music`.

### RSVP number

`rsvpPhone` must be the country code plus the number, with no `+` or spaces, for example `"94771234567"`. The form opens WhatsApp with the guest’s reply. Guests can ignore RSVP and still read the whole invitation.

Replace the sample numbers before you send the link.

### WhatsApp preview image

Each invitation has a still preview image, not a screenshot of the animation:

- `public/og-kasun-dilsha.jpg`
- `public/og-amaya-nimantha.jpg`

Replace `ogImage` with your own 1200×630 JPG or PNG if the names change. After the first deploy, set `siteUrl` to the public address with no trailing slash and deploy again so WhatsApp can load the image.

```js
siteUrl: "https://your-project.vercel.app"
```

## Deploy and get a public link

The site is a static build in `dist`. Client-side routing and per-invitation preview tags are included.

### Vercel

1. Push this folder to GitHub.
2. In [Vercel](https://vercel.com), choose **Add New Project** and import the repository.
3. Use the default settings: build command `npm run build`, output directory `dist`.
4. Deploy. Vercel shows a public URL such as `https://your-project.vercel.app`.
5. Put that URL in `siteUrl` in `src/data/weddingConfig.js`, then redeploy.

Share:

```text
https://your-project.vercel.app/wedding/2027-kasun-dilsha
```

That link opens directly in mobile browsers, including WhatsApp’s browser. The envelope animation waits for a tap, so it is allowed to play music after the guest opens it.

You can also deploy from the computer:

```bash
npm install -g vercel
vercel
```

### Netlify

1. Push the project to GitHub.
2. In [Netlify](https://www.netlify.com), choose **Add new site** → **Import an existing project**.
3. Build command: `npm run build`. Publish directory: `dist`. `netlify.toml` already sets these.
4. Deploy, copy the URL, set `siteUrl`, and deploy again.

Or build locally and drag the `dist` folder onto Netlify Drop. `public/_redirects` is copied into `dist` so routes keep working.

## What guests can do

- Open the envelope, or skip the animation
- Mute or unmute the music
- See the date, a live countdown, the schedule, and the venue
- Open Google Maps
- Send an RSVP through WhatsApp
- Add the wedding to a calendar (`.ics` download, or Google Calendar)
- Share the invitation on WhatsApp
- Print the invitation, or save it as a PDF from the print dialog

The layout adapts to phones, tablets, and desktops. Decorative motion is reduced when the device asks for less motion, and the invitation is shown immediately.
