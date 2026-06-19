# MAPS - Medical Advance Portfolio Scientific

Landing page gratis untuk digital agency healthcare `MAPS - Medical Advance Portfolio Scientific`.

MAPS membantu MAPSY seperti klinik, apotek, lab pemeriksaan, healthtech, brand suplemen/skincare/wellness, farmasi, medical device, dan bisnis healthcare membangun digital presence yang lebih profesional, edukatif, scientific, dan terukur.

## Stack

- React + Vite
- CSS custom
- Canvas API native untuk microbe playground
- Local assets dari komputer
- localStorage untuk lead, audit, UTM, dan event log ringan
- WhatsApp generated message
- GA4 dan Meta Pixel optional
- Google Sheets + Apps Script optional untuk cloud event log gratis
- GitHub Pages gratis

Tidak ada backend berbayar, SaaS form, payment gateway, subscription, free trial, credit card, template premium, stock berbayar, atau API berbayar.

## Menjalankan Project

```bash
npm install
npm run dev
```

Jika `npm` tidak tersedia di PATH pada runtime Codex, project tetap standar Vite dan bisa dijalankan di environment Node normal.

## Build

```bash
npm run build
```

Output build ada di `dist/`.

## Deploy Gratis Ke GitHub Pages

1. Buat public repository GitHub, contoh `maps-healthcare-agency`.
2. Push project ini ke repository tersebut.
3. Jalankan `npm install` dan `npm run build`.
4. Deploy isi folder `dist/` ke GitHub Pages.
5. Gunakan URL gratis:

```text
https://zenwaku.github.io/maps-healthcare-agency/
```

Custom domain membutuhkan biaya, jadi jangan digunakan jika ingin tetap 0 rupiah.

## Environment Variables

Salin `.env.example` menjadi `.env`:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_META_PIXEL_ID=000000000000000
VITE_WHATSAPP_NUMBER=628xxxxxxxxxx
VITE_CONTACT_EMAIL=hellow@maps-healthcare.id
VITE_BASE_PATH=/maps-healthcare-agency/
VITE_TRACKING_WEBAPP_URL=
```

Jika GA4, Meta Pixel, atau Google Apps Script URL belum diisi, website tetap jalan. Tracking tidak error dan event tetap tersimpan secara lokal.

## Mengganti Kontak

WhatsApp:

```bash
VITE_WHATSAPP_NUMBER=628xxxxxxxxxx
```

Email:

```bash
VITE_CONTACT_EMAIL=hellow@maps-healthcare.id
```

Gunakan nomor WhatsApp format internasional tanpa `+`.

## Mengganti Brand

Edit file:

```text
src/data/agency.js
```

Field utama:

- `name`
- `legalName`
- `tagline`
- `label`
- `positioning`
- `nav`

## Edit Showcase Portfolio

Edit daftar panel dan asset di:

```text
src/components/PortfolioShowcase.jsx
```

Showcase dipisahkan menjadi enam panel:

- Scientific Article & Poster
- Infographic Poster
- Social Media Content
- Scientific Deck
- Interactive Education Deck
- Landing Page Showcase

Asset gambar berada di:

```text
public/assets/showcase/
public/assets/cute/
public/assets/reels/
```

Jika gambar tidak ditemukan, UI memakai fallback SVG lokal agar tidak ada broken image.

## Video Dan Reels

HTML reels ringan tersedia di:

```text
public/assets/reels/reels-1.html
public/assets/reels/klinik-marchelyn-motion-story.html
public/assets/reels/hiperfosfat-motion-preview.html
```

File MP4 original Hiperfosfat tidak dicopy ke project karena ukurannya lebih dari 100 MB dan tidak aman untuk GitHub Pages/repository. Gunakan preview HTML yang looping, atau kompres MP4 dengan tool gratis lokal sebelum commit.

## Landing Page Dalam Landing Page

Contoh HTML landing page dibuka melalui modal iframe:

```text
public/assets/showcase/html/landing-klinik-pratama-sehat-jaya.html
public/assets/showcase/html/landing-klinik-intan-utama.html
public/assets/showcase/html/landing-klinik-mari-kita-sehat.html
```

## Microbe Playground

Hero memakai panel interaktif:

```text
src/components/MicrobePlayground.jsx
```

Pengunjung bisa menggerakkan tablet bulat untuk memecahkan bakteri/virus di dalam panel. Animasi ini tidak dipasang sebagai background halaman penuh agar teks tetap bersih dan fokus.

Untuk mengurangi animasi, komponen sudah menghormati `prefers-reduced-motion`. Untuk mematikan total, hapus `<MicrobePlayground />` dari:

```text
src/components/Hero.jsx
```

## Lead Form

Form tetap bekerja tanpa backend. Saat submit:

- Data disimpan di `localStorage`.
- Success state muncul.
- Tombol WhatsApp membuat pesan otomatis.
- Event `lead_form_submit` dan `generate_lead` dikirim ke tracking layer.
- Jika URL Apps Script gratis sudah diisi, salinan lead juga masuk ke Google Sheets.

Jangan gunakan form untuk data medis sensitif atau identitas pasien.

## GA4

1. Buat property GA4 gratis.
2. Ambil Measurement ID.
3. Isi:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Tracking akan memanggil `gtag` hanya jika ID valid.

## Meta Pixel

1. Buat Pixel gratis di Meta Business.
2. Ambil Pixel ID.
3. Isi:

```bash
VITE_META_PIXEL_ID=000000000000000
```

Pixel disiapkan hanya untuk membaca event gratis jika MAPSY ingin mengukur traffic atau campaign sendiri.

## Google Sheets Dan Looker Studio

Opsi cloud gratis memakai Google Sheets + Apps Script Web App:

1. Buat Google Sheet kosong.
2. Buka Extensions > Apps Script.
3. Copy script dari:

```text
docs/google-apps-script-tracker.js
```

4. Deploy sebagai Web App.
5. Masukkan Web App URL ke:

```bash
VITE_TRACKING_WEBAPP_URL=
```

6. Hubungkan Google Sheet tersebut ke Looker Studio memakai connector Google Sheets gratis.

Script membuat kolom event, UTM, layanan/paket, hasil audit, serta field lead yang siap dijadikan data source Looker Studio.

Catatan penting: koneksi ini membutuhkan akun Google milik user dan URL Apps Script dari user. Project sudah siap secara teknis, tetapi property GA4, Pixel, Sheet, dan report Looker tidak dapat menjadi live sebelum ID/URL dari akun pemilik diisi.

Analytics menunjukkan sesi, perangkat, sumber traffic, section, dan klik secara agregat. Identitas nama hanya tersedia jika pengunjung memang mengisi form; website tidak mencoba mengidentifikasi pengunjung anonim.

Konfigurasi juga bisa diuji tanpa rebuild melalui browser console:

```js
localStorage.setItem("maps_tracking_config", JSON.stringify({
  gaId: "G-XXXXXXXXXX",
  pixelId: "000000000000000",
  cloudEndpoint: "https://script.google.com/macros/s/DEPLOYMENT_ID/exec"
}));
location.reload();
```

## Event Tracking

Event utama:

- `page_view_custom`
- `section_view`
- `scroll_50`
- `scroll_90`
- `cta_click`
- `whatsapp_click`
- `email_click`
- `nav_click`
- `final_cta_click`
- `lead_form_start`
- `lead_form_submit`
- `generate_lead`
- `audit_form_start`
- `audit_form_complete`
- `audit_whatsapp_click`
- `portfolio_filter_click`
- `portfolio_card_click`
- `portfolio_modal_open`
- `portfolio_asset_view`
- `service_card_view`
- `service_cta_click`
- `package_cta_click`
- `article_open`
- `video_open`
- `video_start`
- `video_progress_50`
- `file_download`
- `utm_detected`
- `campaign_source_detected`
- `microbe_neutralized_batch`
- `hero_canvas_interaction`

Meta Pixel mapping:

- `page_view_custom` -> `PageView`
- `portfolio_card_click` -> `ViewContent`
- `service_cta_click` -> `ViewContent`
- `whatsapp_click` -> `Contact`
- `email_click` -> `Contact`
- `lead_form_submit` -> `Lead`
- `audit_form_complete` -> `Lead`
- `generate_lead` -> `Lead`
- `package_cta_click` -> `Lead`
- lainnya -> `trackCustom`

## File Penting

- `src/App.jsx`
- `src/styles.css`
- `src/components/Hero.jsx`
- `src/components/MicrobePlayground.jsx`
- `src/components/PortfolioShowcase.jsx`
- `src/components/AgencySections.jsx`
- `src/components/ClinicAudit.jsx`
- `src/components/LeadForm.jsx`
- `src/utils/tracking.js`
- `src/utils/whatsapp.js`
- `src/data/landingV2.js`

## Checklist 0 Rupiah

- Tidak memakai platform berbayar.
- Tidak memakai free trial.
- Tidak memakai subscription.
- Tidak memakai tool yang meminta credit card.
- Tidak memakai template premium.
- Tidak memakai stock asset berbayar.
- Tidak memakai API berbayar.
- Tidak memakai hosting berbayar.
- Tidak memakai domain berbayar.
- Tidak memakai backend berbayar.
- Tidak memakai SaaS form berbayar.
- Hosting diarahkan ke GitHub Pages public repository.
- Lead flow memakai localStorage + WhatsApp.
- Analytics memakai GA4/Meta Pixel/Google Sheets hanya jika user mengisi ID gratisnya.

## Catatan Healthcare

Konten dibuat untuk edukasi dan komunikasi marketing yang bertanggung jawab. Klaim medis tetap harus disesuaikan dengan regulasi, indikasi, etika profesi, konteks layanan/produk, dan clinical review manusia.
