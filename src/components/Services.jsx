import { useEffect, useRef } from "react";
import { serviceIconMap } from "../data/icons.js";
import { services } from "../data/services.js";
import { trackEvent } from "../utils/tracking.js";
import AnimatedIcon from "./AnimatedIcon.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function Services() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current || !("IntersectionObserver" in window)) return;
    const seen = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-service-id");
            if (id && !seen.has(id)) {
              seen.add(id);
              trackEvent("service_card_view", { service_id: id });
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    gridRef.current.querySelectorAll("[data-service-id]").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="solusi" className="section section-soft section-anchor">
      <div className="container">
        <SectionHeader
          title="Solusi digital end-to-end untuk healthcare business yang ingin naik kelas."
          subtitle="Mulai dari fondasi brand digital sampai sistem tracking sederhana, kami bantu bangun bertahap sesuai kebutuhan dan kapasitas bisnis Anda."
        />
        <div className="service-grid" ref={gridRef}>
          {services.map((service, index) => (
            <article className="service-card reveal" key={service.id} data-service-id={service.id} style={{ "--i": index }}>
              <div className="service-card-top">
                <AnimatedIcon name={serviceIconMap[service.id]} motion={index % 2 ? "wiggle" : "float"} />
                <div className="service-number">0{index + 1}</div>
              </div>
              <p className="service-short">{service.shortTitle}</p>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {service.note ? <p className="service-note">{service.note}</p> : null}
              <ul className="deliverable-list">
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                href="#lead-form"
                className="text-link"
                onClick={() =>
                  trackEvent("service_cta_click", {
                    service_id: service.id,
                    service_title: service.shortTitle
                  })
                }
              >
                Diskusikan layanan ini
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
