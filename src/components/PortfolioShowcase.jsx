import { useEffect, useState } from "react";
import { imageFallbackHandler, resolveAssetPath } from "../utils/assetFallback.js";
import { trackEvent } from "../utils/tracking.js";
import SectionHeader from "./SectionHeader.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";

const articleItems = [
  ["Skincare Mahal Gak Cukup", "assets/showcase/articles/skincare-mahal.webp"],
  ["Kopi Susu Tiap Hari dan Diabetes", "assets/showcase/articles/kopi-susu-diabetes.webp"],
  ["Jangan Sampai Si Kecil Kalah Tinggi", "assets/showcase/articles/tinggi-anak.webp"],
  ["Hobi Ciki dan Boba: Cek Fakta MSG", "assets/showcase/articles/msg-anak.webp"],
  ["Kalsium untuk Anak", "assets/showcase/articles/kalsium-anak.webp"],
  ["Zinc untuk Anak", "assets/showcase/articles/zinc-anak.webp"],
  ["Ekstrak Ikan Gabus untuk Penyembuhan", "assets/showcase/articles/ikan-gabus.webp"],
  ["Delima dan Antioksidan", "assets/showcase/articles/delima.webp"],
  ["Curcuma pada Fatty Liver", "assets/showcase/articles/curcuma-fatty-liver.webp"],
  ["PPI untuk Maag Lambung", "assets/showcase/articles/ppi-maag.webp"]
].map(([title, src]) => ({ type: "image", title, src }));

const infographicItems = [
  ["Pertolongan Pertama Luka Bakar di Rumah", "assets/showcase/infographics/luka-bakar-dirumah.webp"],
  ["Cara Membaca Gejala DBD, Tifus, atau Flu", "assets/showcase/infographics/dbd-tifus-flu.webp"],
  ["Panduan Memilih Sunscreen", "assets/showcase/infographics/panduan-sunscreen.webp"],
  ["Batasi GGL", "assets/showcase/infographics/batasi-ggl.webp"],
  ["Gejala Stroke: SeGeRa Ke RS", "assets/showcase/infographics/segera-ke-rs.webp"],
  ["Heimlich Maneuver", "assets/showcase/infographics/heimlich-maneuver.webp"]
].map(([title, src]) => ({ type: "image", title, src }));

const socialItems = [
  ...Array.from({ length: 9 }, (_, index) => ({
    type: "image",
    title: `IG Post Klinik ${index + 1}`,
    src: `assets/showcase/social-posts/post-maps-${index + 1}.webp`
  })),
  ...Array.from({ length: 5 }, (_, index) => ({
    type: "image",
    title: `Story Klinik ${index + 1}`,
    src: `assets/showcase/stories/story-maps-${index + 1}.webp`,
    portrait: true
  })),
  {
    type: "html",
    title: "Looping Reels HTML untuk Klinik",
    src: "assets/reels/reels-1.html"
  },
  {
    type: "html",
    title: "Motion Preview: Edukasi Hiperfosfat",
    src: "assets/reels/hiperfosfat-motion-preview.html"
  }
];

const deckItems = [
  ["Fever & Pain Management in Children", "assets/portfolio/thumbs/slides/fever-pain-management-children.webp"],
  ["Chronic Liver Disease Education Deck", "assets/portfolio/thumbs/slides/lola-chronic-liver-disease.webp"],
  ["Bone Health Scientific Deck", "assets/portfolio/thumbs/slides/zoledronic-acid.webp"],
  ["Doctor Reviewed SEO Deck", "assets/showcase/decks/doctor-reviewed-seo.webp"],
  ["Healthcare Lead Funnel Deck", "assets/showcase/decks/lead-funnel-healthcare.webp"]
].map(([title, src]) => ({ type: "image", title, src, wide: true }));

const educationDeckItems = [
  ["DHA EPA AA untuk Anak", "assets/portfolio/projects/dha-epa-aa-untuk-anak.html"],
  ["Perut Anak Sehat, Moms Lebih Tenang", "assets/portfolio/projects/perut-anak-sehat-moms-lebih-tenang.html"],
  ["Rahasia Orang yang Jarang Sakit", "assets/portfolio/projects/rahasia-orang-jarang-sakit.html"]
].map(([title, src]) => ({ type: "html", title, src, wide: true }));

const landingItems = [
  ["Landing Page Klinik Mari Kita Sehat", "assets/showcase/html/landing-klinik-mari-kita-sehat.html"],
  ["Landing Page Klinik Pratama Sehat Jaya", "assets/showcase/html/landing-klinik-pratama-sehat-jaya.html"],
  ["Landing Page Klinik Intan Utama", "assets/showcase/html/landing-klinik-intan-utama.html"]
].map(([title, src]) => ({ type: "html", title, src, wide: true }));

const panels = [
  {
    id: "scientific-article-poster",
    title: "Scientific Article & Poster",
    subtitle: "Artikel dan poster edukasi yang punya hook kuat, bahasa pasien, dan dasar ilmiah.",
    items: articleItems,
    message:
      "Halo MAPS, saya MAPSY mau asset Scientific Article & Poster seperti contoh portfolio. Saya ingin konten edukasi healthcare yang evidence-based dan tetap menarik."
  },
  {
    id: "infographic-poster",
    title: "Infographic Poster",
    subtitle: "Infografik panjang yang mengubah referensi medis menjadi alur baca yang lebih mudah dipahami.",
    items: infographicItems,
    message:
      "Halo MAPS, saya MAPSY mau Infographic Poster seperti contoh portfolio. Saya ingin materi edukasi kesehatan yang rapi, credible, dan mudah dibagikan."
  },
  {
    id: "social-media-content",
    title: "Social Media Content",
    subtitle: "IG post, story, dan motion preview untuk membuat edukasi klinik lebih tegas, cepat, dan memorable.",
    items: socialItems,
    message:
      "Halo MAPS, saya MAPSY mau Social Media Content seperti contoh portfolio. Saya ingin post, story, reels script, dan motion edukasi untuk healthcare saya."
  },
  {
    id: "scientific-deck",
    title: "Scientific Deck",
    subtitle: "Deck untuk tenaga kesehatan, forum ilmiah, simposium, webinar, atau edukasi internal.",
    items: deckItems,
    message:
      "Halo MAPS, saya MAPSY mau Scientific Deck seperti contoh portfolio. Saya ingin materi ilmiah yang lebih jelas, rapi, dan siap dipresentasikan."
  },
  {
    id: "interactive-education",
    title: "Interactive Education Deck",
    subtitle: "HTML deck interaktif untuk edukasi pasien, orang tua, atau audiens awam yang perlu dijelaskan bertahap.",
    items: educationDeckItems,
    message:
      "Halo MAPS, saya MAPSY mau Interactive Education Deck seperti contoh portfolio. Saya ingin materi edukasi healthcare yang bisa diklik dan dipresentasikan."
  },
  {
    id: "landing-page-showcase",
    title: "Landing Page Showcase",
    subtitle: "Contoh landing page layanan klinik yang mobile-friendly, CTA jelas, dan siap diarahkan ke tracking.",
    items: landingItems,
    message:
      "Halo MAPS, saya MAPSY mau Landing Page seperti contoh portfolio. Saya ingin website/landing page healthcare yang lebih meyakinkan dan siap tracking."
  }
];

function AssetTile({ panel, item, index, onOpen }) {
  const isHtml = item.type === "html";
  const open = () => onOpen(panel, item, index);
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  };

  return (
    <div
      className={`portfolio-asset-tile ${isHtml ? "portfolio-asset-tile--html" : ""} ${item.portrait ? "is-portrait" : ""}`}
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={handleKeyDown}
      aria-label={`Lihat ${item.title}`}
    >
      {isHtml ? (
        <iframe
          title={item.title}
          src={resolveAssetPath(item.src)}
          loading="lazy"
          tabIndex="-1"
          onLoad={() => trackEvent("portfolio_asset_view", { panel_id: panel.id, asset_title: item.title, asset_type: "html" })}
        />
      ) : (
        <img
          loading="lazy"
          src={resolveAssetPath(item.src)}
          alt={item.title}
          draggable="false"
          onError={(event) => imageFallbackHandler(event, item.title)}
        />
      )}
      <span>{item.title}</span>
    </div>
  );
}

function ModalPreview({ selected }) {
  const { item } = selected;
  if (item.type === "html") {
    return <iframe title={item.title} src={resolveAssetPath(item.src)} loading="lazy" />;
  }
  return (
    <img
      src={resolveAssetPath(item.src)}
      alt={item.title}
      draggable="false"
      onError={(event) => imageFallbackHandler(event, item.title)}
    />
  );
}

export default function PortfolioShowcase() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const openModal = (panel, item, index) => {
    setSelected({ panel, item, index });
    trackEvent("portfolio_card_click", { panel_id: panel.id, asset_title: item.title, index });
    trackEvent("portfolio_modal_open", { panel_id: panel.id, asset_title: item.title, asset_type: item.type });
    if (item.type === "html" && panel.id === "social-media-content") trackEvent("video_open", { panel_id: panel.id, asset_title: item.title });
  };

  return (
    <section id="portfolio" className="section section-anchor portfolio-v2" onContextMenu={(event) => event.preventDefault()}>
      <div className="container">
        <SectionHeader
          kicker="Proof of work"
          title="Portfolio MAPS dibagi sesuai fungsi asset."
          subtitle="Agar MAPSY bisa menilai: mana untuk edukasi, mana untuk trust, mana untuk search, mana untuk conversion."
        />

        <div className="portfolio-panel-stack">
          {panels.map((panel, panelIndex) => (
            <article className="portfolio-panel reveal" key={panel.id} style={{ "--i": panelIndex }}>
              <div className="portfolio-panel-head">
                <div>
                  <span>{String(panelIndex + 1).padStart(2, "0")}</span>
                  <h3>{panel.title}</h3>
                  <p>{panel.subtitle}</p>
                </div>
                <WhatsAppButton
                  className="btn btn-secondary portfolio-panel-cta"
                  source="portfolio_panel"
                  serviceInterest={panel.title}
                  message={panel.message}
                >
                  Saya mau asset seperti ini
                </WhatsAppButton>
              </div>
              <div className={`portfolio-asset-grid portfolio-asset-grid--${panel.id}`}>
                {panel.items.map((item, index) => (
                  <AssetTile panel={panel} item={item} index={index} key={`${panel.id}-${item.title}`} onOpen={openModal} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected ? (
        <div className="modal-backdrop portfolio-modal-v2-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <div
            className="portfolio-modal portfolio-modal-v2 portfolio-modal-v2--wide"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" aria-label="Tutup preview showcase" onClick={() => setSelected(null)}>
              <span />
              <span />
            </button>
            <div className={`modal-media-v2 ${selected.item.type === "html" ? "modal-media-v2--html" : ""}`}>
              <ModalPreview selected={selected} />
              <span className="portfolio-watermark">MAPS preview</span>
            </div>
            <div className="modal-copy modal-copy-v2">
              <span>{selected.panel.title}</span>
              <h3 id="portfolio-modal-title">{selected.item.title}</h3>
              <p>{selected.panel.subtitle}</p>
              <WhatsAppButton
                className="btn btn-primary"
                source="portfolio_modal"
                serviceInterest={selected.panel.title}
                message={selected.panel.message}
              >
                Saya mau asset seperti ini
              </WhatsAppButton>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
