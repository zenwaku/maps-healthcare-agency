import { agency } from "../data/agency.js";
import { audienceIconMap } from "../data/icons.js";
import AnimatedIcon from "./AnimatedIcon.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function TrustBar() {
  return (
    <section id="audience" className="section section-soft section-anchor">
      <div className="container">
        <SectionHeader
          kicker="Healthcare fit"
          title={agency.audienceTitle}
          subtitle="Dari klinik, apotek, lab, sampai brand kesehatan, prioritasnya sama: trust, clarity, lead flow, dan pesan yang tidak asal klaim."
        />
        <div className="audience-grid">
          {agency.audiences.map((item) => (
            <article className="audience-card reveal" key={item.title}>
              <AnimatedIcon name={audienceIconMap[item.title]} motion="float" className="audience-asset-icon" />
              <h3>{item.title}</h3>
              <p>{item.problem}</p>
              <span>{item.service}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
