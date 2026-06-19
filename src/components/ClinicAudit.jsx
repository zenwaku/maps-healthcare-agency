import { useMemo, useState } from "react";
import { auditQuestions, getAuditResult } from "../data/auditQuestions.js";
import { appendStorageList, setStorage } from "../utils/storage.js";
import { trackEvent } from "../utils/tracking.js";
import { buildWhatsAppUrl, trackWhatsAppClick } from "../utils/whatsapp.js";
import SectionHeader from "./SectionHeader.jsx";

const baseAuditMessage =
  "Halo MAPS, saya MAPSY mau audit digital untuk klinik/bisnis healthcare saya dong \u{1F601}\u{1F601}\u{1F601}\nSaat ini saya butuh bantuan untuk website/konten/SEO/tracking/sistem operasional";

export default function ClinicAudit() {
  const [answers, setAnswers] = useState({});
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const score = useMemo(() => {
    const total = auditQuestions.reduce((sum, question) => sum + question.weight, 0);
    const current = auditQuestions.reduce((sum, question) => sum + (answers[question.id] ? question.weight : 0), 0);
    return Math.round((current / total) * 100);
  }, [answers]);

  const result = useMemo(() => getAuditResult(score, answers), [score, answers]);

  const updateAnswer = (id) => {
    if (!started) {
      setStarted(true);
      trackEvent("audit_form_start", { source: "clinic_audit" });
    }
    setAnswers((current) => ({ ...current, [id]: !current[id] }));
  };

  const completeAudit = () => {
    const payload = {
      score,
      recommendation: result.recommendation,
      packageLabel: result.packageLabel,
      status: result.status,
      answers,
      createdAt: new Date().toISOString(),
      source: "clinic_audit"
    };
    setCompleted(true);
    setStorage("maps_last_audit", payload);
    appendStorageList("maps_audit_history", payload);
    trackEvent("audit_form_complete", {
      score,
      status: result.status,
      recommendation: result.recommendation,
      package_label: result.packageLabel,
      __cloudPayload: payload
    });
  };

  const whatsappUrl = buildWhatsAppUrl({
    message: `${baseAuditMessage}\n\nSaya sudah cek kesiapan digital. Skor saya ${score}/100. Rekomendasi awal: ${result.recommendation}. Paket yang cocok: ${result.packageLabel}. Saya ingin konsultasi langkah berikutnya.`,
    source: "clinic_audit",
    auditScore: score,
    recommendation: result.recommendation
  });

  return (
    <section id="audit" className="section section-anchor audit-section">
      <div className="container audit-grid">
        <div>
          <SectionHeader
            align="left"
            title="Cek Kesiapan Digital Klinik Anda"
            subtitle="Temukan prioritas paling masuk akal: website, konten, tracking, campaign, atau fondasi digital yang harus dirapikan dulu."
          />
          <div className="audit-checklist">
            {auditQuestions.map((question) => (
              <label className="audit-check" key={question.id}>
                <input
                  type="checkbox"
                  checked={Boolean(answers[question.id])}
                  onChange={() => updateAnswer(question.id)}
                />
                <span>{question.label}</span>
              </label>
            ))}
          </div>
        </div>

        <aside className="audit-result reveal" aria-live="polite">
          <div className="score-gauge" style={{ "--score": `${score * 3.6}deg` }}>
            <div>
              <strong>{score}</strong>
              <span>/100</span>
            </div>
          </div>
          <h3>{result.status}</h3>
          <p>
            Rekomendasi awal: <strong>{result.recommendation}</strong>
          </p>
          <p className="audit-result-copy">{result.description}</p>
          <div className={`clean-sweep-preview ${completed ? "clean" : ""}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          {!completed ? (
            <button className="btn btn-primary btn-full" type="button" onClick={completeAudit}>
              Lihat rekomendasi audit
            </button>
          ) : (
            <div className="audit-cta-stack">
              <a
                className="btn btn-primary btn-full"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  trackEvent("audit_whatsapp_click", {
                    score,
                    recommendation: result.recommendation,
                    package_label: result.packageLabel
                  });
                  trackWhatsAppClick({
                    source: "clinic_audit",
                    auditScore: score,
                    recommendation: result.recommendation
                  });
                }}
              >
                Konsultasi Sekarang
              </a>
              <a
                className="btn btn-secondary btn-full"
                href="#paket"
                onClick={() => trackEvent("cta_click", { placement: "audit", label: "Cek Paket Kita" })}
              >
                Cek Paket Kita
              </a>
            </div>
          )}
          <p className="microcopy">
            MAPS bisa mulai dari prioritas terkecil yang paling terlihat dampaknya: clarity, trust, CTA, dan tracking.
          </p>
        </aside>
      </div>
    </section>
  );
}
