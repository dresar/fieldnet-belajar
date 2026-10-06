# Ringkasan Cepat: CCTV IP & Analog (NVR, DVR & HDD)

## 1. Arsitektur Analog HD vs IP Camera
- Analog HD (AHD/TVI/CVI): menggunakan kabel koaksial atau UTP dengan sepasang passive video balun (impedansi 75 ke 100 ohm), terhubung ke DVR sentral.
- IP Camera: menggunakan kabel UTP Cat6 standar dan protokol ONVIF Profile S, terhubung ke NVR via PoE switch.

## 2. Harddisk Pengawasan & Codec Kompresi
- Pilihlah harddisk khusus surveillance 24/7 (Western Digital Purple atau Seagate SkyHawk), bukan harddisk PC biasa.
- Codec H.265 / H.265+ menghemat kapasitas penyimpanan hingga 50-70% dibanding H.264 standar.
- Rumus kalkulasi penyimpanan:
  Penyimpanan (GB) = [Bitrate (Mbps) x 3600 x 24 x Hari x Jumlah Kamera] / 8000.
- Pastikan jam dan tanggal NVR selalu tersinkronisasi via NTP Server (id.pool.ntp.org).
