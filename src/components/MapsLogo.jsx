export default function MapsLogo({ className = "", title = "MAPS" }) {
  return (
    <svg
      className={`maps-logo ${className}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={`${title} logo`}
      focusable="false"
    >
      <defs>
        <linearGradient id="mapsLogoBg" x1="10" y1="7" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14B8A6" />
          <stop offset="0.52" stopColor="#2563EB" />
          <stop offset="1" stopColor="#A3E635" />
        </linearGradient>
        <filter id="mapsLogoShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0F766E" floodOpacity="0.22" />
        </filter>
      </defs>
      <rect x="7" y="7" width="50" height="50" rx="16" fill="url(#mapsLogoBg)" filter="url(#mapsLogoShadow)" />
      <path
        d="M21 38.5V25.2c0-2.6 3.4-3.7 4.9-1.6l6.1 8.3 6.1-8.3c1.5-2.1 4.9-1 4.9 1.6v13.3"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M31.9 19v26" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" opacity="0.86" />
      <circle cx="21" cy="21" r="2.4" fill="#A3E635" />
      <circle cx="43" cy="43" r="2.4" fill="#FFFFFF" opacity="0.92" />
      <path d="M16.5 43.5h12M35.5 20.5h12" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
