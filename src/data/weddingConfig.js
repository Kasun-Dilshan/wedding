/**
 * Wedding invitation settings.
 *
 * Change the values in this file, save, and the website updates.
 * Each entry in `invitations` has its own page:
 *   /wedding/<slug>
 * The slug in `defaultSlug` is also shown at the site root (/).
 *
 * To add another invitation, copy one object, give it a new slug,
 * and use that same slug as the object key.
 *
 * Photos: put image files in `public/photos` and set the path,
 * for example "/photos/bride.jpg". Leave a photo blank ("") to
 * show an elegant monogram instead.
 *
 * Music: put an MP3 or WAV you have rights to use in `public/music`
 * and set `musicUrl`, for example "/music/wedding.mp3".
 * The included track is a soft original placeholder.
 * Music starts only after a guest taps the page. It never autoplays.
 *
 * After deploying, set `siteUrl` to the public address with no
 * trailing slash, for example "https://your-name.vercel.app".
 * That gives WhatsApp a full preview-image link. Then rebuild.
 */

const baseTheme = {
  cream: "#fff7fa",
  blush: "#f5c4d1",
  rose: "#d16b86",
  gold: "#d4af37",
  goldDeep: "#a8842a",
  sage: "#e8a0b0",
  sageDeep: "#9b3d56",
  ink: "#3a2430",
  paper: "#ffffff",
  muted: "#7a6570",
}

const cardTheme = {
  cream: "#f6f0e6",
  blush: "#e8d5b8",
  rose: "#8b5a2b",
  gold: "#c9a227",
  goldDeep: "#8f6b1f",
  sage: "#d4c4a8",
  sageDeep: "#6b4f2a",
  ink: "#4a3428",
  paper: "#faf6ef",
  muted: "#7a6558",
}

export const invitations = {
  "2026-isurindi-praveen": {
    slug: "2026-isurindi-praveen",
    siteUrl: "",
    ogImage: "/og-isurindi-praveen.jpg",
    cardImage: "/photos/invitation-isurindi-praveen.jpg",
    musicUrl: "/music/wedding.wav",
    hostLine: "Together with their parents",
    invitationMessage: "Warmly request the honour of your presence to share the happiness of the marriage",
    closingMessage: "Your presence will make our special day even more memorable.",
    footerMessage: "With Love, Isurindi & Praveen",
    dateTime: "2026-12-14T10:56:00+05:30",
    dateLabel: "Monday, 14 December 2026",
    timeLabel: "10:56 in the morning",
    calendarHours: 5,
    bride: {
      shortName: "Isurindi",
      name: "Isurindi",
      role: "The Bride",
      parents: "Daughter of Mr. Siril & Mrs. Chandima",
      bio: "Isurindi brings light and grace to every gathering. She is marrying with joy, surrounded by the family who raised her and the friends who know her heart.",
      photo: "",
      photoPosition: "center 20%",
    },
    groom: {
      shortName: "Praveen",
      name: "Praveen",
      role: "The Groom",
      parents: "Son of Mr. Waduge & Mrs. Indrani",
      bio: "Praveen is steady, warm, and deeply thankful for Isurindi. He looks forward to celebrating this promise with everyone they love.",
      photo: "",
      photoPosition: "center 20%",
    },
    story:
      "Isurindi and Praveen invite you to stand with them as they begin their marriage, blessed by their parents Mr. Siril & Mrs. Chandima and Mr. Waduge & Mrs. Indrani.",
    photos: {
      couple: "/photos/couple-isurindi-praveen.jpg",
    },
    venue: {
      name: "Grand Navro Hotel",
      address: "Matara, Sri Lanka",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Grand+Navro+Hotel+Matara",
    },
    receptionDetails: "Poruwa Ceremony at 10:56 AM, followed by celebration with family and friends.",
    schedule: [
      { time: "10:30 AM", title: "Guest Arrival", detail: "Welcome as family and friends gather." },
      { time: "10:56 AM", title: "Poruwa Ceremony", detail: "The traditional blessing of the couple." },
      { time: "12:00 PM", title: "Photographs", detail: "Family portraits and well wishes." },
      { time: "1:00 PM", title: "Reception", detail: "Dining, toasts, and celebration." },
    ],
    rsvpPhone: "94777237694",
    rsvpPhoneDisplay: "077 723 7694",
    rsvpNote: "Kindly reply by 1 December 2026",
    theme: { ...cardTheme },
  },

  "2027-kasun-dilsha": {
    slug: "2027-kasun-dilsha",
    siteUrl: "",
    ogImage: "/og-kasun-dilsha.jpg",
    musicUrl: "/music/wedding.wav",
    hostLine: "Together with their families",
    invitationMessage: "Joyfully invite you to celebrate their wedding",
    closingMessage: "Your presence will make our special day even more memorable.",
    footerMessage: "With Love, The Bride & Groom",
    dateTime: "2027-02-14T10:30:00+05:30",
    dateLabel: "Saturday, 14 February 2027",
    timeLabel: "10:30 in the morning",
    calendarHours: 5,
    bride: {
      shortName: "Dilsha",
      name: "Dilsha Fernando",
      role: "The Bride",
      parents: "Daughter of Mr. & Mrs. Fernando",
      bio: "Dilsha brings warmth to every room she enters. She loves long conversations, jasmine in the evening air, and a table full of the people she holds close.",
      photo: "",
      photoPosition: "center 20%",
    },
    groom: {
      shortName: "Kasun",
      name: "Kasun Jayawardena",
      role: "The Groom",
      parents: "Son of Mr. & Mrs. Jayawardena",
      bio: "Kasun is steady, quick to laugh, and happiest beside Dilsha. He is thankful for the family and friends who have walked with him to this day.",
      photo: "",
      photoPosition: "center 20%",
    },
    story:
      "What began as an easy friendship grew, quietly and surely, into a life they choose to share. Dilsha and Kasun would be honoured to have you with them as they begin their marriage.",
    photos: {
      couple: "/photos/couple-kasun-dilsha.jpg",
    },
    venue: {
      name: "Cinnamon Grand Colombo",
      address: "77 Galle Road, Colombo 03, Sri Lanka",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cinnamon+Grand+Colombo",
    },
    receptionDetails: "A wedding luncheon follows at 12:30 PM in the Grand Ballroom.",
    schedule: [
      { time: "10:00 AM", title: "Guest Arrival", detail: "Welcome drinks as family and friends gather." },
      { time: "10:30 AM", title: "Poruwa Ceremony", detail: "The traditional blessing of the couple." },
      { time: "11:30 AM", title: "Photographs", detail: "Family portraits and well wishes." },
      { time: "12:30 PM", title: "Luncheon Reception", detail: "Dining, toasts, and celebration." },
      { time: "3:00 PM", title: "Cake & Farewell", detail: "Cake cutting and a fond send-off." },
    ],
    rsvpPhone: "94771234567",
    rsvpPhoneDisplay: "+94 77 123 4567",
    rsvpNote: "Kindly reply by 20 January 2027",
    theme: { ...baseTheme },
  },

  "2027-amaya-nimantha": {
    slug: "2027-amaya-nimantha",
    siteUrl: "",
    ogImage: "/og-amaya-nimantha.jpg",
    musicUrl: "/music/wedding.wav",
    hostLine: "Together with their families",
    invitationMessage: "Joyfully invite you to celebrate their wedding",
    closingMessage: "Your presence will make our special day even more memorable.",
    footerMessage: "With Love, The Bride & Groom",
    dateTime: "2027-03-21T16:30:00+05:30",
    dateLabel: "Sunday, 21 March 2027",
    timeLabel: "4:30 in the evening",
    calendarHours: 6,
    bride: {
      shortName: "Amaya",
      name: "Amaya Perera",
      role: "The Bride",
      parents: "Daughter of Mr. & Mrs. Perera",
      bio: "Amaya has a gift for making ordinary days feel like occasions. She is marrying her favourite person, surrounded by the people who know her best.",
      photo: "",
      photoPosition: "center 20%",
    },
    groom: {
      shortName: "Nimantha",
      name: "Nimantha Silva",
      role: "The Groom",
      parents: "Son of Mr. & Mrs. Silva",
      bio: "Nimantha is thoughtful, loyal, and endlessly proud of Amaya. He cannot wait to celebrate this promise with their families.",
      photo: "",
      photoPosition: "center 20%",
    },
    story:
      "Amaya and Nimantha found each other in the middle of busy Colombo days and chose a slower kind of joy. They warmly invite you to witness their wedding.",
    photos: {
      couple: "/photos/couple-amaya-nimantha.jpg",
    },
    venue: {
      name: "Shangri-La Colombo",
      address: "1 Galle Face, Colombo 02, Sri Lanka",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shangri-La+Colombo",
    },
    receptionDetails: "Dinner and dancing follow the ceremony in the grand ballroom.",
    schedule: [
      { time: "4:00 PM", title: "Guest Arrival", detail: "A welcome reception as guests arrive." },
      { time: "4:30 PM", title: "Wedding Ceremony", detail: "Vows and blessings with family beside them." },
      { time: "5:30 PM", title: "Photographs", detail: "Portraits by the ocean terrace." },
      { time: "6:30 PM", title: "Dinner Reception", detail: "A seated dinner, toasts, and cake." },
      { time: "9:00 PM", title: "Dancing & Farewell", detail: "Music late into the evening." },
    ],
    rsvpPhone: "94770000000",
    rsvpPhoneDisplay: "+94 77 000 0000",
    rsvpNote: "Kindly reply by 1 March 2027",
    theme: {
      ...baseTheme,
      cream: "#fff5f8",
      blush: "#f8d0dc",
      rose: "#c75a78",
      gold: "#c9a227",
      goldDeep: "#8f7220",
      sage: "#f0b4c2",
      sageDeep: "#8a3450",
      ink: "#322028",
      muted: "#6f5a64",
    },
  },
}

export const defaultSlug = "2026-isurindi-praveen"

export function getInvitation(slug) {
  if (!slug) return null
  return invitations[slug] ?? null
}

export function getOtherInvitations(slug) {
  return Object.values(invitations).filter((item) => item.slug !== slug)
}
