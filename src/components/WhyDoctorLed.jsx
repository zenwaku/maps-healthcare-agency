import { agency } from "../data/agency.js";
import SectionHeader from "./SectionHeader.jsx";

export default function WhyDoctorLed() {
  const { comparison } = agency;

  return (
    <section id="doctor-led" className="section section-anchor doctor-led-section">
      <div className="container">
        <SectionHeader title={comparison.title} subtitle={comparison.subtitle} />
        <div className="comparison-grid">
          <article className="comparison-panel comparison-panel--noise reveal">
            <div className="noise-stack" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <h3>{comparison.leftTitle}</h3>
            <ul>
              {comparison.left.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="comparison-panel comparison-panel--clean reveal reveal-delay">
            <div className="clean-stack" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <h3>{comparison.rightTitle}</h3>
            <ul>
              {comparison.right.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <p className="doctor-highlight">{comparison.highlight}</p>
      </div>
    </section>
  );
}
