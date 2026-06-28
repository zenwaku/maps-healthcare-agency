# MAPS Analytics Setup

Panduan ini mengaktifkan measurement layer MAPS tanpa subscription, kartu, payment gateway, atau layanan berbayar.

## Status Live Saat Ini

- Website publik: `https://zenwaku.github.io/maps-healthcare-agency/`
- GA4 Web Stream: `MAPS Healthcare Agency`
- Stream ID: `15161794054`
- Measurement ID: `G-7K5M8M3XJD`
- GitHub Actions variable: `VITE_GA_MEASUREMENT_ID=G-7K5M8M3XJD`
- Debug URL: `https://zenwaku.github.io/maps-healthcare-agency/?maps_debug=1`
- Deploy terakhir terverifikasi: bundle publik memuat ID GA4 baru, tidak memuat ID lama, dan standar `page_view` GA4 aktif.

Gunakan akun Google pemilik bisnis saat membuka GA4 dan Looker Studio. Jika ingin semua berada di akun `marchoict@gmail.com`, pastikan akun itulah yang sedang aktif saat membuka Google Analytics, Google Sheets, dan Looker Studio.

Catatan teknis: production ID dari GitHub Actions diprioritaskan di atas config lokal browser. Ini mencegah browser lama mengirim event ke Measurement ID yang salah.

## Arsitektur

1. Landing page mengirim event ke `window.dataLayer`.
2. Jika Measurement ID tersedia, event yang sama dikirim ke GA4.
3. Jika Pixel ID tersedia, event dipetakan ke Meta Pixel.
4. Semua event disimpan maksimal 500 item di `localStorage` sebagai fallback.
5. Jika Apps Script Web App URL tersedia, event, UTM, audit, dan lead dicatat ke Google Sheets.
6. Google Sheet dapat dipakai langsung sebagai data source Looker Studio.

## Quick Smoke Test GA4

1. Buka `https://zenwaku.github.io/maps-healthcare-agency/`.
2. Buka GA4 > Reports > Realtime.
3. Klik CTA, WhatsApp, filter portfolio, dan form audit.
4. Pastikan event muncul dalam beberapa menit.

Jika Realtime masih kosong:

1. Buka `https://zenwaku.github.io/maps-healthcare-agency/?maps_debug=1`.
2. Buka GA4 > Admin > Data display > DebugView.
3. Refresh website dan klik CTA.
4. Cek Console browser dan jalankan `window.mapsTrackingState`; nilai `gaId` harus `G-7K5M8M3XJD`.
5. Matikan ad blocker/privacy blocker untuk domain GitHub Pages bila request GA4 diblokir.

## Aktivasi GA4

1. Buat property dan Web Data Stream di Google Analytics.
2. Salin Measurement ID dengan format `G-XXXXXXXXXX`.
3. Isi `VITE_GA_MEASUREMENT_ID` di `.env`.
4. Build ulang dan deploy `dist/`.
5. Buka GA4 DebugView atau Realtime dan uji `page_view_custom`, `cta_click`, `section_view`, dan `whatsapp_click`.

Untuk deployment GitHub Pages repo ini, gunakan GitHub Actions variable:

```bash
gh variable set VITE_GA_MEASUREMENT_ID --repo zenwaku/maps-healthcare-agency --body "G-7K5M8M3XJD"
```

Lalu trigger deploy:

```bash
gh workflow run deploy-pages.yml --repo zenwaku/maps-healthcare-agency --ref master
```

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

Gunakan dua data source gratis:

1. Google Analytics: pilih property/stream `MAPS Healthcare Agency`.
2. Google Sheets: pilih sheet tracker MAPS jika Apps Script sudah aktif.

Susunan dashboard yang direkomendasikan:

- Scorecard: active users, views, event count, key events, new users, sessions.
- Scorecard konversi MAPS: `whatsapp_click`, `lead_form_submit`, `generate_lead`, `audit_form_complete`, `package_cta_click`.
- Time series: event count per hari.
- Bar chart: top event name.
- Table: page path, event name, `utm_source`, `utm_medium`, `utm_campaign`.
- Funnel manual: `page_view` -> `section_view` -> `service_cta_click` -> `whatsapp_click`/`lead_form_submit`.
- Filter controls: date range, `utm_source`, `utm_campaign`, `service`, `package`, `portfolio_category`.

Untuk membuat report:

1. Buka `https://lookerstudio.google.com/`.
2. Pilih `Blank report`.
3. Add data source `Google Analytics`.
4. Pilih akun/property yang berisi stream `MAPS Healthcare Agency`.
5. Tambahkan chart di atas.
6. Jika Google Sheets tracker sudah aktif, pilih `Add data` > `Google Sheets`, lalu pilih file tracker MAPS.

Looker Studio hanya bisa menarik data yang sudah tersedia di GA4/Sheets. Jika stream GA4 baru dibuat, beri waktu beberapa menit sampai data Realtime muncul dan sampai 24 jam untuk beberapa laporan standar.

## Membaca Data Dengan Benar

- GA4 membaca pengunjung anonim secara agregat: sesi, device, lokasi kasar, sumber traffic, dan event.
- Nama, nomor, atau detail bisnis hanya muncul jika MAPSY mengisi form/klik WhatsApp dan datanya dikirim ke Sheets.
- Jangan gunakan form untuk rekam medis, diagnosis, data pasien, atau informasi kesehatan sensitif.
- Meta Pixel siap dipasang setelah Pixel ID dibuat manual di Meta Events Manager.
- Ads dapat dibuat nanti secara manual oleh pemilik bisnis; landing page saat ini hanya menyiapkan measurement.

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
