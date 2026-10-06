# Ringkasan Cepat: Akses Jarak Jauh CCTV & Integrasi Smartphone

## 1. P2P Cloud Connection
- Layanan P2P Cloud (Hik-Connect, DMSS, XMeye) menembus IP privat CGNAT tanpa membutuhkan IP publik statis.
- Aktifkan fitur Platform Access pada NVR, catat status 'Online', dan buat Verification Code stream yang kuat.
- Scan QR Code perangkat dari aplikasi smartphone teknisi atau klien.

## 2. Port Forwarding & DDNS
- Tiga port utama CCTV: Port Media/Server (8000), Port Web HTTP (80/8088), Port RTSP (554).
- Pada koneksi IP publik dinamis, pasang akun DDNS (No-IP, DynDNS) agar nama domain selalu terarah ke IP terkini.
- Format penarikan URL RTSP: `rtsp://user:pass@ip:554/Streaming/Channels/101`.
- Selalu uji streaming live lewat aplikasi HP menggunakan jaringan data seluler (bukan Wi-Fi lokal kantor).
