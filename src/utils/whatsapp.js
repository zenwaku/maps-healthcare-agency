import { getUtmPayload } from "./storage.js";
import { trackEvent } from "./tracking.js";

const defaultNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "628xxxxxxxxxx";
const defaultMessage =
  "Halo MAPS, saya MAPSY mau audit digital untuk klinik/bisnis healthcare saya dong \u{1F601}\u{1F601}\u{1F601}\nSaat ini saya butuh bantuan untuk website/konten/SEO/tracking/sistem operasional";

export function buildWhatsAppUrl({
  message,
  source = "website",
  serviceInterest = "",
  packageName = "",
  auditScore = "",
  recommendation = ""
} = {}) {
  const utm = getUtmPayload();
  const lines = [
    message || defaultMessage,
    serviceInterest ? `Minat layanan: ${serviceInterest}` : "",
    packageName ? `Paket: ${packageName}` : "",
    auditScore !== "" ? `Skor audit: ${auditScore}/100` : "",
    recommendation ? `Rekomendasi awal: ${recommendation}` : "",
    source ? `Source: ${source}` : "",
    utm.utm_source ? `UTM source: ${utm.utm_source}` : "",
    utm.utm_medium ? `UTM medium: ${utm.utm_medium}` : "",
    utm.utm_campaign ? `UTM campaign: ${utm.utm_campaign}` : ""
  ].filter(Boolean);

  const number = defaultNumber.replace(/[^\d]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function trackWhatsAppClick(params = {}) {
  trackEvent("whatsapp_click", params);
  trackEvent("generate_lead", { channel: "whatsapp", ...params });
}
