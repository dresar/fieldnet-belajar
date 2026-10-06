# Ringkasan Cepat: Pohon Masalah Jaringan & CCTV

## 1. Kasus Internet Mati Total
- Cek lampu fisik ONT modem: lampu LOS merah kedip = kabel fiber optik luar putus (hubungi ISP). Lampu PON hijau = sinyal optik normal.
- Jalankan uji ping bertahap 3 titik:
  1. Ping IP gateway lokal (192.168.1.1) -> uji koneksi kabel LAN.
  2. Ping IP DNS publik (8.8.8.8) -> uji routing dan NAT router.
  3. Ping nama domain (google.com) -> uji DNS resolver.
- Cek IP klien: jika mendapat 169.254.x.x (APIPA), periksa DHCP server dan pool IP router.

## 2. Kasus CCTV Blank & Gambar Hitam
- Tutup sensor cahaya kamera: jika lampu inframerah tidak menyala, ukur drop tegangan adaptor 12V (minimal 11.5V DC).
- Cek lampu link port switch PoE: jika padam, potong dan crimping ulang konektor RJ45.
- Scan kamera via SADP Tool untuk menyamakan subnet IP kamera dengan port NVR.
- Jika status online tapi layar hitam: turunkan resolusi atau ubah kompresi H.265+ ke H.264 standar.
