const fallbackSvg = (title = "MAPS - Medical Advanced Portfolio Solution asset preview") =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 640" role="img" aria-label="${title}">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#eef9f6"/>
        <stop offset="0.55" stop-color="#ffffff"/>
        <stop offset="1" stop-color="#dbeafe"/>
      </linearGradient>
      <linearGradient id="line" x1="0" x2="1">
        <stop offset="0" stop-color="#0f766e"/>
        <stop offset="1" stop-color="#2563eb"/>
      </linearGradient>
    </defs>
    <rect width="960" height="640" rx="42" fill="url(#bg)"/>
    <path d="M80 420 C210 250 360 515 514 315 S780 205 880 330" fill="none" stroke="url(#line)" stroke-width="18" stroke-linecap="round" opacity=".72"/>
    <rect x="105" y="120" width="330" height="130" rx="28" fill="#fff" stroke="#0f172a" stroke-opacity=".12"/>
    <rect x="520" y="128" width="300" height="82" rx="24" fill="#0f766e" opacity=".92"/>
    <circle cx="222" cy="380" r="48" fill="#14b8a6" opacity=".18"/>
    <circle cx="732" cy="430" r="56" fill="#2563eb" opacity=".14"/>
    <text x="104" y="536" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="800" fill="#0f172a">Healthcare growth asset</text>
    <text x="108" y="582" font-family="Inter, Arial, sans-serif" font-size="24" fill="#475569">Preview generated with local SVG fallback</text>
  </svg>`)}
`;

export function resolveAssetPath(path) {
  if (!path) return fallbackSvg();
  if (/^(https?:|data:|\/)/.test(path)) return path;
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${path}`.replace(/([^:]\/)\/+/g, "$1");
}

export function imageFallbackHandler(event, title) {
  event.currentTarget.src = fallbackSvg(title);
}
