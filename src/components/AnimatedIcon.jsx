import { iconAssets } from "../data/icons.js";
import { resolveAssetPath } from "../utils/assetFallback.js";

const iconAlt = {
  website: "Ikon website healthcare",
  clinicalCompass: "Ikon kompas clinical-led MAPS",
  aiSpark: "Ikon AI-assisted healthcare marketing MAPS",
  insightRadar: "Ikon radar insight dan tracking MAPS",
  evidenceJournal: "Ikon jurnal evidence-based MAPS",
  patientSearch: "Ikon pencarian pasien untuk SEO healthcare",
  safeClaim: "Ikon batas klaim yang lebih aman",
  conversionPath: "Ikon jalur conversion dan WhatsApp lead",
  webinarStage: "Ikon webinar dan public education healthcare",
  mobile: "Ikon mobile clinic",
  landing: "Ikon landing page klinik",
  search: "Ikon SEO dan pencarian healthcare",
  map: "Ikon lokasi klinik",
  form: "Ikon formulir lead healthcare",
  chatbot: "Ikon chatbot lead healthcare",
  responsive: "Ikon website responsif",
  clinic: "Ikon klinik umum",
  doctor: "Ikon doctor-led healthcare agency",
  stethoscope: "Ikon stetoskop layanan kesehatan",
  cross: "Ikon layanan healthcare",
  shield: "Ikon validasi dan trust healthcare",
  heart: "Ikon health pulse",
  capsule: "Ikon obat dan apotek",
  family: "Ikon keluarga dan pasien",
  calendar: "Ikon jadwal klinik",
  record: "Ikon rekam medis digital",
  bacteria: "Ikon bakteri sebagai metafora digital noise",
  virus: "Ikon virus sebagai metafora klaim tidak tervalidasi",
  target: "Ikon target campaign healthcare",
  molecule: "Ikon farmasi dan medical device",
  ai: "Ikon AI-assisted healthcare marketing",
  workflow: "Ikon workflow digital healthcare",
  ops: "Ikon sistem operasional klinik",
  dashboard: "Ikon dashboard tracking klinik",
  journey: "Ikon perjalanan digital klinik",
  analytics: "Ikon analytics healthcare marketing",
  bars: "Ikon growth chart healthcare",
  line: "Ikon grafik performa digital",
  pie: "Ikon segmentasi data healthcare",
  pixel: "Ikon Meta Pixel tracking",
  cursor: "Ikon klik CTA digital",
  utm: "Ikon UTM campaign healthcare",
  report: "Ikon monthly insight report",
  growth: "Ikon pertumbuhan digital healthcare",
  whatsapp: "Ikon WhatsApp lead tracking",
  message: "Ikon pesan edukasi healthcare",
  phone: "Ikon kontak klinik",
  email: "Ikon email MAPS",
  leadForm: "Ikon lead form healthcare",
  funnel: "Ikon funnel marketing healthcare",
  qr: "Ikon QR campaign healthcare",
  support: "Ikon support healthcare agency",
  cloud: "Ikon sinkronisasi data opsional",
  lock: "Ikon privasi dan keamanan data",
  check: "Ikon validasi konten healthcare",
  award: "Ikon proof of work MAPS"
};

export default function AnimatedIcon({ name, alt = "", motion = "float", className = "" }) {
  const src = iconAssets[name] || iconAssets.cross;
  const label = alt || iconAlt[name] || "Ikon animasi healthcare MAPS";
  return (
    <span className={`animated-icon animated-icon--${motion} ${className}`}>
      <img loading="lazy" src={resolveAssetPath(src)} alt={label} />
    </span>
  );
}
