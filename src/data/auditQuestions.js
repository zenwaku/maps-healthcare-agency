export const auditQuestions = [
  { id: "has_website", label: "Apakah klinik sudah punya website?", weight: 8 },
  { id: "mobile_friendly", label: "Apakah website mobile-friendly?", weight: 8 },
  { id: "whatsapp_cta", label: "Apakah ada CTA WhatsApp yang jelas?", weight: 8 },
  { id: "ga4", label: "Apakah sudah punya Google Analytics?", weight: 8 },
  { id: "pixel", label: "Apakah sudah punya Meta Pixel?", weight: 8 },
  { id: "routine_social", label: "Apakah konten social media diposting rutin?", weight: 9 },
  { id: "content_pillar", label: "Apakah konten punya content pillar?", weight: 9 },
  { id: "seo_article", label: "Apakah ada artikel SEO?", weight: 8 },
  { id: "lead_recorded", label: "Apakah lead dari WhatsApp/DM dicatat?", weight: 9 },
  { id: "tracked_ads", label: "Apakah iklan pernah dijalankan dengan tracking?", weight: 8 },
  { id: "dashboard", label: "Apakah ada dashboard sederhana untuk follow-up?", weight: 8 },
  { id: "medical_review", label: "Apakah konten medis direview oleh tenaga medis?", weight: 9 }
];

export function getAuditResult(score, answers = {}) {
  const missing = (id) => !answers[id];

  let status = "Digital Presence Belum Siap";
  if (score >= 81) status = "Siap Scale dengan Campaign";
  else if (score >= 61) status = "Sudah Cukup Baik, Perlu Optimasi";
  else if (score >= 31) status = "Fondasi Ada, Tapi Belum Terukur";

  let recommendation = "Digital Foundation";
  let packageId = "digital-foundation";
  let packageLabel = "Digital Foundation for Clinic";
  let description =
    "Mulai dari halaman layanan, CTA WhatsApp, SEO dasar, dan tracking agar fondasi digital terlihat lebih siap.";

  if (missing("has_website") || missing("mobile_friendly") || missing("whatsapp_cta") || missing("ga4") || missing("pixel")) {
    recommendation = "Digital Foundation";
    packageId = "digital-foundation";
    packageLabel = "Digital Foundation for Clinic";
    description =
      "Prioritasnya adalah fondasi: website/landing page, CTA WhatsApp, SEO dasar, GA4, Meta Pixel, dan lead tracking awal.";
  } else if (missing("routine_social") || missing("content_pillar") || missing("medical_review") || missing("seo_article")) {
    recommendation = "Healthcare Content Engine";
    packageId = "content-engine";
    packageLabel = "Healthcare Content Engine";
    description =
      "MAPSY sudah punya fondasi, tapi butuh mesin konten yang rutin, credible, dan tetap nyaman dibaca pasien.";
  } else if (missing("tracked_ads")) {
    recommendation = "Lead Generation Campaign";
    packageId = "lead-generation-campaign";
    packageLabel = "Lead Generation Campaign";
    description =
      "Fondasi sudah cukup siap untuk campaign layanan tertentu, dengan landing page, creative angle, event, dan dashboard campaign.";
  } else if (missing("lead_recorded") || missing("dashboard")) {
    recommendation = "Healthcare Growth Partner";
    packageId = "growth-partner";
    packageLabel = "Healthcare Growth Partner";
    description =
      "Funnel sudah berjalan, sekarang perlu insight bulanan, follow-up yang rapi, dan optimasi end-to-end.";
  } else {
    recommendation = "Healthcare Growth Partner";
    packageId = "growth-partner";
    packageLabel = "Healthcare Growth Partner";
    description =
      "MAPSY sudah punya fondasi kuat. Fokus berikutnya adalah optimasi, eksperimen CTA, campaign, SEO cluster, dan insight rutin.";
  }

  return { status, recommendation, packageId, packageLabel, description };
}
