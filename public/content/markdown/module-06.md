# Ringkasan Cepat: Konfigurasi Lanjutan VLAN, Routing & Keamanan

## 1. Segmentasi VLAN & Bridge VLAN Filtering
- Gunakan VLAN (Virtual LAN) untuk memisahkan lalu lintas staf kantor, CCTV, dan tamu.
- Port Trunk: membawa banyak tagged VLAN dari switch ke router.
- Port Access: membawa satu untagged VLAN langsung ke komputer atau kamera.
- Selalu aktifkan Safe Mode (Ctrl+X) di Winbox sebelum mencentang 'vlan-filtering=yes' pada bridge.

## 2. Firewall Filter & Manajemen Bandwidth
- Rule 1: Drop koneksi Invalid (connection-state=invalid).
- Rule 2: Accept koneksi Established & Related.
- Rule 3: Drop akses input dari interface WAN ke port manajemen Winbox (8291).
- Simple Queue: batasi kecepatan upload dan download maksimal agar pembagian bandwidth merata.

## 3. VPN WireGuard
- WireGuard menawarkan enkripsi modern ringan dengan performa throughput tinggi.
- Buat interface WireGuard dengan port default 51820 UDP.
- Pasang Public Key peer di kedua sisi untuk membangun tunnel koneksi antar-cabang.
