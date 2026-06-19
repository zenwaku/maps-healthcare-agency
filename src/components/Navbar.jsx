import { useEffect, useState } from "react";
import { agency } from "../data/agency.js";
import { trackEvent } from "../utils/tracking.js";

export default function Navbar({ activeSection, progress }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (item) => {
    setOpen(false);
    trackEvent("nav_click", { label: item.label, target: item.href, nav_event: item.event });
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <div className="nav-inner">
        <a className="brand" href="#top" onClick={() => trackEvent("nav_click", { label: "brand", target: "#top" })}>
          <span className="brand-mark" aria-hidden="true">
            MAPS
          </span>
          <span className="brand-copy">
            <small>{agency.label}</small>
          </span>
        </a>

        <nav className={`nav-links ${open ? "nav-links--open" : ""}`} aria-label="Navigasi utama">
          {agency.nav.map((item) => {
            const section = item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                className={activeSection === section ? "active" : ""}
                onClick={() => handleNav(item)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
