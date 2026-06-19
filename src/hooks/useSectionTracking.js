import { useEffect, useState } from "react";
import { trackEvent } from "../utils/tracking.js";

export function useSectionTracking(sectionIds = []) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const seen = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            if (!seen.has(id)) {
              seen.add(id);
              trackEvent("section_view", { section: id });
            }
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.08 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds.join("|")]);

  return activeSection;
}
