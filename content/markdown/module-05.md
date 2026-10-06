# Ringkasan Cepat: Konfigurasi Dasar MikroTik RouterOS

## 1. Akses Awal Winbox & Pengamanan
- Hubungkan kabel LAN laptop ke ether2 atau ether3 router.
- Buka Winbox, buka tab Neighbors, klik baris MAC Address router untuk login pertama kali.
- Segera ubah System Identity (System -> Identity) dengan nama unik site kantor.
- Tambahkan komentar deskriptif pada setiap interface (misal: 'WAN-ISP', 'LAN-LOKAL').
- Ganti password default user admin sebelum menyambungkan interface WAN ke modem publik ISP.

## 2. Alur Pengaturan Dasar Internet
1. IP Address LAN: tambahkan IP gateway privat (misal 192.168.10.1/24) pada interface ether2.
2. DHCP Server: jalankan wizard IP -> DHCP Server -> DHCP Setup pada ether2.
3. DNS Resolver: isi IP DNS ISP atau publik (8.8.8.8, 1.1.1.1) dan centang Allow Remote Requests.
4. NAT Masquerade: buat aturan di IP -> Firewall -> NAT (chain=srcnat, out-interface=ether1, action=masquerade).
5. Default Route: pastikan rute default 0.0.0.0/0 mengarah ke IP gateway modem ISP.
