import { useEffect, useState } from "react";
import { agency } from "../data/agency.js";
import { trackEvent } from "../utils/tracking.js";
import MapsLogo from "./MapsLogo.jsx";

export default function Navbar({ activeSection, progress }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("maps-theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    const nextTheme = storedTheme || (prefersDark ? "dark" : "light");
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const handleNav = (item) => {
    setOpen(false);
    trackEvent("nav_click", { label: item.label, target: item.href, nav_event: item.event });
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("maps-theme", nextTheme);
    trackEvent("nav_click", { label: "theme_toggle", theme: nextTheme });
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <div className="nav-inner">
        <a className="brand" href="#top" onClick={() => trackEvent("nav_click", { label: "brand", target: "#top" })}>
          <span className="brand-mark" aria-hidden="true">
            <MapsLogo />
          </span>
          <span className="brand-copy">
            <strong>MAPS</strong>
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

        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === "dark" ? "Aktifkan tema terang" : "Aktifkan tema gelap"}
            onClick={toggleTheme}
          >
            <span aria-hidden="true">{theme === "dark" ? "L" : "D"}</span>
          </button>
          <a
            className="nav-cta"
            href="#audit"
            onClick={() => trackEvent("cta_click", { placement: "nav", label: "Cek Kesiapan Digital" })}
          >
            Cek Kesiapan
          </a>
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
      </div>
    </header>
  );
}
