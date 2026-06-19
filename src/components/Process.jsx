import { agency } from "../data/agency.js";
import SectionHeader from "./SectionHeader.jsx";

export default function Process() {
  return (
    <section id="process" className="section section-soft section-anchor">
      <div className="container">
        <SectionHeader title="Cara kerja kami: marketing-first, medical-supervised." />
        <div className="process-list">
          {agency.process.map((step, index) => (
            <article className="process-item reveal" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="section-closing">
          Tidak semua bisnis harus langsung full-service. MAPS mulai dari prioritas paling masuk akal:
          trust, clarity, lead flow, lalu tracking.
        </p>
      </div>
    </section>
  );
}
