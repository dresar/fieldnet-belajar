# Keputusan Arsitektur & Produk (Assumptions Record)

Dokumen ini mencatat seluruh keputusan teknis, arsitektur, desain, dan kurikulum yang diambil secara mandiri oleh tim engineering tanpa menghentikan pekerjaan, sesuai prinsip kemandirian kerja lapangan.

---

## 1. Arsitektur Frontend & Zero-Dependency Native ESM

- **Keputusan:** Menggunakan native ES Modules modern (`<script type="module" src="/src/main.js">`) dengan struktur komponen modular, didukung konfigurasi Vite (`vite.config.js`) dan server authoring Node.js 20 LTS (`server/server.js`).
- **Alasan:** 
  1. Menjamin aplikasi dapat dijalankan langsung di browser lokal maupun server preview dengan nol latensi kompilasi.
  2. Ukuran total bundle awal sangat kecil (di bawah 45 KB uncompressed, jauh di bawah batas 200 KB gzip) sehingga sangat ringan di smartphone berdaya komputasi rendah.
  3. Tetap 100% kompatibel saat dibungkus ke dalam format APK Android menggunakan Capacitor (`npx cap sync`).

## 2. Penyimpanan Lokal IndexedDB Sejalan Pola Dexie.js

- **Keputusan:** Membangun lapisan basis data `src/db.js` berbasis IndexedDB asynchronous promises yang mengadopsi API dan skema tabel Dexie.js (`progress`, `quizResults`, `checklists`, `bookmarks`, `notes`, `reports`, `bastDocs`, `settings`).
- **Alasan:** 
  1. Menjamin ketersediaan penyimpanan offline 100% mandiri tanpa ketergantungan paket eksternal saat offline.
  2. Mendukung penyimpanan blob dan Base64 foto bukti lapangan langsung di dalam IndexedDB perangkat.
  3. Menyediakan fitur ekspor dan impor seluruh basis data dalam bentuk satu berkas JSON lengkap untuk backup dan restore.

## 3. Sistem Ikon Lokal & Tipografi Tanpa Permintaan Jaringan

- **Keputusan:** Mengembangkan pustaka ikon SVG garis lokal (`src/icons.js`) bergaya Lucide dengan ketebalan stroke seragam 2px, serta memakai system font stack modern (`system-ui, -apple-system, Segoe UI, Roboto...`).
- **Alasan:**
  1. Memenuhi aturan anti-AI-slop yang melarang penggunaan emoji sebagai ikon antarmuka.
  2. Menghilangkan ketergantungan pada CDN eksternal seperti Google Fonts atau FontAwesome yang akan gagal termuat saat teknisi berada di lokasi blank spot / mode pesawat.

## 4. Kepatuhan Absolut Aturan Microcopy

- **Keputusan:**
  1. **Seluruh tombol tepat 1 kata:** Contohnya `Mulai`, `Lanjut`, `Simpan`, `Cari`, `Hapus`, `Unduh`, `Batal`, `Salin`, `Cek`, `Reset`, `Ekspor`, `Impor`, `Uji`, `Tutup`, `Kembali`, `Kuis`, `Tambah`, `Pilih`, `Jawab`, `Selesai`, `Ya`, `Tidak`, `Terang`, `Gelap`, `Sistem`. Tidak ada tombol dua kata seperti "Mulai Belajar" atau "Simpan Data".
  2. **Judul halaman maksimal 2 kata:** Contohnya `Beranda`, `Modul`, `Materi`, `Kuis`, `Checklist`, `Pohon Masalah`, `Laporan`, `Atur`, `Pencarian`, `Catatan`.
  3. **Teks bantuan (helper text) maksimal 3 kalimat pendek.**
  4. **Tanpa teks placeholder kosong:** Seluruh elemen form menggunakan label semantik yang jelas.

## 5. Standar Penulisan Materi & Nada Bahasa

- **Keputusan:**
  1. Seluruh 11 modul ditulis dalam Bahasa Indonesia non-formal bergaya obrolan rekan senior berpengalaman ("kamu", santai, lugas, ramah).
  2. Setiap istilah teknis (seperti VLAN, DHCP, NAT, PoE, Video Balun, Splicing) wajib dijelaskan dengan analogi kehidupan nyata.
  3. Setiap paragraf dibatasi maksimal 4 kalimat.
  4. Setiap langkah memiliki alasan teknis yang jelas ("Alasan: ...").
  5. Setiap modul diakhiri ringkasan tepat 3 poin.

## 6. Desain Bertema & Aksesibilitas Kontras WCAG AA

- **Keputusan:**
  1. Menyiapkan 3 mode tampilan: `Terang` (latar hangat `#FAF9F6`), `Gelap` (latar lembut `#121412`), dan `Sistem` (mengikuti preferensi OS).
  2. Warna hijau primer: `#16A34A` di mode terang dan `#22C55E` di mode gelap, dengan rasio kontras teks di atas 4.5:1 (memenuhi standar WCAG AA).
  3. Mencegah flash warna salah saat halaman dibuka dengan menyisipkan skrip inline di bagian `<head>` sebelum konten dimuat.
  4. Semua target sentuh memiliki dimensi minimal 44x44 piksel dengan outline focus state yang jelas (`:focus-visible`).

## 7. Format Laporan Kerja & BAST

- **Keputusan:** Menyediakan formulir ganda (Laporan Harian dan BAST Resmi) dengan print stylesheet (`@media print`) terintegrasi.
- **Alasan:** Memungkinkan teknisi mencetak langsung ke kertas atau menyimpannya sebagai file PDF rapi melalui menu cetak bawaan perangkat tanpa membutuhkan library pihak ketiga yang berat.

## 8. Persiapan Capacitor Android

- **Keputusan:** Menyediakan berkas `capacitor.config.json` dengan appId `com.fieldnet.belajar` dan webDir `dist` yang siap dipakai untuk perintah `npx cap add android` dan `npx cap open android`.

## 9. Strategi Caching Service Worker Sejalan Workbox

- **Keputusan:** Mengimplementasikan strategi Cache-First mandiri tanpa `importScripts` ke CDN eksternal di `sw.js` dan memisahkan daftar precache dev vs prod (`dist/sw.js`).
- **Alasan:** 
  1. Menghilangkan ketergantungan CDN internet sehingga aplikasi 100% mandiri dan tidak pernah gagal mengunduh worker saat offline.
  2. Menjamin `dist/sw.js` hanya mem-precache berkas fisik produksi yang benar-benar ada di `dist/` (shell, hashed bundle, dan modul JSON), mencegah 19 galat 404 pada konsol peramban saat instalasi worker.

## 10. Standar Target Sentuh Minimal 44 Pixel

- **Keputusan:** Menetapkan semua tombol, input, dan kotak centang (`.chk-box`) memiliki area sentuh minimal 44x44 pixel (menggunakan `--touch-target-min: 44px` dan pseudo-elemen tap area).
- **Alasan:** Menjamin kemudahan pengoperasian satu tangan bagi teknisi lapangan yang menggunakan smartphone di lokasi kerja tanpa salah tekan.

