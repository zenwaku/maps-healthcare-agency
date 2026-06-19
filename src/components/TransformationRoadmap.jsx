import { agency } from "../data/agency.js";
import SectionHeader from "./SectionHeader.jsx";

export default function TransformationRoadmap() {
  return (
    <section id="roadmap" className="section section-anchor roadmap-section">
      <div className="container">
        <SectionHeader
          title="Transformasi digital healthcare tidak harus langsung rumit."
          subtitle="Kami bantu mulai dari yang paling penting dulu: terlihat profesional, mudah ditemukan, mudah dihubungi, dan bisa diukur."
        />
        <div className="roadmap-track">
          <div className="roadmap-pill" aria-hidden="true" />
          {agency.roadmap.map((phase, index) => (
            <article className="roadmap-card reveal" key={phase.title} style={{ "--i": index }}>
              <span>{phase.phase}</span>
              <h3>{phase.title}</h3>
              <ul>
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
