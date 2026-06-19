import { useEffect } from "react";
import { setStorage } from "../utils/storage.js";
import { trackEvent } from "../utils/tracking.js";

export function useUTMTracking() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const payload = {};
    keys.forEach((key) => {
      const value = params.get(key);
      if (value) payload[key] = value;
    });

    if (Object.keys(payload).length) {
      setStorage("maps_utm", {
        ...payload,
        capturedAt: new Date().toISOString(),
        landingPage: window.location.pathname
      });
      trackEvent("utm_detected", payload);
      if (payload.utm_source) {
        trackEvent("campaign_source_detected", {
          source: payload.utm_source,
          medium: payload.utm_medium || ""
        });
      }
    }
  }, []);
}
