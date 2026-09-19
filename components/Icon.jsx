/* Line icons ported from the Living Aquarium sprite. Rendered inline so they
   work on any page. Size/stroke are SVG attributes, so scoped CSS can still
   override them (CSS beats presentation attributes). */

const PATHS = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6h4" />
    </>
  ),
  phone: <path d="M7 3 4 4c-4 7 9 20 16 16l1-3-6-3-2 2-5-5 2-2-3-6Z" />,
  paw: (
    <>
      <ellipse cx="5" cy="8" rx="2" ry="3" />
      <ellipse cx="10" cy="5" rx="2" ry="3" />
      <ellipse cx="16" cy="5" rx="2" ry="3" />
      <ellipse cx="21" cy="9" rx="2" ry="3" />
      <path d="M6 18c0-3 3-7 6-7s7 4 7 7c0 4-4 1-7 1s-6 3-6-1Z" />
    </>
  ),
  fish: (
    <>
      <path d="M3 6v12l5-3c6 8 15-3 15-3S14 1 8 9L3 6Z" />
      <circle cx="17" cy="11" r=".7" />
      <path d="m10 8 2-4 4 3m-6 9 2 4 4-3" />
    </>
  ),
  leaf: <path d="M3 20C-1 8 10 2 21 3c1 12-7 20-16 15M3 21 16 8" />,
  heart: <path d="M20 4c-3-2-6 0-8 3-2-3-5-5-8-3-8 5 8 17 8 17S28 9 20 4Z" />,
  chat: (
    <>
      <path d="M21 11a9 9 0 0 1-13 8l-5 2 1-5A9 9 0 1 1 21 11Z" />
      <path d="m9 7-1 2c1 3 2 4 5 5l2-1" />
    </>
  ),
  crown: <path d="m3 6 5 4 4-7 4 7 5-4-3 13H6L3 6Zm3 9h12" />,
  play: <path d="m9 5 10 7-10 7V5Z" />,
  pause: <path d="M9 5v14M15 5v14" />,
  moon: <path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
    </>
  ),
  sparkle: <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  wave: <path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0M2 18c2-3 4-3 6 0s4 3 6 0 4-3 6 0M2 6c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />,
};

export default function Icon({
  name,
  className = "icon",
  size = 22,
  strokeWidth = 1.55,
  ...rest
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
