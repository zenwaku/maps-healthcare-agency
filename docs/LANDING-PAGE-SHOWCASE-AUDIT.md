# Audit Showcase Landing Page MAPS

Dokumen ini merangkum perbaikan untuk tiga demo landing page yang ditampilkan di section portfolio MAPS.

## Prinsip Perbaikan

- Demo harus terasa seperti contoh kerja agency, bukan website asli yang mengklaim operasional klinik nyata.
- Hero harus cepat menjawab: layanan apa, untuk siapa, dan action berikutnya apa.
- CTA harus konsisten dan bisa dilacak dari iframe portfolio.
- Mobile spacing, button size, dan teks harus tetap rapi saat dibuka dalam modal.
- Semua demo diberi `noindex,nofollow` agar tidak bersaing di Google sebagai klinik sungguhan.

## Klinik Mari Kita Sehat

**Kekurangan awal:**
- Pesan layanan terasa terlalu umum.
- Beberapa CTA belum memberi sinyal tracking ke parent landing page.
- Footer belum cukup jelas bahwa ini demo showcase.

**Room of improvement:**
- Tambahkan konteks bahwa page adalah demo MAPS.
- Jadikan form dan CTA sebagai interaction point yang bisa dicatat analytics.
- Perkuat framing mobile-friendly dan trust signal.

**Perbaikan yang diterapkan:**
- Menambahkan ribbon `Demo landing page by MAPS`.
- Menambahkan `postMessage` untuk CTA dan submit form agar event dapat dibaca parent page.
- Menonaktifkan drag asset dan context menu ringan untuk mengurangi pengambilan asset langsung.
- Mengubah footer menjadi disclaimer demo yang lebih aman.

## Klinik Pratama Sehat Jaya

**Kekurangan awal:**
- Ada beberapa simbol/teks berpotensi mojibake pada sebagian environment.
- CTA belum mengirim sinyal interaksi ke parent page.
- Belum ada pembeda jelas antara showcase dan website operasional asli.

**Room of improvement:**
- Bersihkan encoding dan microcopy demo.
- Tambahkan badge demo.
- Tambahkan event bridge ke landing page MAPS.

**Perbaikan yang diterapkan:**
- Menambahkan `noindex,nofollow`.
- Menambahkan ribbon demo.
- Mengirim event `maps_showcase_cta` saat form/CTA digunakan.
- Menjaga iframe tetap ringan dan tidak membuka dependency berbayar.

## Klinik Intan Utama

**Kekurangan awal:**
- Visual sudah kuat, tetapi konteks portfolio belum langsung terbaca.
- CTA WhatsApp di dalam iframe belum memberi data ke parent page.
- Footer belum cukup menegaskan bahwa asset adalah contoh showcase.

**Room of improvement:**
- Buat demo terasa seperti contoh capability MAPS.
- Integrasikan klik CTA dengan tracking portfolio.
- Kurangi risiko aset diambil langsung dari preview.

**Perbaikan yang diterapkan:**
- Menambahkan ribbon demo.
- Menambahkan `postMessage` saat CTA chat diklik.
- Menonaktifkan drag asset dan context menu ringan.
- Footer diperbarui sebagai demo showcase MAPS.

## Catatan Proteksi Asset

Browser tidak bisa benar-benar mencegah screenshot. Yang bisa dilakukan tanpa biaya adalah:

- Tidak menyediakan tombol download.
- Menggunakan preview modal dengan watermark.
- Menonaktifkan drag asset.
- Menonaktifkan context menu ringan.
- Menampilkan demo sebagai showcase, bukan file master produksi.

