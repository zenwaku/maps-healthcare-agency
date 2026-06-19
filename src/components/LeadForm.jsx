import { useMemo, useState } from "react";
import { appendStorageList } from "../utils/storage.js";
import { trackEvent } from "../utils/tracking.js";
import { buildWhatsAppUrl, trackWhatsAppClick } from "../utils/whatsapp.js";
import SectionHeader from "./SectionHeader.jsx";

const businessTypes = [
  "Klinik umum",
  "Klinik gigi",
  "Klinik kecantikan",
  "Praktik dokter",
  "Apotek",
  "Lab/medical check-up",
  "Brand kesehatan",
  "Healthtech",
  "Farmasi/medical device",
  "Agency",
  "Lainnya"
];

const needs = [
  "Website",
  "Social media",
  "Artikel SEO",
  "Iklan",
  "Tracking",
  "Simple operation system",
  "Campaign",
  "Belum tahu, ingin audit"
];
const budgets = ["< 2 juta", "2-5 juta", "5-10 juta", "10-25 juta", "> 25 juta", "Belum tahu"];

const initialForm = {
  name: "",
  businessName: "",
  businessType: "Klinik umum",
  businessTypeOther: "",
  mainNeed: "Belum tahu, ingin audit",
  link: "",
  budget: "Belum tahu",
  message: ""
};

export default function LeadForm() {
  const [form, setForm] = useState(initialForm);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const businessTypeResolved = form.businessType === "Lainnya" ? form.businessTypeOther || "Lainnya" : form.businessType;

  const whatsappMessage = useMemo(() => {
    return [
      "Halo MAPS, saya MAPSY mau audit digital untuk klinik/bisnis healthcare saya dong \u{1F601}\u{1F601}\u{1F601}",
      "Saat ini saya butuh bantuan untuk website/konten/SEO/tracking/sistem operasional",
      "",
      `Nama: ${form.name || "-"}`,
      `Klinik/bisnis: ${form.businessName || "-"}`,
      `Jenis bisnis: ${businessTypeResolved}`,
      `Kebutuhan utama: ${form.mainNeed}`,
      `Link: ${form.link || "-"}`,
      `Budget range: ${form.budget}`,
      `Pesan: ${form.message || "-"}`
    ].join("\n");
  }, [businessTypeResolved, form]);

  const update = (field, value) => {
    if (!started) {
      setStarted(true);
      trackEvent("lead_form_start", { form: "lead_form" });
    }
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      businessTypeResolved,
      createdAt: new Date().toISOString(),
      source: "lead_form"
    };
    appendStorageList("maps_leads", payload);
    setSubmitted(true);
    trackEvent("lead_form_submit", {
      business_type: businessTypeResolved,
      main_need: form.mainNeed,
      budget: form.budget,
      __cloudPayload: payload
    });
    trackEvent("generate_lead", { channel: "lead_form", need: form.mainNeed });
  };

  const whatsappUrl = buildWhatsAppUrl({
    message: whatsappMessage,
    source: "lead_form",
    serviceInterest: form.mainNeed
  });

  return (
    <section id="lead-form" className="section section-anchor lead-section">
      <div className="container lead-grid">
        <div>
          <SectionHeader
            align="left"
            title="Ceritakan kondisi digital MAPSY sekarang."
            subtitle="Mulai dari situ, MAPS bisa bantu pilih langkah paling masuk akal: website, konten, SEO, tracking, campaign, atau sistem operasional."
          />
        </div>
        <form className="lead-form" onSubmit={submit}>
          <div className="form-row">
            <label>
              Nama
              <input value={form.name} onChange={(event) => update("name", event.target.value)} required />
            </label>
            <label>
              Nama klinik/bisnis
              <input value={form.businessName} onChange={(event) => update("businessName", event.target.value)} required />
            </label>
          </div>
          <div className="form-row">
            <label>
              Jenis bisnis
              <select value={form.businessType} onChange={(event) => update("businessType", event.target.value)}>
                {businessTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
            <label>
              Kebutuhan utama
              <select value={form.mainNeed} onChange={(event) => update("mainNeed", event.target.value)}>
                {needs.map((need) => (
                  <option key={need}>{need}</option>
                ))}
              </select>
            </label>
          </div>
          {form.businessType === "Lainnya" ? (
            <label>
              Jenis bisnis lainnya
              <input
                value={form.businessTypeOther}
                onChange={(event) => update("businessTypeOther", event.target.value)}
                placeholder="Contoh: klinik fisioterapi, homecare, distributor alat kesehatan"
                required
              />
            </label>
          ) : null}
          <label>
            Link Instagram/website jika ada
            <input value={form.link} onChange={(event) => update("link", event.target.value)} placeholder="https://..." />
          </label>
          <label>
            Budget range optional
            <select value={form.budget} onChange={(event) => update("budget", event.target.value)}>
              {budgets.map((budget) => (
                <option key={budget}>{budget}</option>
              ))}
            </select>
          </label>
          <label>
            Pesan singkat
            <textarea value={form.message} onChange={(event) => update("message", event.target.value)} rows="4" />
          </label>
          <button className="btn btn-primary btn-full" type="submit">
            Buat ringkasan konsultasi
          </button>
          {submitted ? (
            <div className="success-state" role="status">
              <strong>Ringkasan MAPSY siap.</strong>
              <span>Lanjutkan ke WhatsApp supaya konteksnya langsung terbaca.</span>
              <a
                className="btn btn-secondary btn-full"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    source: "lead_form",
                    serviceInterest: form.mainNeed
                  })
                }
              >
                Kirim ke WhatsApp
              </a>
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}
