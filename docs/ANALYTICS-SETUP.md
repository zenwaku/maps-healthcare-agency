# MAPS Analytics Setup

Panduan ini mengaktifkan measurement layer MAPS tanpa subscription, free trial, kartu, payment gateway, atau layanan berbayar.

## Arsitektur

1. Landing page mengirim event ke `window.dataLayer`.
2. Jika Measurement ID tersedia, event yang sama dikirim ke GA4.
3. Jika Pixel ID tersedia, event dipetakan ke Meta Pixel.
4. Semua event disimpan maksimal 500 item di `localStorage` sebagai fallback.
5. Jika Apps Script Web App URL tersedia, event, UTM, audit, dan lead dicatat ke Google Sheets.
6. Google Sheet dapat dipakai langsung sebagai data source Looker Studio.

## Aktivasi GA4

1. Buat property dan Web Data Stream di Google Analytics.
2. Salin Measurement ID dengan format `G-XXXXXXXXXX`.
3. Isi `VITE_GA_MEASUREMENT_ID` di `.env`.
4. Build ulang dan deploy `dist/`.
5. Buka GA4 DebugView atau Realtime dan uji `page_view_custom`, `cta_click`, `section_view`, dan `whatsapp_click`.

## Aktivasi Meta Pixel

1. Buat Data Source/Pixel di Meta Events Manager.
2. Salin Pixel ID.
3. Isi `VITE_META_PIXEL_ID` di `.env`.
4. Build ulang dan deploy.
5. Gunakan Test Events untuk memeriksa `PageView`, `ViewContent`, `Contact`, dan `Lead`.

Website tidak membuat atau menjalankan campaign ads. Pixel sudah siap menjadi sumber measurement jika campaign dibuat manual kemudian.

## Aktivasi Google Sheets

1. Buat Google Sheet kosong.
2. Buka `Extensions > Apps Script`.
3. Tempel isi `docs/google-apps-script-tracker.js`.
4. Pilih `Deploy > New deployment > Web app`.
5. Jalankan sebagai pemilik sheet dan atur akses sesuai kebutuhan publik website.
6. Salin URL `/exec` ke `VITE_TRACKING_WEBAPP_URL`.
7. Build ulang dan lakukan satu submit audit atau lead form.
8. Pastikan tab `MAPS_Tracking_Events` terbentuk dan baris baru masuk.

Jangan mengirim data pasien, rekam medis, diagnosis, atau informasi kesehatan sensitif melalui endpoint ini.

## Aktivasi Looker Studio

1. Buat report Looker Studio.
2. Pilih connector Google Sheets.
3. Gunakan tab `MAPS_Tracking_Events` sebagai data source.
4. Gunakan `received_at` sebagai date dimension dan `event` sebagai breakdown utama.
5. Buat scorecard untuk page view, CTA, WhatsApp, lead, audit complete, serta portfolio view.
6. Tambahkan filter `utm_source`, `utm_medium`, `utm_campaign`, `service`, dan `package`.

## Event Utama

- Awareness: `page_view_custom`, `section_view`, `scroll_50`, `scroll_90`.
- Intent: `portfolio_card_click`, `portfolio_modal_open`, `service_cta_click`, `package_cta_click`.
- Contact: `whatsapp_click`, `email_click`, `final_cta_click`.
- Lead: `lead_form_submit`, `generate_lead`, `audit_form_complete`, `audit_whatsapp_click`.
- Campaign: `utm_detected`, `campaign_source_detected`.
- Interaction: `hero_canvas_interaction`, `microbe_neutralized_batch`.

## Validasi

- Tanpa ID/URL: halaman dan form tetap bekerja, event masuk ke dataLayer dan localStorage.
- Dengan GA4: event terlihat di Realtime/DebugView.
- Dengan Pixel: event terlihat di Test Events.
- Dengan Apps Script: baris baru muncul di Google Sheets.
- Dengan Looker Studio: refresh data source menampilkan event yang sama.

GA4, Meta Pixel, Google Sheets, dan Looker Studio baru benar-benar live setelah ID/URL akun pemilik dimasukkan. Kode tidak dapat menebak atau membuat akses akun tersebut tanpa otorisasi Google/Meta.
