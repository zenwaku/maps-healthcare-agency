import { heroProof } from "../data/landingV2.js";
import { resolveAssetPath } from "../utils/assetFallback.js";
import { trackEvent } from "../utils/tracking.js";
import AnimatedIcon from "./AnimatedIcon.jsx";
import KineticText from "./KineticText.jsx";
import MicrobePlayground from "./MicrobePlayground.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";

const heroMessage =
  "Halo MAPS, saya MAPSY mau audit digital untuk klinik/bisnis healthcare saya dong \u{1F601}\u{1F601}\u{1F601}\nSaat ini saya butuh bantuan untuk website/konten/SEO/tracking/sistem operasional";

export default function Hero() {
  return (
    <section id="top" className="maps-hero section-anchor">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="container maps-hero-grid">
        <div className="maps-hero-copy reveal">
          <div className="hero-badge-v2">
            <AnimatedIcon name="doctor" motion="pulse" />
            <span>Doctor-led. AI-assisted. Evidence-based.</span>
          </div>
          <h1
            className="hero-title-v2"
            aria-label="Klinik Anda sudah bagus. Tapi belum terlihat meyakinkan secara digital."
          >
            <span className="title-line">Klinik Anda</span>
            <KineticText as="span" text="Sudah Bagus." chunk="char" className="title-pop" />
            <span className="title-line title-line--small">
              Tapi belum terlihat meyakinkan secara digital.
            </span>
          </h1>
          <p className="hero-sub-v2">
            Calon pasien menilai layanan Anda dari Google, Instagram, website, dan cara Anda merespons kebutuhan mereka.
            MAPS membantu setiap titik itu terasa lebih profesional, edukatif, scientific, dan terukur.
          </p>
          <p className="hero-doctor-v2">
            Dipimpin dokter. Dipercepat AI. Divalidasi clinical reasoning. Dieksekusi seperti agency modern.
          </p>
          <div className="hero-action-row-v2">
            <a
              className="btn btn-primary hero-primary-v2"
              href="#audit"
              onClick={() => trackEvent("cta_click", { placement: "hero", label: "Audit Digital Gratis" })}
            >
              Audit Digital Gratis
            </a>
            <a
              className="btn btn-secondary hero-work-v2"
              href="#portfolio"
              onClick={() => trackEvent("cta_click", { placement: "hero", label: "Lihat Portfolio" })}
            >
              Lihat Portfolio
            </a>
            <WhatsAppButton
              className="btn hero-wa-v2"
              source="hero"
              message={heroMessage}
              aria-label="Chat WhatsApp MAPS"
            >
              <img
                src={resolveAssetPath("assets/icons/whatsapp-chat.png")}
                alt=""
                aria-hidden="true"
                draggable="false"
              />
              <span>Chat MAPS</span>
            </WhatsAppButton>
          </div>
          <p className="hero-microcopy-v2">
            Untuk MAPSY yang offline-nya sudah bagus, tapi online presence-nya belum bicara sekuat layanannya.
          </p>
          <div className="hero-proof-row">
            {heroProof.map((item) => (
              <article key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </div>

        <div className="maps-hero-visual maps-hero-visual--cleanup reveal reveal-delay">
          <MicrobePlayground />
        </div>
      </div>
    </section>
  );
}
