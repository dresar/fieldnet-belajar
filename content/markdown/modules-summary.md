# Panduan Cepat Lapangan (Modul 03 - 11)

## Modul 03: Fiber Optik & Splicing
- Single-Mode (9µm core, kuning) untuk jarak jauh; Multi-Mode (50/62.5µm core, oranye/aqua) untuk data center.
- SC/LC Blue = UPC (flat); Green = APC (sudut 8°). Jangan pernah campur tanpa adapter!
- Bersihkan serat dengan alkohol 99% sebelum dipotong cleaver.
- Target sambungan fusion splicer: estimasi loss <= 0.05 dB.
- Jangan pernah menatap lubang laser port optik SFP!

## Modul 04: Instalasi Rack & PoE
- Standar 1U = 1.75 inci (44.45 mm). Letakkan UPS terberat di rail terbawah.
- Grounding rack sasis dengan kabel BC tembaga minimal 6mm² ke busbar grounding gedung.
- PoE 802.3af (15.4W), 802.3at (30W), Passive PoE 24V (Awas: jangan colok ke laptop non-PoE).
- Channel Wi-Fi 2.4 GHz non-overlapping: channel 1, 6, dan 11.

## Modul 05: Dasar MikroTik
- Login via Winbox MAC Address pada tab Neighbors jika belum punya IP.
- Segera ganti System Identity dan password user admin default.
- Urutan setting dasar: IP LAN -> DHCP Server Setup -> DNS 8.8.8.8 -> NAT Masquerade out-interface WAN.

## Modul 06: Konfigurasi Lanjutan
- Bridge VLAN Filtering untuk segmentasi antar divisi kantor.
- Selalu aktifkan Safe Mode (Ctrl+X) sebelum memodifikasi bridge VLAN.
- Firewall filter: Drop Invalid, Accept Established/Related, Drop WAN management port 8291.
- Batasi bandwidth adil dengan Simple Queue.
- VPN modern ringan: WireGuard.

## Modul 07: CCTV Sistem
- Analog HD butuh DVR + Balun pasif impedansi 75-ke-100 ohm pada kabel UTP.
- IP Camera berbasis ONVIF terhubung ke NVR via PoE switch.
- Kompresi H.265 / H.265+ menghemat kapasitas penyimpanan hingga 50-70% dibanding H.264.
- Gunakan Harddisk tipe Surveillance 24/7 (WD Purple / Seagate SkyHawk) dengan timestamp NTP sinkron.

## Modul 08: Akses Remote
- Gunakan P2P Cloud (Hik-Connect / DMSS / XMeye) dengan scan QR code tanpa repot kendala CGNAT.
- Buat Verification Code stream yang kuat.
- Port default CCTV: Port Server/Media (8000), HTTP (80/8088), RTSP (554).
- Uji streaming via aplikasi smartphone menggunakan kuota data seluler.

## Modul 09: Troubleshooting Decision Tree
- Cek lampu fisik lebih dahulu: Lampu LOS merah = fiber optik putus; PON hijau = sinyal optik normal.
- Uji ping bertahap 3 titik: Ping Gateway -> Ping 8.8.8.8 -> Ping domain.
- Cek IP APIPA 169.254.x.x = DHCP Discover gagal.
- CCTV No Video: ukur tegangan drop adaptor 12V di ujung kamera saat malam hari (harus >= 11.5V DC).

## Modul 10: Maintenance Berkala
- Harian: periksa suhu ruang server (18-24°C) dan status rekam titik merah di NVR.
- Mingguan: ekspor file script .rsc dan file .backup biner ke flashdisk/cloud luar.
- Bulanan: periksa parameter S.M.A.R.T harddisk (Reallocated Sector Count = 0) dan bersihkan kipas dengan blower (tahan bilah kipas).

## Modul 11: Dokumentasi Lapangan & BAST
- Format foto progres 3 tahap: Before, In-Progress, dan After.
- Buat tabel label kabel dan skema topologi jaringan di dalam rack.
- Berita Acara Serah Terima (BAST) resmi bermaterai rangkap dua memuat daftar perangkat dan batasan garansi jelas.
