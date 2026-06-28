import { getUtmPayload } from "./storage.js";

const pixelMap = {
  page_view_custom: "PageView",
  portfolio_card_click: "ViewContent",
  service_cta_click: "ViewContent",
  whatsapp_click: "Contact",
  email_click: "Contact",
  lead_form_submit: "Lead",
  audit_form_complete: "Lead",
  generate_lead: "Lead",
  package_cta_click: "Lead"
};

const placeholderIds = new Set(["G-XXXXXXXXXX", "000000000000000", "", undefined, null]);

function isRealId(id) {
  return !placeholderIds.has(id) && typeof id === "string" && id.trim().length > 4;
}

function preferProductionConfig(localValue, envValue) {
  return isRealId(envValue) ? envValue : localValue;
}

function isTrackingDebugMode() {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("maps_debug") === "1" || window.localStorage.getItem("maps_tracking_debug") === "1";
}

function readLocalTrackingConfig() {
  try {
    return JSON.parse(window.localStorage.getItem("maps_tracking_config") || "{}");
  } catch {
    return {};
  }
}

function appendLocalEvent(payload) {
  try {
    const key = "maps_tracking_events";
    const current = JSON.parse(window.localStorage.getItem(key) || "[]");
    current.unshift(payload);
    window.localStorage.setItem(key, JSON.stringify(current.slice(0, 500)));
  } catch {
    // Tracking must never break the landing page.
  }
}

function getCloudEndpoint() {
  if (typeof window === "undefined") return "";
  const local = readLocalTrackingConfig().cloudEndpoint;
  return local || import.meta.env.VITE_TRACKING_WEBAPP_URL || "";
}

function sendCloudEvent(payload) {
  const endpoint = getCloudEndpoint();
  if (!isRealId(endpoint) || !/^https?:\/\//.test(endpoint)) return;
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(endpoint, blob);
      return;
    }
    fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body
    }).catch(() => {});
  } catch {
    // Cloud sync is optional and best-effort.
  }
}

function loadScript(src, id) {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const script = document.createElement("script");
  script.async = true;
  script.id = id;
  script.src = src;
  document.head.appendChild(script);
}

export function initTracking() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];

  const localConfig = readLocalTrackingConfig();
  const gaId = preferProductionConfig(localConfig.gaId, import.meta.env.VITE_GA_MEASUREMENT_ID);
  const pixelId = preferProductionConfig(localConfig.pixelId, import.meta.env.VITE_META_PIXEL_ID);
  const debugMode = isTrackingDebugMode();

  window.mapsTrackingState = {
    gaId: isRealId(gaId) ? gaId : "",
    pixelConfigured: isRealId(pixelId),
    cloudConfigured: Boolean(getCloudEndpoint()),
    debugMode
  };

  if (isRealId(gaId)) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`, "ga4-script");
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };
    window.gtag("js", new Date());
    const gaConfig = {
      page_title: document.title,
      page_location: window.location.href
    };
    if (debugMode) gaConfig.debug_mode = true;
    window.gtag("config", gaId, gaConfig);
  }

  if (isRealId(pixelId)) {
    window.fbq =
      window.fbq ||
      function fbq() {
        window.fbq.callMethod
          ? window.fbq.callMethod.apply(window.fbq, arguments)
          : window.fbq.queue.push(arguments);
      };
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = "2.0";
    window.fbq.queue = window.fbq.queue || [];
    loadScript("https://connect.facebook.net/en_US/fbevents.js", "meta-pixel-script");
    window.fbq("init", pixelId);
  }
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  const { __cloudPayload, ...publicParams } = params || {};
  const utmContext = getUtmPayload();
  const payload = {
    event: eventName,
    page_location: window.location.href,
    timestamp: new Date().toISOString(),
    ...utmContext,
    ...publicParams
  };
  const cloudPayload = __cloudPayload ? { ...payload, record: __cloudPayload } : payload;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  appendLocalEvent(payload);
  sendCloudEvent(cloudPayload);

  if (typeof window.gtag === "function") {
    const gaParams = isTrackingDebugMode() ? { ...publicParams, debug_mode: true } : publicParams;
    window.gtag("event", eventName, gaParams);
  }

  if (typeof window.fbq === "function") {
    const pixelEvent = pixelMap[eventName];
    if (pixelEvent) window.fbq("track", pixelEvent, publicParams);
    else window.fbq("trackCustom", eventName, publicParams);
  }

  if (import.meta.env.DEV) {
    console.info("[track]", eventName, publicParams);
  }
}

let microbeCount = 0;
let lastMicrobeFlush = Date.now();

export function trackMicrobeNeutralized(count = 1) {
  const now = Date.now();
  microbeCount += count;
  const elapsed = now - lastMicrobeFlush;
  if ((microbeCount >= 10 && elapsed >= 15000) || (microbeCount > 0 && elapsed >= 30000)) {
    trackEvent("microbe_neutralized_batch", { count: microbeCount });
    microbeCount = 0;
    lastMicrobeFlush = now;
  }
}
