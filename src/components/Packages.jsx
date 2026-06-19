import { packages } from "../data/packages.js";
import SectionHeader from "./SectionHeader.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";

export default function Packages() {
  return (
    <section id="paket" className="section section-soft section-anchor packages-section">
      <div className="container">
        <SectionHeader
          title="Mulai dari fondasi kecil, lalu berkembang sesuai kebutuhan."
          subtitle="Scope bisa disesuaikan dengan kapasitas MAPSY. Fokusnya: terlihat profesional, mudah dipercaya, dan performanya bisa dibaca."
        />
        <div className="package-grid">
          {packages.map((pack) => (
            <article className="package-card reveal" key={pack.id}>
              <span>Cocok untuk</span>
              <h3>{pack.title}</h3>
              <p>{pack.fit}</p>
              <ul className="deliverable-list">
                {pack.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <WhatsAppButton
                className="btn btn-secondary btn-full"
                source="package_card"
                packageName={pack.title}
                message={`Halo MAPS, saya MAPSY mau audit digital untuk klinik/bisnis healthcare saya dong \u{1F601}\u{1F601}\u{1F601}\nSaat ini saya butuh bantuan untuk website/konten/SEO/tracking/sistem operasional\n\nSaya tertarik dengan paket ${pack.title}.`}
                eventName="package_cta_click"
              >
                {pack.cta}
              </WhatsAppButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
