import { useEffect, useState } from "react";
import { trackEvent } from "../utils/tracking.js";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let tracked50 = false;
    let tracked90 = false;

    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const value = height > 0 ? Math.min(100, Math.max(0, (window.scrollY / height) * 100)) : 0;
      setProgress(value);
      if (value >= 50 && !tracked50) {
        tracked50 = true;
        trackEvent("scroll_50", { percent: 50 });
      }
      if (value >= 90 && !tracked90) {
        tracked90 = true;
        trackEvent("scroll_90", { percent: 90 });
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}
