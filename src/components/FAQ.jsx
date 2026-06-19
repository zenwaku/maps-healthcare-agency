import { faqs } from "../data/faq.js";
import SectionHeader from "./SectionHeader.jsx";

export default function FAQ() {
  return (
    <section id="faq" className="section section-soft section-anchor">
      <div className="container faq-container">
        <SectionHeader title="Pertanyaan yang sering ditanyakan pemilik klinik dan bisnis healthcare." />
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
