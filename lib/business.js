/* Single source of truth for business details (ported from the Living
   Aquarium package's scripts/config.js). Edit here, not in components. */

export const BUSINESS = {
  name: "Dolphin Aquarium & Pets",
  phoneDisplay: "+91 99538 58521",
  phoneE164: "+919953858521",
  whatsappNumber: "919953858521",
  whatsappMessage:
    "Hi Dolphin Aquarium & Pets! I would love to know more about your aquariums and pet care.",
  address:
    "Shop No G 4, Apollo apt down, Navelim Flyover, Sanscar Society, Madgaon, Shirvodem, Goa 403601",
  mapQuery:
    "Dolphin Aquarium & Pets, Shop No G 4, Apollo apt down, Navelim Flyover, Sanscar Society, Madgaon, Shirvodem, Goa 403601",
  timeZone: "Asia/Kolkata",
  /* Sunday is 0. Values are local minutes after midnight. */
  openingHours: {
    0: { open: 570, close: 840 },
    1: { open: 540, close: 1260 },
    2: { open: 540, close: 1260 },
    3: { open: 540, close: 1260 },
    4: { open: 540, close: 1260 },
    5: { open: 540, close: 1260 },
    6: { open: 540, close: 1260 },
  },
  animation: { desktopParticles: 52, mobileParticles: 22, maxFps: 30 },
};

export const telHref = `tel:${BUSINESS.phoneE164}`;

export const waLink = (message = BUSINESS.whatsappMessage) =>
  `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  BUSINESS.mapQuery
)}`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  BUSINESS.mapQuery
)}&z=16&output=embed`;

export function formatMinutes(value) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
}

export const weekdayHours = `${formatMinutes(BUSINESS.openingHours[1].open)} – ${formatMinutes(
  BUSINESS.openingHours[1].close
)}`;
export const sundayHours = `${formatMinutes(BUSINESS.openingHours[0].open)} – ${formatMinutes(
  BUSINESS.openingHours[0].close
)}`;

/**
 * Open/closed right now, evaluated in Goa's time zone (not the visitor's).
 * Regular hours only — holiday closures are not modelled.
 */
export function openStatus(now = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: BUSINESS.timeZone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);
    const v = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(v.weekday);
    const hours = BUSINESS.openingHours[day];
    const minutes = Number(v.hour) * 60 + Number(v.minute);
    const isOpen = Boolean(hours && minutes >= hours.open && minutes < hours.close);
    return { text: isOpen ? "Open now" : "Closed now", open: isOpen };
  } catch {
    return { text: "Goa local time", open: null };
  }
}
