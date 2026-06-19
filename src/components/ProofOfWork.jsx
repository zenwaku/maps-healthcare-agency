import { portfolioItems } from "../data/portfolio.js";
import { imageFallbackHandler, resolveAssetPath } from "../utils/assetFallback.js";
import SectionHeader from "./SectionHeader.jsx";

export default function ProofOfWork() {
  const preview = portfolioItems.slice(0, 6);

  return (
    <section id="proof" className="section section-soft section-anchor">
      <div className="container">
        <SectionHeader
          title="Proof of Work, Not Empty Claims"
          subtitle="Sebelum menampilkan testimonial resmi, Anda bisa menilai kualitas pendekatan kami dari contoh output: bagaimana kami menyusun hook, menyederhanakan informasi medis, membuat visual edukatif, membangun website, dan menyiapkan tracking."
        />
        <div className="proof-strip">
          {preview.map((item) => (
            <article className="proof-item reveal" key={item.id}>
              {item.thumbnail ? (
                <img
                  loading="lazy"
                  src={resolveAssetPath(item.thumbnail)}
                  alt={`Preview ${item.title}`}
                  onError={(event) => imageFallbackHandler(event, item.title)}
                />
              ) : (
                <div className="proof-fallback" aria-label={`Preview ${item.title}`}>
                  <span />
                  <span />
                  <span />
                </div>
              )}
              <h3>{item.category}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
