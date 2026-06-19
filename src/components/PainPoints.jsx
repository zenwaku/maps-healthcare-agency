import { agency } from "../data/agency.js";
import SectionHeader from "./SectionHeader.jsx";

export default function PainPoints() {
  return (
    <section id="masalah-klinik" className="section section-anchor">
      <div className="container">
        <SectionHeader title={agency.painIntro.title} subtitle={agency.painIntro.subtitle} />
        <div className="problem-grid">
          {agency.painPoints.map((point, index) => (
            <article className="problem-card reveal" key={point.title} style={{ "--i": index }}>
              <div className="problem-microbe" aria-hidden="true" />
              <div className="problem-pill" aria-hidden="true" />
              <h3>{point.title}</h3>
              <p>{point.text}</p>
              <span>{point.solution}</span>
            </article>
          ))}
        </div>
        <p className="section-closing">{agency.painIntro.closing}</p>
      </div>
    </section>
  );
}
