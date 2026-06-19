import { useEffect, useRef } from "react";
import { trackEvent } from "../utils/tracking.js";
import WhatsAppButton from "./WhatsAppButton.jsx";

export default function FinalCTA() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) window.dispatchEvent(new CustomEvent("microbe-panel:sweep"));
      },
      { threshold: 0.45 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="final-cta" className="section final-cta section-anchor" ref={ref}>
      <div className="container final-cta-inner">
        <div className="final-dashboard-clean" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <h2>MAPSY tidak harus langsung besar untuk terlihat profesional.</h2>
        <p>
          Mulai dari fondasi digital yang rapi: website yang meyakinkan, konten scientific, CTA yang jelas, dan tracking
          yang bisa dibaca.
        </p>
        <div className="hero-actions centered">
          <a
            className="btn btn-primary"
            href="#audit"
            onClick={() => trackEvent("final_cta_click", { label: "Audit Digital Klinik Gratis" })}
          >
            Audit Digital Klinik Gratis
          </a>
          <WhatsAppButton className="btn btn-secondary" source="final_cta">
            Konsultasi via WhatsApp
          </WhatsAppButton>
        </div>
        <p className="microcopy">Ceritakan kondisi digital MAPSY sekarang. MAPS bantu tentukan langkah paling masuk akal.</p>
      </div>
    </section>
  );
}
