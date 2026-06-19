import { agency } from "../data/agency.js";
import { faqs } from "../data/faq.js";
import { servicesV2 } from "../data/landingV2.js";

const siteUrl = "https://zenwaku.github.io/maps-healthcare-agency/";

export function buildJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: agency.name,
      alternateName: agency.legalName,
      url: siteUrl,
      logo: `${siteUrl}og-maps.jpg`,
      slogan: agency.tagline,
      description: agency.positioning
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: agency.name,
      url: siteUrl,
      areaServed: "Indonesia",
      serviceType: "Healthcare digital marketing agency",
      description:
        "Doctor-led digital marketing agency for clinics, pharmacies, healthtech, pharma, and healthcare brands."
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: agency.name,
      url: siteUrl,
      inLanguage: "id-ID",
      description:
        "MAPS membantu klinik, apotek, lab, healthtech, farmasi, dan bisnis healthcare membangun digital presence yang profesional, scientific, dan terukur."
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Healthcare digital marketing services",
      itemListElement: servicesV2.map((service, index) => ({
        "@type": "Service",
        position: index + 1,
        name: service.title,
        description: service.hook,
        provider: {
          "@type": "ProfessionalService",
          name: agency.name
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    }
  ];
}
