"use client";

/* Sticky mobile action bar — the owner's business runs on calls, WhatsApp
   and walk-ins, so those three actions stay thumb-reachable on phones.
   Shown below 720px only; replaces the floating WhatsApp bubble there. */

import { telHref, waLink, directionsUrl } from "../lib/business";
import Icon from "./Icon";

export default function StickyActions() {
  return (
    <nav className="sticky-actions" aria-label="Quick actions">
      <a href={telHref} aria-label="Call Dolphin Aquarium & Pets">
        <Icon name="phone" size={17} />
        Call
      </a>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="sa-wa"
        aria-label="Chat on WhatsApp"
      >
        <Icon name="chat" size={17} />
        WhatsApp
      </a>
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get directions on Google Maps"
      >
        <Icon name="pin" size={17} />
        Directions
      </a>
    </nav>
  );
}
