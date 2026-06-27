import { agency } from "../data/agency.js";
import { servicesV2 } from "../data/landingV2.js";
import { trackEvent } from "../utils/tracking.js";
import MapsLogo from "./MapsLogo.jsx";

export default function Footer() {
  const email = import.meta.env.VITE_CONTACT_EMAIL || "hellow@maps-healthcare.id";

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark" aria-hidden="true">
              <MapsLogo />
            </span>
            <span className="brand-copy">
              <strong>MAPS</strong>
              <small>{agency.label}</small>
            </span>
          </a>
          <p>{agency.legalName}</p>
          <p className="legal-copy">
            Konten yang dibuat bertujuan untuk edukasi dan komunikasi marketing yang bertanggung jawab. Klaim medis
            tetap harus disesuaikan dengan regulasi, indikasi, etika profesi, dan konteks layanan/produk.
          </p>
        </div>
        <div>
          <h3>Services</h3>
          <ul>
            {servicesV2.slice(0, 6).map((service) => (
              <li key={service.id}>{service.title}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <a
            className="footer-link"
            href={`mailto:${email}`}
            onClick={() => trackEvent("email_click", { source: "footer", email })}
          >
            {email}
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>Copyright (c) {new Date().getFullYear()} MAPS - Medical Advanced Portfolio Solution. All rights reserved.</span>
      </div>
    </footer>
  );
}
