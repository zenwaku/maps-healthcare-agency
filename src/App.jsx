import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import {
  AudienceSegments,
  CareFramework,
  DoctorLedSystem,
  HealthcareProblems,
  MapsOpsPreview,
  ProcessV2,
  SeoGeoSection,
  ServicesV2,
  TrackingStackV2,
  VisibilityGap,
  WebinarSection
} from "./components/AgencySections.jsx";
import PortfolioShowcase from "./components/PortfolioShowcase.jsx";
import Packages from "./components/Packages.jsx";
import ClinicAudit from "./components/ClinicAudit.jsx";
import LeadForm from "./components/LeadForm.jsx";
import FAQ from "./components/FAQ.jsx";
import FinalCTA from "./components/FinalCTA.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import { resolveAssetPath } from "./utils/assetFallback.js";
import { buildJsonLd } from "./utils/seo.js";
import { trackEvent } from "./utils/tracking.js";
import { useScrollProgress } from "./hooks/useScrollProgress.js";
import { useSectionTracking } from "./hooks/useSectionTracking.js";
import { useUTMTracking } from "./hooks/useUTMTracking.js";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll.js";

const sectionIds = [
  "top",
  "masalah-klinik",
  "hidden-problems",
  "care-framework",
  "doctor-led",
  "solusi",
  "audience",
  "seo-geo",
  "portfolio",
  "webinar",
  "tracking",
  "process",
  "ops-preview",
  "audit",
  "paket",
  "lead-form",
  "faq",
  "final-cta"
];

export default function App() {
  useUTMTracking();
  useRevealOnScroll();
  const progress = useScrollProgress();
  const activeSection = useSectionTracking(sectionIds);
  const jsonLd = buildJsonLd();
  const [showMobileSticky, setShowMobileSticky] = useState(false);

  useEffect(() => {
    const update = () => setShowMobileSticky(window.scrollY > window.innerHeight * 0.65);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <Navbar activeSection={activeSection} progress={progress} />
      <main>
        <Hero />
        <VisibilityGap />
        <HealthcareProblems />
        <CareFramework />
        <DoctorLedSystem />
        <ServicesV2 />
        <AudienceSegments />
        <SeoGeoSection />
        <PortfolioShowcase />
        <WebinarSection />
        <TrackingStackV2 />
        <ProcessV2 />
        <MapsOpsPreview />
        <ClinicAudit />
        <Packages />
        <LeadForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton
        className={`floating-whatsapp ${showMobileSticky ? "floating-whatsapp--show" : ""}`}
        source="floating_button"
        aria-label="Konsultasi via WhatsApp"
      >
        <img
          src={resolveAssetPath("assets/icons/whatsapp-chat.png")}
          alt=""
          aria-hidden="true"
          draggable="false"
        />
      </WhatsAppButton>
      <a
        className={`mobile-sticky-cta ${showMobileSticky ? "mobile-sticky-cta--show" : ""}`}
        href="#audit"
        onClick={() => trackEvent("cta_click", { placement: "mobile_sticky", label: "Audit Digital Gratis" })}
      >
        Audit Digital Gratis
      </a>
    </>
  );
}
