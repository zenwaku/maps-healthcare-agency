import { useEffect, useRef, useState } from "react";
import { imageFallbackHandler, resolveAssetPath } from "../utils/assetFallback.js";
import { trackEvent } from "../utils/tracking.js";
import SectionHeader from "./SectionHeader.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";

const articleReaderItems = [
  {
    type: "article",
    title: "Kalsium untuk Anak",
    src: "assets/portfolio/thumbs/articles/kalsium-untuk-anak.webp",
    summary: "Artikel edukasi untuk membantu orang tua memahami peran kalsium tanpa membuat klaim berlebihan.",
    article: {
      intro:
        "Kalsium sering dibicarakan saat membahas pertumbuhan anak. Artikel ini menempatkan kalsium sebagai bagian dari pola makan, aktivitas, tidur, dan evaluasi tumbuh kembang yang lebih utuh.",
      points: [
        ["Sudut pasien", "Orang tua butuh tahu tanda asupan yang perlu diperhatikan, bukan hanya daftar makanan tinggi kalsium."],
        ["Arah SEO", "Menjawab pencarian seputar kalsium anak, tinggi badan, susu, dan kapan perlu konsultasi."],
        ["Batas klaim", "Tidak menjanjikan anak pasti lebih tinggi; fokus pada kebutuhan nutrisi dan evaluasi yang tepat."]
      ],
      references: ["Kebutuhan gizi anak", "Prinsip edukasi nutrisi pediatrik", "Clinical review sebelum publikasi"]
    }
  },
  {
    type: "article",
    title: "Zinc untuk Anak",
    src: "assets/portfolio/thumbs/articles/zinc-untuk-anak-besar-perannya.webp",
    summary: "Contoh artikel dengan hook sederhana untuk topik imunitas dan tumbuh kembang anak.",
    article: {
      intro:
        "Zinc sering dikaitkan dengan daya tahan tubuh anak. Copy dibuat tetap ringan, sambil menjelaskan bahwa kebutuhan suplemen perlu melihat pola makan dan kondisi anak.",
      points: [
        ["Sudut pasien", "Membantu orang tua memahami kenapa anak sering sakit tidak bisa langsung disimpulkan dari satu nutrisi saja."],
        ["Arah SEO", "Dibuat untuk intent pencarian zinc anak, anak sering sakit, dan nutrisi pendukung daya tahan."],
        ["Batas klaim", "Tidak menyebut zinc pasti mencegah sakit; pesan diarahkan ke edukasi dan konsultasi bila perlu."]
      ],
      references: ["Nutrisi mikro anak", "Guideline edukasi suplementasi", "Medical claim check"]
    }
  },
  {
    type: "article",
    title: "Curcuma pada Fatty Liver",
    src: "assets/portfolio/thumbs/articles/manfaat-curcuma-pada-fatty-liver.webp",
    summary: "Contoh artikel healthcare untuk brand wellness yang butuh tone scientific tapi tetap mudah dibaca.",
    article: {
      intro:
        "Topik fatty liver mudah jatuh ke klaim bombastis. Artikel diarahkan untuk menjelaskan konteks metabolik, gaya hidup, dan posisi bahan aktif sebagai edukasi, bukan janji terapi.",
      points: [
        ["Sudut pasien", "Membuat pembaca paham bahwa fatty liver perlu pendekatan pola makan, aktivitas, dan evaluasi medis."],
        ["Arah SEO", "Menghubungkan intent fatty liver, curcuma, hati berlemak, dan edukasi pencegahan."],
        ["Batas klaim", "Tidak menyatakan curcuma menyembuhkan fatty liver; manfaat dibahas dengan batas konteks."]
      ],
      references: ["Review nutraceutical", "Edukasi fatty liver", "Clinical reasoning untuk klaim wellness"]
    }
  },
  {
    type: "article",
    title: "PPI untuk Maag Lambung",
    src: "assets/portfolio/thumbs/articles/maag-sering-kambuh.webp",
    summary: "Contoh artikel untuk menjelaskan obat yang sering dipakai pasien tanpa mendorong self-medication sembarangan.",
    article: {
      intro:
        "PPI sering dicari pasien saat maag kambuh. Artikel dibuat untuk menjelaskan fungsi, batas penggunaan, red flag, dan kapan harus konsultasi tenaga kesehatan.",
      points: [
        ["Sudut pasien", "Menjawab pertanyaan umum tanpa membuat pembaca merasa boleh menentukan terapi sendiri."],
        ["Arah SEO", "Menangkap intent maag sering kambuh, obat asam lambung, PPI, dan kapan perlu periksa."],
        ["Batas klaim", "Tidak memberi instruksi terapi individual; fokus pada edukasi dan arahan konsultasi."]
      ],
      references: ["Edukasi GERD/dispepsia", "Safety messaging obat", "Clinical review sebelum publikasi"]
    }
  }
];

const articlePosterItems = [
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

const articleItems = [...articleReaderItems, ...articlePosterItems];

const infographicItems = [
  ["Pertolongan Pertama Luka Bakar di Rumah", "assets/showcase/infographics/luka-bakar-dirumah.webp"],
  ["Cara Membaca Gejala DBD, Tifus, atau Flu", "assets/showcase/infographics/dbd-tifus-flu.webp"],
  ["Panduan Memilih Sunscreen", "assets/showcase/infographics/panduan-sunscreen.webp"],
  ["Batasi GGL", "assets/showcase/infographics/batasi-ggl.webp"],
  ["Gejala Stroke: SeGeRa Ke RS", "assets/showcase/infographics/segera-ke-rs.webp"],
  ["Heimlich Maneuver", "assets/showcase/infographics/heimlich-maneuver.webp"]
].map(([title, src]) => ({ type: "image", title, src }));

const singlePostItems = Array.from({ length: 9 }, (_, index) => ({
    type: "image",
    title: `IG Post Klinik ${index + 1}`,
    src: `assets/showcase/social-posts/post-maps-${index + 1}.webp`
  }));

const storyItems = Array.from({ length: 5 }, (_, index) => ({
    type: "image",
    title: `Story Klinik ${index + 1}`,
    src: `assets/showcase/stories/story-maps-${index + 1}.webp`,
    portrait: true
  }));

const reelsItems = [
  {
    type: "html",
    title: "Looping Reels HTML untuk Klinik",
    src: "assets/reels/reels-1.html"
  }
];

const deckItems = [
  ["Fever & Pain Management in Children", "assets/showcase/decks/fever-pain-management-children.webp"],
  ["Lower Gastrointestinal Injury: Clinical Update", "assets/showcase/decks/nsaid-lower-gi-injury.webp"],
  ["Fatty Liver Disease: Clinical Strategy", "assets/showcase/decks/fatty-liver-strategies.webp"],
  ["IBD in the Era of Advanced Therapy", "assets/showcase/decks/ibd-therapy.webp"],
  ["Variceal Bleeding to Pancreatitis: Clinical Update", "assets/showcase/decks/variceal-bleeding-pancreatitis.webp"]
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
    subtitle: "Satu sistem konten, tiga format yang punya peran berbeda: membangun feed, menjaga ritme story, dan menarik perhatian lewat reels.",
    groups: [
      {
        id: "single-post",
        title: "Single Post",
        subtitle: "Sembilan konten feed dengan hook, hierarchy, dan CTA yang konsisten.",
        items: singlePostItems
      },
      {
        id: "story",
        title: "Story",
        subtitle: "Lima story vertikal untuk edukasi cepat dan jalur menuju WhatsApp.",
        items: storyItems
      },
      {
        id: "reels",
        title: "Reels",
        subtitle: "Satu contoh motion HTML yang looping dan ringan untuk preview campaign.",
        items: reelsItems
      }
    ],
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
  const isArticle = item.type === "article";
  const open = () => onOpen(panel, item, index);
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  };

  return (
    <div
      className={`portfolio-asset-tile ${isHtml ? "portfolio-asset-tile--html" : ""} ${isArticle ? "portfolio-asset-tile--article" : ""} ${item.portrait ? "is-portrait" : ""} ${item.wide ? "is-wide" : ""}`}
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
          sandbox="allow-scripts"
          tabIndex="-1"
          onLoad={() => trackEvent("portfolio_asset_view", { panel_id: panel.id, asset_title: item.title, asset_type: "html" })}
        />
      ) : isArticle ? (
        <>
          <img
            loading="lazy"
            src={resolveAssetPath(item.src)}
            alt={`Preview artikel ${item.title}`}
            draggable="false"
            onError={(event) => imageFallbackHandler(event, item.title)}
          />
          <div className="article-tile-copy">
            <small>Draft artikel</small>
            <p>{item.summary}</p>
            <span className="article-open-label">Baca artikel</span>
          </div>
        </>
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

function ArticlePreview({ item }) {
  return (
    <div className="article-preview">
      <img
        src={resolveAssetPath(item.src)}
        alt={`Thumbnail artikel ${item.title}`}
        draggable="false"
        onError={(event) => imageFallbackHandler(event, item.title)}
      />
      <div className="article-preview-copy">
        <span>Draft artikel berbasis referensi</span>
        <h4>{item.title}</h4>
        <p>{item.article.intro}</p>
        <div className="article-preview-points">
          {item.article.points.map(([label, copy]) => (
            <article key={label}>
              <strong>{label}</strong>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <div className="article-preview-references" aria-label="Arah referensi artikel">
          {item.article.references.map((reference) => (
            <span key={reference}>{reference}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InteractiveDeckPreview({ item }) {
  const frameRef = useRef(null);

  const moveSlide = (direction) => {
    const frame = frameRef.current;
    if (!frame) return;
    try {
      const documentRef = frame.contentDocument;
      const control =
        documentRef?.getElementById(direction === "next" ? "nextBtn" : "prevBtn") ||
        documentRef?.getElementById(direction === "next" ? "next" : "prev") ||
        documentRef?.querySelector(direction === "next" ? "[data-next], .next, .swiper-button-next" : "[data-prev], .prev, .swiper-button-prev");
      if (control) {
        control.click();
      } else {
        frame.contentWindow?.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: direction === "next" ? "ArrowRight" : "ArrowLeft",
            bubbles: true
          })
        );
      }
      trackEvent("portfolio_asset_view", {
        asset_title: item.title,
        asset_type: "interactive_deck",
        interaction: `${direction}_slide`
      });
    } catch {
      // The deck remains usable through its own controls if browser iframe policy changes.
    }
  };

  return (
    <div className="interactive-deck-preview">
      <iframe ref={frameRef} title={item.title} src={resolveAssetPath(item.src)} loading="lazy" />
      <div className="interactive-deck-controls" aria-label="Kontrol slide education deck">
        <button type="button" onClick={() => moveSlide("previous")} aria-label="Previous slide">
          <span aria-hidden="true">&#8592;</span> Previous
        </button>
        <span>Navigate inside this deck</span>
        <button type="button" onClick={() => moveSlide("next")} aria-label="Next slide">
          Next <span aria-hidden="true">&#8594;</span>
        </button>
      </div>
    </div>
  );
}

function ModalPreview({ selected }) {
  const { item } = selected;
  if (item.type === "article") {
    return <ArticlePreview item={item} />;
  }
  if (item.type === "html" && selected.panel.id === "interactive-education") {
    return <InteractiveDeckPreview item={item} />;
  }
  if (item.type === "html") {
    return (
      <iframe
        title={item.title}
        src={resolveAssetPath(item.src)}
        loading="lazy"
        sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        referrerPolicy="no-referrer"
      />
    );
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

  useEffect(() => {
    const handleShowcaseMessage = (event) => {
      const data = event.data || {};
      if (data.type !== "maps_showcase_cta") return;
      trackEvent("portfolio_asset_view", {
        panel_id: selected?.panel?.id || "landing-page-showcase",
        asset_title: selected?.item?.title || data.demo || "Landing page demo",
        asset_type: "landing_page_demo",
        demo: data.demo,
        interaction: data.action
      });
    };

    window.addEventListener("message", handleShowcaseMessage);
    return () => window.removeEventListener("message", handleShowcaseMessage);
  }, [selected]);

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
          title="Dari topik medis yang rumit jadi aset yang enak dibaca dan siap dipakai."
          subtitle="Artikel, poster, story, deck, dan landing page dibuat dengan tujuan yang jelas: pasien paham, brand lebih dipercaya, dan action lebih mudah terjadi."
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
              {panel.groups ? (
                <div className="portfolio-subgroups">
                  {panel.groups.map((group) => (
                    <section className="portfolio-subgroup" key={group.id} aria-labelledby={`${panel.id}-${group.id}-title`}>
                      <div className="portfolio-subgroup-head">
                        <h4 id={`${panel.id}-${group.id}-title`}>{group.title}</h4>
                        <p>{group.subtitle}</p>
                      </div>
                      <div className={`portfolio-asset-grid portfolio-asset-grid--${panel.id}-${group.id}`}>
                        {group.items.map((item, index) => (
                          <AssetTile
                            panel={panel}
                            item={item}
                            index={index}
                            key={`${panel.id}-${group.id}-${item.type}-${item.title}-${index}`}
                            onOpen={openModal}
                          />
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <div className={`portfolio-asset-grid portfolio-asset-grid--${panel.id}`}>
                  {panel.items.map((item, index) => (
                    <AssetTile panel={panel} item={item} index={index} key={`${panel.id}-${item.type}-${item.title}-${index}`} onOpen={openModal} />
                  ))}
                </div>
              )}
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
            <div className={`modal-media-v2 ${selected.item.type === "html" ? "modal-media-v2--html" : ""} ${selected.item.type === "article" ? "modal-media-v2--article" : ""}`}>
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
