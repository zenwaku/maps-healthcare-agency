import { useEffect, useRef, useState } from "react";
import {
  audienceSegments,
  careFramework,
  clinicProblems,
  opsModules,
  processSteps,
  seoPairs,
  servicesV2
} from "../data/landingV2.js";
import { resolveAssetPath } from "../utils/assetFallback.js";
import { trackEvent } from "../utils/tracking.js";
import AnimatedIcon from "./AnimatedIcon.jsx";
import KineticText from "./KineticText.jsx";
import SectionHeader from "./SectionHeader.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";

function HookTitle({ children, className = "" }) {
  return (
    <h2 className={`hook-title ${className}`}>
      <KineticText text={children} chunk="word" />
    </h2>
  );
}

export function VisibilityGap() {
  return (
    <section id="masalah-klinik" className="section section-anchor visibility-gap">
      <div className="container visibility-grid">
        <div className="visibility-copy reveal">
          <span className="section-kicker">The visibility problem</span>
          <HookTitle>Layanannya sudah dipercaya. Tapi calon pasien belum tentu menemukannya.</HookTitle>
          <p>
            Dokternya kompeten. Pasiennya puas. Namun kalau Google, Instagram, dan websitenya belum meyakinkan,
            kualitas layanan itu tidak sempat terlihat oleh orang yang sedang mencarinya.
          </p>
          <div className="signal-stack" aria-label="Sinyal trust digital klinik">
            {["Ditemukan", "Dipahami", "Dipercaya", "Dihubungi", "Diukur"].map((signal, index) => (
              <span key={signal} style={{ "--i": index }}>
                {signal}
              </span>
            ))}
          </div>
        </div>
        <div className="clinic-switchboard reveal reveal-delay" aria-label="Perbandingan klinik offline dan online">
          <div className="switch-card switch-card--offline">
            <AnimatedIcon name="clinic" motion="bob" />
            <small>Offline</small>
            <strong>Layanan rapi</strong>
            <span>Dokter bagus. Pasien puas. Operasional berjalan.</span>
          </div>
          <div className="switch-magnet" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="switch-card switch-card--online">
            <AnimatedIcon name="search" motion="pulse" />
            <small>Online</small>
            <strong>Belum meyakinkan</strong>
            <span>Website tipis. SEO kosong. CTA samar. Tracking belum ada.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AudienceSegments() {
  return (
    <section id="audience" className="section section-soft section-anchor audience-v2">
      <div className="container">
        <SectionHeader
          kicker="Untuk siapa?"
          title="MAPS untuk healthcare brand yang ingin terlihat lebih siap, rapi, dan credible."
          subtitle="Dari klinik, apotek, lab, brand kesehatan, healthtech, sampai partner agency yang butuh medical supervision."
        />
        <div className="audience-grid-v2">
          {audienceSegments.map((segment, index) => (
            <article className="audience-card-v2 reveal" key={segment.title} style={{ "--i": index }}>
              <div className="audience-portrait">
                <img loading="lazy" src={resolveAssetPath(segment.image)} alt={`Ilustrasi ${segment.title} untuk target MAPS`} />
                <AnimatedIcon name={segment.icon} motion={index % 3 === 0 ? "bob" : index % 3 === 1 ? "wiggle" : "pulse"} />
              </div>
              <div>
                <h3>{segment.title}</h3>
                <p>{segment.hook}</p>
                <span>{segment.service}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HealthcareProblems() {
  return (
    <section id="hidden-problems" className="section section-anchor problem-cute">
      <div className="container">
        <SectionHeader
          kicker="Masalah yang sering tidak terlihat"
          title="Masalah digital yang diam-diam membuat calon pasien berhenti percaya."
          subtitle="Bukan hanya soal feed yang sepi. Pesan yang kabur, klaim yang lemah, dan funnel yang tidak terbaca ikut menentukan keputusan pasien."
        />
        <div className="problem-grid-v2">
          {clinicProblems.map((problem, index) => (
            <article className="problem-card-v2 reveal" key={problem.title} style={{ "--i": index }}>
              <div className="problem-icon-wrap">
                <AnimatedIcon name={problem.icon} motion={index % 3 === 0 ? "float" : index % 3 === 1 ? "wiggle" : "pulse"} />
                <span className="tiny-noise" aria-hidden="true" />
              </div>
              <h3>{problem.title}</h3>
              <p>{problem.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BridgeToMaps() {
  const journey = [
    { icon: "clinic", label: "Layanan dipercaya", copy: "Kualitasnya sudah terasa offline." },
    { icon: "search", label: "Digital diperjelas", copy: "Pesan dan kanal dibuat mudah ditemukan." },
    { icon: "analytics", label: "Respons diukur", copy: "Klik, chat, dan minat tidak lagi ditebak." }
  ];

  return (
    <section id="maps-bridge" className="section section-anchor maps-bridge">
      <div className="container maps-bridge-inner">
        <div className="maps-bridge-copy reveal">
          <span className="section-kicker">Saatnya digital menyusul</span>
          <HookTitle>Kualitas layanan Anda sudah bekerja. Digital presence-nya harus ikut meyakinkan.</HookTitle>
          <p>
            Ketika calon pasien belum melihat kualitas yang sama secara online, ada jarak antara layanan yang sebenarnya bagus
            dan kesan pertama yang mereka terima.
          </p>
        </div>
        <div className="bridge-path reveal reveal-delay" aria-label="Perjalanan dari layanan offline ke pertumbuhan digital terukur">
          {journey.map((item, index) => (
            <article key={item.label} style={{ "--i": index }}>
              <AnimatedIcon name={item.icon} motion={index === 1 ? "pulse" : "bob"} />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MeetMaps() {
  const promises = [
    {
      icon: "doctor",
      title: "Bahasa medis diterjemahkan",
      copy: "Informasi klinis diubah menjadi pesan yang jelas, manusiawi, dan tetap bertanggung jawab."
    },
    {
      icon: "responsive",
      title: "Semua kanal dibuat nyambung",
      copy: "Website, konten, SEO, WhatsApp, dan campaign bergerak dalam satu arah yang konsisten."
    },
    {
      icon: "analytics",
      title: "Performa tidak lagi ditebak",
      copy: "CTA, sumber traffic, minat layanan, dan lead disiapkan agar bisa dibaca dan dioptimasi."
    }
  ];

  return (
    <section id="meet-maps" className="section section-anchor meet-maps">
      <div className="container meet-maps-grid">
        <div className="meet-maps-intro reveal">
          <span className="section-kicker">Kenalkan, MAPS</span>
          <HookTitle>Partner transformasi digital yang memang dibangun untuk healthcare.</HookTitle>
          <p>
            Medical Advanced Portfolio Solution membantu layanan kesehatan tampil sekuat kualitas aslinya: lebih mudah
            ditemukan, lebih cepat dipahami, lebih layak dipercaya, dan lebih siap diukur.
          </p>
          <a
            className="btn btn-primary"
            href="#solusi"
            onClick={() => trackEvent("cta_click", { placement: "meet_maps", label: "Lihat solusi MAPS" })}
          >
            Lihat Solusi MAPS
          </a>
        </div>
        <div className="meet-maps-promise reveal reveal-delay">
          {promises.map((item, index) => (
            <article key={item.title} style={{ "--i": index }}>
              <AnimatedIcon name={item.icon} motion={index === 1 ? "wiggle" : "pulse"} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CareFramework() {
  return (
    <section id="care-framework" className="section section-soft section-anchor care-framework">
      <div className="container">
        <SectionHeader
          kicker="The MAPS way"
          title="Biar kreatifnya tetap punya pagar."
          subtitle="Cara MAPS menjaga konten healthcare tetap menarik, aman untuk brand, dan bisa dibaca datanya."
        />
        <div className="care-grid">
          {careFramework.map((item, index) => (
            <article className="care-card reveal" key={item.letter} style={{ "--i": index }}>
              <div className="care-letter" aria-hidden="true">
                <KineticText as="span" text={item.letter} chunk="char" />
              </div>
              <AnimatedIcon name={item.icon} motion={index % 2 ? "wiggle" : "pulse"} />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DoctorLedSystem() {
  const left = ["Posting viral", "AI rewrite", "Caption cantik", "Website template", "Tracking seadanya"];
  const right = ["Clinical reasoning", "Evidence angle", "Patient language", "SEO + GEO", "Event tracking"];

  return (
    <section id="doctor-led" className="section section-anchor doctor-led-v2">
      <div className="container doctor-led-grid">
        <div className="doctor-led-visual reveal">
          <img
            loading="lazy"
            src={resolveAssetPath("assets/cute/agency-team.webp")}
            alt="Ilustrasi tim MAPS yang menyusun strategi digital marketing healthcare"
          />
          <div className="validation-orbit" aria-hidden="true">
            <AnimatedIcon name="doctor" motion="bob" />
            <AnimatedIcon name="ai" motion="pulse" />
            <AnimatedIcon name="shield" motion="wiggle" />
          </div>
        </div>
        <div className="doctor-led-copy reveal reveal-delay">
          <span className="section-kicker">Doctor-led, AI-assisted</span>
          <HookTitle>AI mempercepat kerja. Dokter menjaga arah dan batas klaim.</HookTitle>
          <p>
            Di healthcare, satu kalimat bisa membangun trust atau membuat klaim jadi berisiko. MAPS memakai AI untuk riset awal,
            ide, outline, variasi copy, dan batching. Arah komunikasi tetap diperiksa manusia dengan perspektif medis.
          </p>
          <div className="compare-rails">
            <div>
              <strong>Agency biasa</strong>
              {left.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div>
              <strong>MAPS</strong>
              {right.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCardV2({ service, index }) {
  const cardRef = useRef(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node || hasTracked.current || typeof window === "undefined") return undefined;

    const fireView = () => {
      if (hasTracked.current) return;
      hasTracked.current = true;
      trackEvent("service_card_view", {
        service_id: service.id,
        service_title: service.title
      });
    };

    if (!("IntersectionObserver" in window)) {
      fireView();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fireView();
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [service.id, service.title]);

  return (
    <article className={`service-card-v2 reveal ${service.comingSoon ? "service-card-v2--soon" : ""}`} ref={cardRef} style={{ "--i": index }}>
      <AnimatedIcon name={service.icon} motion={index % 2 ? "wiggle" : "float"} />
      {service.comingSoon ? <span className="coming-soon-badge">Coming soon</span> : null}
      <h3>{service.title}</h3>
      <p>{service.hook}</p>
      <div className="service-tags">
        {service.points.map((point) => (
          <span key={point}>{point}</span>
        ))}
      </div>
      <WhatsAppButton
        className="service-mini-cta"
        source="service_card"
        serviceInterest={service.title}
        message={service.waMessage}
        eventName="service_cta_click"
      >
        {service.comingSoon ? "Ikut update" : "Diskusi layanan ini"}
      </WhatsAppButton>
    </article>
  );
}

export function ServicesV2() {
  return (
    <section id="solusi" className="section section-soft section-anchor services-v2">
      <div className="container">
        <SectionHeader
          kicker="Solusi end-to-end"
          title="Dari trust, konten, website, sampai tracking."
          subtitle="Mulai dari yang paling perlu dirapikan, lalu kembangkan setelah respon audiens dan datanya mulai terbaca."
        />
        <div className="services-grid-v2">
          {servicesV2.map((service, index) => (
            <ServiceCardV2 service={service} index={index} key={service.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SeoGeoSection() {
  const [activePair, setActivePair] = useState(0);
  const currentPair = seoPairs[activePair] || seoPairs[0];

  const selectPair = (index, label) => {
    setActivePair(index);
    trackEvent("portfolio_filter_click", { filter: `seo_geo_${label}`, section: "seo_geo" });
  };

  return (
    <section id="seo-geo" className="section section-anchor seo-geo-v2">
      <div className="container seo-geo-grid">
        <div className="reveal">
          <span className="section-kicker">SEO + GEO</span>
          <HookTitle>Dicari Google. Dibaca pasien. Dipahami AI.</HookTitle>
          <p>
            MAPS menyusun konten dari pertanyaan yang benar-benar dicari pasien, lalu merapikannya agar mudah dipahami Google
            dan mesin jawaban AI tanpa menjanjikan ranking instan.
          </p>
        </div>
        <div className="seo-pair-explorer reveal reveal-delay">
          <div className="seo-pair-tabs" role="tablist" aria-label="Contoh pendekatan SEO dan GEO MAPS">
            {seoPairs.map((pair, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activePair === index}
                className={`seo-pair-tab ${activePair === index ? "seo-pair-tab--active" : ""}`}
                key={pair.label}
                onClick={() => selectPair(index, pair.label)}
              >
                {pair.label}
              </button>
            ))}
          </div>
          <article className="seo-pair seo-pair--active">
            <span>{currentPair.label}</span>
            <div className="seo-pair-body">
              <div>
                <small>Masih terlalu umum</small>
                <p>{currentPair.bad}</p>
              </div>
              <div>
                <small>Arah MAPS</small>
                <p>{currentPair.good}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function WebinarSection() {
  return (
    <section id="webinar" className="section section-anchor webinar-section">
      <div className="container webinar-card reveal">
        <div>
          <span className="section-kicker">Webinar engine</span>
          <HookTitle>Edukasi publik yang terasa rapi sejak tema sampai follow-up.</HookTitle>
          <p>
            Tema, objective, audience, rundown, landing page registrasi, deck, materi promosi, speaker note, sampai dokter sebagai
            narasumber bisa dirancang dari satu arah campaign.
          </p>
        </div>
        <div className="webinar-flow" aria-label="Alur webinar healthcare">
          {["Tema", "Deck", "Promo", "Speaker", "Follow-up"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessV2() {
  return (
    <section id="process" className="section section-anchor process-v2">
      <div className="container">
        <SectionHeader
          kicker="Cara kerja"
          title="Marketing-first. Medical-supervised. Tracking-ready."
          subtitle="Dari audit sampai optimasi, MAPS menjaga setiap langkah tetap jelas, prioritasnya masuk akal, dan datanya terbaca."
        />
        <div className="process-track-v2">
          {processSteps.map((step, index) => (
            <article className="process-step-v2 reveal" key={step.title} style={{ "--i": index }}>
              <span className="process-number">{String(index + 1).padStart(2, "0")}</span>
              <AnimatedIcon name={step.icon} motion="pulse" />
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MapsOpsPreview() {
  return (
    <section id="ops-preview" className="section section-soft section-anchor ops-preview">
      <div className="container ops-grid">
        <div className="ops-copy reveal">
          <span className="section-kicker">Next digitalization layer</span>
          <HookTitle>Fondasi marketing dulu. Operasional digital menyusul saat klinik siap.</HookTitle>
          <span className="coming-soon-pill">COMING SOON</span>
          <p>
            MAPS bukan hanya membuat klinik terlihat rapi. Ke depan, fondasi digital bisa berkembang menjadi blueprint sistem
            operasional: registrasi, rekam medis, apotek, stok, jadwal, dan dashboard.
          </p>
          <WhatsAppButton
            className="btn btn-secondary ops-soon-cta"
            source="ops_preview"
            message="Halo MAPS, saya MAPSY ingin tahu update Digitalization Layer MAPS ketika web app operasionalnya sudah siap."
          >
            Minta update roadmap
          </WhatsAppButton>
        </div>
        <div className="ops-board reveal reveal-delay" aria-label="Preview modul operasional klinik MAPS">
          {opsModules.map((module, index) => (
            <article key={module.title} style={{ "--i": index }}>
              <AnimatedIcon name={module.icon} motion={index % 2 ? "float" : "bob"} />
              <div>
                <h3>{module.title}</h3>
                <p>{module.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrackingStackV2() {
  const items = [
    ["GA4", "page_view, scroll, CTA, section, lead"],
    ["Meta Pixel", "ViewContent, Contact, Lead"],
    ["WhatsApp", "Klik tombol, source, service interest"],
    ["UTM", "IG, Google, broadcast, QR, referral"],
    ["Google Sheets", "Lead dan event tersusun rapi di Sheet"],
    ["Looker Studio", "Dashboard ringkas untuk insight bulanan"]
  ];

  return (
    <section id="tracking" className="section section-anchor tracking-stack-v2">
      <div className="container tracking-grid-v2">
        <div className="tracking-dashboard-v2 reveal">
          <div className="dash-topline">
            <strong>MAPS Measurement Layer</strong>
            <span>ready</span>
          </div>
          <div className="dash-bars" aria-hidden="true">
            <span style={{ height: "42%" }} />
            <span style={{ height: "68%" }} />
            <span style={{ height: "54%" }} />
            <span style={{ height: "82%" }} />
            <span style={{ height: "61%" }} />
          </div>
          <div className="dash-pulses">
            {items.slice(0, 4).map(([label]) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
        <div className="reveal reveal-delay">
          <span className="section-kicker">Bisa dipantau</span>
          <HookTitle>Bukan cuma dibuatkan. Dibuat agar bisa diukur.</HookTitle>
          <p>
            MAPSY bisa membaca dari mana calon pasien datang, tombol mana yang diklik, aset mana yang menarik minat, dan funnel
            mana yang paling perlu dirapikan berikutnya.
          </p>
          <div className="tracking-chip-grid">
            {items.map(([label, copy]) => (
              <article key={label}>
                <strong>{label}</strong>
                <span>{copy}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
