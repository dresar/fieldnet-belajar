# FieldNet Belajar 🌐📹

**FieldNet Belajar** adalah aplikasi mobile *offline-first* modern untuk belajar menjadi teknisi jaringan komputer dan CCTV lapangan handal. Aplikasi ini dirancang murni berbasis ekosistem Node.js dan standar web modern tanpa framework berat, dapat diinstal sebagai PWA di smartphone, serta siap dibungkus menjadi APK Android menggunakan Capacitor.

Aplikasi ini beroperasi **100% tanpa internet** setelah kunjungan pertama, bebas dari font/CDN eksternal, dan menyimpan seluruh data progres belajar, kuis, butir checklist, foto bukti lapangan, dan laporan langsung di dalam IndexedDB perangkat pengguna.

---

## Fitur Utama

- **11 Kurikulum Teknisi Lapangan Lengkap:**
  1. *Survei Lokasi & Rencana Instalasi* (BoQ, grounding <2V, jalur conduit).
  2. *Kabel UTP, Crimping & Testing* (Standar T568B, continuity tester 8 pin).
  3. *Fiber Optik Dasar, Splicing & Loss* (Single-mode, cleaver, fusion splicer, OPM, VFL).
  4. *Instalasi Rack, Switch, Router & AP* (1U rack, patch panel, manajemen kabel, PoE 802.3af/at).
  5. *Konfigurasi Dasar MikroTik* (Winbox MAC, IP, DHCP Server, DNS, NAT Masquerade).
  6. *Konfigurasi Lanjutan MikroTik* (Bridge VLAN Filtering, Firewall Filter, Simple Queue, WireGuard).
  7. *CCTV IP & Analog* (Analog HD + Video Balun vs IP ONVIF, NVR/DVR, kalkulasi HDD H.265+).
  8. *Akses Jarak Jauh CCTV & Jaringan* (P2P Cloud scan QR, Port Forwarding, DDNS, RTSP).
  9. *Pohon Masalah (Troubleshooting Decision Tree)* (Panduan interaktif Internet Mati, CCTV Blank, RTO).
  10. *Maintenance Berkala* (Jadwal harian, mingguan script .rsc, dan bulanan S.M.A.R.T HDD).
  11. *Dokumentasi Lapangan & BAST* (Laporan harian, foto progres 3 tahap, topologi, draf BAST).
- **Mesin Kuis Interaktif:** Soal pilihan ganda & benar-salah diacak dengan skor persentase dan pembahasan detail tiap nomor.
- **Checklist Lapangan & Lampiran Foto:** Butir periksa tersimpan otomatis dengan catatan pribadi dan lampiran foto kamera/galeri via IndexedDB.
- **Generator Laporan & BAST Resmi:** Formulir kerja harian dan draf Berita Acara Serah Terima (BAST) yang siap diekspor ke PDF rapi melalui print stylesheet (`Ctrl+P`).
- **Pencarian Offline Menyeluruh:** Menemukan topik, perintah konfigurasi, dan tips troubleshooting dalam hitungan milidetik.
- **Tiga Mode Tampilan:** Mode Terang (latar hangat `#FAF9F6`), Mode Gelap (latar lembut `#121412`), dan Mode Sistem dengan anti-flash rendering.
- **Cadangan Data Mandiri:** Fitur ekspor dan impor seluruh data pengguna dalam format satu file JSON.

---

## Struktur Proyek

```text
aplikasibelajar/
├── package.json               # Konfigurasi dependensi dan scripts npm
├── vite.config.js             # Konfigurasi build Vite bundler
├── capacitor.config.json      # Konfigurasi packaging APK Android
├── index.html                 # App shell utama dengan skrip anti-flash
├── sw.js                      # Service Worker dengan strategi Cache-First
├── README.md                  # Dokumentasi instalasi dan build
├── CONTENT_GUIDE.md           # Panduan pembuatan modul dan template JSON
├── IMAGE_PROMPTS.md           # Daftar prompt ilustrasi teknis (Bahasa Inggris)
├── ASSUMPTIONS.md             # Catatan keputusan teknis dan produk mandiri
├── server/
│   ├── server.js              # Server preview & authoring Node.js 20 LTS
│   └── validate-content.js    # Skrip pengujian validasi skema dan microcopy
├── content/
│   ├── manifest.json          # Manifest versi modul pembelajaran
│   ├── module-01.json         # Modul 01: Survei Lokasi
│   ├── module-02.json         # Modul 02: Kabel UTP
│   ├── module-03.json         # Modul 03: Fiber Optik
│   ├── module-04.json         # Modul 04: Instalasi Rack
│   ├── module-05.json         # Modul 05: Dasar MikroTik
│   ├── module-06.json         # Modul 06: Konfigurasi Lanjutan
│   ├── module-07.json         # Modul 07: CCTV Sistem
│   ├── module-08.json         # Modul 08: Akses Remote
│   ├── module-09.json         # Modul 09: Pohon Masalah
│   ├── module-10.json         # Modul 10: Maintenance Berkala
│   └── module-11.json         # Modul 11: Dokumentasi Lapangan
├── public/
│   ├── favicon.svg            # Favicon SVG aplikasi
│   └── manifest.webmanifest   # Web App Manifest PWA
└── src/
    ├── main.js                # Inisialisasi aplikasi dan routing
    ├── db.js                  # Basis data IndexedDB lokal (Dexie API pattern)
    ├── icons.js               # Kumpulan ikon garis SVG lokal (Lucide style)
    ├── router.js              # Router client-side berbasis hash
    ├── search.js              # Mesin pencarian teks offline
    ├── styles/
    │   ├── tokens.css         # Token desain CSS (warna WCAG AA, spacing, typo)
    │   ├── base.css           # Reset mobile-first dan thumb navigation
    │   ├── components.css     # Tombol 1-kata, kartu, callout, kuis
    │   └── print.css          # Stylesheet cetak rapi laporan & BAST
    └── views/
        ├── dashboard.js       # Tampilan Beranda
        ├── modules.js         # Tampilan Daftar Modul
        ├── lesson.js          # Tampilan Pembaca Materi
        ├── quiz.js            # Tampilan Kuis Evaluasi
        ├── checklist.js       # Tampilan Checklist Lapangan
        ├── troubleshooter.js  # Tampilan Pohon Keputusan Masalah
        ├── reports.js         # Tampilan Laporan Harian & BAST
        ├── search-view.js     # Tampilan Pencarian Materi
        ├── notes.js           # Tampilan Bookmark & Catatan
        └── settings.js        # Tampilan Pengaturan & Backup
```

---

## Cara Menjalankan Aplikasi

### Opsi 1: Menjalankan Server Bawaan Node.js (Zero Dependency)
Aplikasi dapat dijalankan langsung di Node.js 20 LTS tanpa perlu melakukan instalasi dependensi luar terlebih dahulu:

```bash
# Jalankan server authoring dan preview
node server/server.js
```
Akses aplikasi melalui peramban di: `http://localhost:3000`

### Opsi 2: Menjalankan dengan Vite Dev Server
```bash
# Instal dependensi
npm install

# Jalankan server dev Vite
npm run dev
```

### Opsi 3: Memeriksa Validitas Konten & Aturan Microcopy
Untuk memverifikasi bahwa semua modul memenuhi aturan skema seragam, batasan 4 kalimat per paragraf, dan ringkasan 3 poin:

```bash
node server/validate-content.js
```

---

## Opsi Build APK dengan Capacitor & GitHub Actions

### A. Otomatis Lewat GitHub Actions (Rekomendasi)
Setiap kali kamu melakukan `git push` ke branch `main`, alur kerja CI/CD (`.github/workflows/build-and-deploy.yml`) akan otomatis:
1. Memvalidasi seluruh modul dan skema data (`npm test`).
2. Melakukan kompilasi bundle web produksi (`npm run build`).
3. Mensinkronkan aset ke platform Android Capacitor (`npx cap sync android`).
4. Mengkompilasi file APK Android secara otomatis (`./gradlew assembleDebug`).
5. Merilis file APK ke **GitHub Releases** dengan tag `v1.0.0` dan mengunggah artifact yang langsung siap diunduh!

**Format URL Siap Download:**
- **Halaman Rilis Terkini:** `https://github.com/<USERNAME>/<REPO>/releases/latest`
- **Link Download Langsung APK:** `https://github.com/<USERNAME>/<REPO>/releases/download/v1.0.0/FieldNet-Belajar-v1.0.0.apk`
- **Link Web App (GitHub Pages):** `https://<USERNAME>.github.io/<REPO>/`

### B. Build Manual di Komputer Lokal
1. **Lakukan Build Aset Web & Sync:**
   ```bash
   npm run build
   npx cap sync android
   ```

2. **Kompilasi APK Langsung Lewat Terminal:**
   ```bash
   cd android && ./gradlew assembleDebug
   ```
   File APK siap dipasang akan berada di: `android/app/build/outputs/apk/debug/app-debug.apk`

3. **Atau Buka di Android Studio:**
   ```bash
   npx cap open android
   ```
   Pilih menu **Build -> Build Bundle(s) / APK(s) -> Build APK(s)**.

---

## Kepatuhan Mutlak Desain & Microcopy

- **Satu Kata Tiap Tombol:** Setiap tombol aksi antarmuka hanya memiliki tepat satu kata: `Mulai`, `Lanjut`, `Simpan`, `Cari`, `Hapus`, `Unduh`, `Batal`, `Salin`, `Cek`, `Reset`, `Ekspor`, `Impor`, `Uji`, `Tutup`, `Kembali`, `Kuis`, `Tambah`, `Pilih`, `Jawab`, `Selesai`, `Ya`, `Tidak`, `Terang`, `Gelap`, `Sistem`.
- **Maksimal Dua Kata Tiap Judul Halaman:** Judul halaman dibatasi maksimal dua kata: `Beranda`, `Modul`, `Materi`, `Kuis`, `Checklist`, `Pohon Masalah`, `Laporan`, `Atur`, `Pencarian`, `Catatan`.
- **Maksimal Tiga Kalimat pada Teks Bantuan:** Helper text dirancang padat tanpa basa-basi berbelit-belit.
- **Zona Jempol Mobile:** Navigasi bawah mengakomodasi penggunaan satu tangan dengan target sentuh minimal 44 piksel.
- **Aksesibilitas Kontras:** Seluruh kombinasi warna memenuhi rasio kontras WCAG AA di mode terang maupun gelap.

---

## Lisensi & Kontributor

Dikembangkan oleh **Tim Product Engineering FieldNet Belajar** di bawah lisensi MIT. Dirancang untuk menemani teknisi lapangan dari survei awal hingga tanda tangan BAST.
