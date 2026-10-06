# Panduan Prompt Gambar 3D & Ilustrasi Lapangan FieldNet

Dokumen ini memuat seluruh daftar prompt pembuatan model 3D teknis dalam bahasa Indonesia untuk semua slot ilustrasi aplikasi **FieldNet Belajar**. Setiap prompt dirancang khusus untuk memanggil tool pembuatan gambar dengan awalan `create images`, menggunakan gaya 3D model yang bersih, detail, realistis, minim teks di dalam gambar, dan mudah dipahami oleh teknisi pemula atau staf IT.

---

## Ketentuan Prompting Gambar

1. **Awalan Wajib:** Seluruh prompt dimulai dengan kata kunci `create images` agar langsung memicu tool generator gambar.
2. **Gaya Visual:** Render 3D model fotorealistik atau technical 3D visualization, pencahayaan studio lembut, sudut pandang isometrik atau close-up 3/4.
3. **Bahasa:** Bahasa Indonesia baku dan istilah teknis standar lapangan jaringan/CCTV.
4. **Elemen Teks:** Hindari teks acak berantakan (gibberish text). Gambar harus fokus pada bentuk fisik perangkat, warna kabel, konektor, dan indikator lampu LED.
5. **Palet Warna:** Aksen hijau lapangan (`#16A34A`), abu-abu perangkat industri, putih bersih, dan aksen warna kawat standar internasional.

---

## Slot Ilustrasi Modul Kurikulum (11 Modul)

### 1. Modul 01: Survei Lokasi & Perencanaan

#### `images/survey-cable-path.png`
- **Modul:** Modul 01 - Survei Lokasi (Bagian 1: Observasi Fisik & Struktur Gedung)
- **Prompt:**
  ```text
  create images Model 3D bersih dan realistis dari jalur instalasi kabel di atas plafon gedung kantor modern. Di sebelah kiri tampak pipa conduit PVC abu-abu berisi kabel data LAN UTP, dan di sebelah kanan tampak pipa conduit hitam berisi kabel listrik 220V PLN. Kedua pipa dipisahkan secara tegas dengan jarak aman terukur minimal 30 cm. Tampak rangka hollow plafon gypsum dan dak beton dengan pencahayaan studio 3D lembut, gaya isometrik rapi tanpa banyak teks, warna aksen hijau lapangan.
  ```

#### `images/survey-boq-sample.png`
- **Modul:** Modul 01 - Survei Lokasi (Bagian 2: Penyusunan Bill of Quantities)
- **Prompt:**
  ```text
  create images Model 3D meja kerja teknisi jaringan saat survei lokasi gedung. Di atas meja kayu terdapat meteran laser digital memancarkan garis sinar hijau, rol kabel UTP Cat6 oranye, buku catatan survei berisi checklist material BoQ rapi, obeng presisi, tang potong kabel, dan helm keselamatan proyek warna putih. Render 3D bersih, pencahayaan terang studio produk, latar belakang netral minimalis.
  ```

---

### 2. Modul 02: Kabel UTP, Crimping & Testing

#### `images/utp-color-pinout.png`
- **Modul:** Modul 02 - Kabel UTP (Bagian 1: Standar Warna T568A & T568B)
- **Prompt:**
  ```text
  create images Model 3D close-up detail dari konektor RJ45 transparan modular plug dengan klip pengunci menghadap ke bawah. Di dalam badan plastik bening terlihat jelas 8 urutan pin kawat tembaga standar T568B dari pin 1 sampai 8: Putih-Oranye, Oranye, Putih-Hijau, Biru, Putih-Biru, Hijau, Putih-Cokelat, Cokelat. Render 3D fotorealistik presisi tinggi, material plastik mengkilap, pin tembaga emas menyala elegan, sudut pandang depan.
  ```

#### `images/utp-crimping-steps.png`
- **Modul:** Modul 02 - Kabel UTP (Bagian 2: Teknik Crimping & Uji Tester LAN)
- **Prompt:**
  ```text
  create images Model 3D visual 3 tahapan crimping kabel UTP Cat6. Tahap 1 memperlihatkan pengupasan jaket luar kabel 2,5 cm dan pemisahan 4 pasang pilinan kawat. Tahap 2 kawat dipotong rata rapi 1,2 cm lalu dimasukkan ke dalam kepala RJ45 sampai jaket luar terjepit pasak penahan. Tahap 3 tang crimping ratchet warna hijau menekan konektor hingga pin tembaga menusuk inti kabel. Render 3D studio bersih dan berurutan.
  ```

---

### 3. Modul 03: Fiber Optik Dasar, Splicing & Loss

#### `images/fiber-connector-types.png`
- **Modul:** Modul 03 - Fiber Optik (Bagian 1: Karakteristik Core & Konektor FO)
- **Prompt:**
  ```text
  create images Model 3D perbandingan presisi dua konektor fiber optik jenis SC. Di sisi kiri konektor SC-UPC warna biru laut dengan ferrule keramik putih datar 0 derajat. Di sisi kanan konektor SC-APC warna hijau cerah dengan ferrule keramik bersudut miring 8 derajat. Tampak detail inti serat kaca core 9 mikron di tengah ferrule putih mengkilap. Render 3D produk presisi tinggi dengan pencahayaan studio elegan dan latar belakang bersih.
  ```

#### `images/fiber-fusion-splicing.png`
- **Modul:** Modul 03 - Fiber Optik (Bagian 2: Teknik Splicing & Pengukuran Loss)
- **Prompt:**
  ```text
  create images Model 3D mesin fusion splicer fiber optik modern dengan penutup pelindung angin terbuka ke atas. Di dalam dudukan V-groove tampak dua ujung serat kaca 125 mikron yang telah dikupas bertemu di antara dua jarum elektroda tungsten dengan percikan api busur listrik mikro berwarna biru lembut. Layar digital LCD menampilkan penjajaran serat sumbu X dan Y dengan angka loss 0.01 dB. Render 3D peralatan teknologi tinggi warna abu-abu industri dan aksen hijau.
  ```

---

### 4. Modul 04: Instalasi Rack, Switch, Router & Access Point

#### `images/rack-cable-management.png`
- **Modul:** Modul 04 - Instalasi Rack (Bagian 1: Mounting Rack & Manajemen Kabel)
- **Prompt:**
  ```text
  create images Model 3D kabinet server rack 19 inci dari tampak depan. Di dalamnya terpasang rapi dari atas ke bawah: patch panel 24 port 1U, horizontal cable management brush panel 1U di tengah, dan switch manageable PoE 24 port 1U di bawah. Kabel patch cord pendek warna hijau dan biru tersusun rapi terikat velcro mengalir melalui panel manajemen masuk ke port switch. Render 3D profesional tanpa kabel berantakan.
  ```

#### `images/poe-switch-budget.png`
- **Modul:** Modul 04 - Instalasi Rack (Bagian 2: Kalkulasi Daya PoE & Penempatan AP)
- **Prompt:**
  ```text
  create images Model 3D diagram isometrik switch PoE gigabit 24 port berdaya 250W dengan lampu indikator watt menyala hijau aman. Dari port-port switch menjulur kabel UTP Cat6 terhubung rapi ke Access Point WiFi 6 plafon dan kamera CCTV IP outdoor. Render 3D isometrik bersih menampilkan konsep pembagian daya PoE budget stabil tanpa teks rumit.
  ```

---

### 5. Modul 05: Konfigurasi Dasar MikroTik

#### `images/mikrotik-winbox-login.png`
- **Modul:** Modul 05 - Dasar MikroTik (Bagian 1: Akses Winbox & Pemberian Identitas)
- **Prompt:**
  ```text
  create images Model 3D routerboard MikroTik hEX RB750Gr3 warna putih abu-abu dengan 5 port gigabit dan lampu indikator LED aktif di samping laptop teknisi yang menampilkan jendela login aplikasi Winbox pada tab Neighbors MAC Address. Sudut pandang isometrik 3D meja kerja teknisi IT dengan kabel LAN terhubung, bersih, realistis, dan informatif.
  ```

#### `images/mikrotik-nat-masquerade.png`
- **Modul:** Modul 05 - Dasar MikroTik (Bagian 2: Konfigurasi IP, DHCP, DNS & NAT)
- **Prompt:**
  ```text
  create images Model 3D visual diagram alur internet NAT Masquerade. Dari sisi kiri perangkat laptop dan komputer kantor (segmen IP lokal 192.168.10.0/24) terhubung ke router MikroTik putih, lalu router menerjemahkan paket data keluar menuju simbol bola dunia awan internet melalui satu IP publik dengan panah berkilau cahaya hijau. Render 3D modern, bersih, dan mudah dipahami pemula.
  ```

---

### 6. Modul 06: Konfigurasi Lanjutan MikroTik

#### `images/vlan-bridge-filtering.png`
- **Modul:** Modul 06 - Konfigurasi Lanjutan (Bagian 1: VLAN & Bridge VLAN Filtering)
- **Prompt:**
  ```text
  create images Model 3D konsep pembagian jalur VLAN pada switch manageable. Satu kabel trunk utama membawa paket gabungan, lalu di dalam switch terbagi secara terisolasi menjadi dua jalur warna: jalur VLAN 10 warna hijau untuk komputer kantor dan jalur VLAN 20 warna oranye khusus kamera CCTV. Render 3D isometrik bersih dengan efek jalur warna bercahaya elegan.
  ```

#### `images/firewall-queue-vpn.png`
- **Modul:** Modul 06 - Konfigurasi Lanjutan (Bagian 2: Firewall, Manajemen Bandwidth & VPN)
- **Prompt:**
  ```text
  create images Model 3D konsep keamanan router jaringan: perisai firewall hijau melindungi transmisi data dari ancaman luar, tabung antrean bandwidth bertingkat membagi kecepatan internet secara adil, dan terowongan pipa VPN terenkripsi dengan gembok pengaman digital bercahaya. Render 3D modern futuristik, bersih, ramah pemula tanpa teks membingungkan.
  ```

---

### 7. Modul 07: CCTV IP & Analog (NVR, DVR & HDD)

#### `images/cctv-system-topology.png`
- **Modul:** Modul 07 - CCTV Sistem (Bagian 1: Arsitektur Analog HD vs IP Camera)
- **Prompt:**
  ```text
  create images Model 3D perbandingan berdampingan dua sistem CCTV pengawas. Sisi atas adalah sistem kamera analog bullet terhubung kabel UTP dan video balun menuju power supply sentral 12V jaring dan perekam DVR. Sisi bawah adalah sistem modern IP camera dome putih cukup terhubung satu kabel LAN PoE langsung menuju perekam NVR. Render 3D berdampingan yang sangat jelas membedakan komponen instalasi.
  ```

#### `images/cctv-hdd-calculation.png`
- **Modul:** Modul 07 - CCTV Sistem (Bagian 2: Kalkulasi Harddisk & Codec Kompresi)
- **Prompt:**
  ```text
  create images Model 3D harddisk internal khusus CCTV 3.5 inci Western Digital Purple bersanding dengan grafik silinder perbandingan kapasitas penyimpanan rekaman: format lama H.264 memerlukan kapasitas besar, sedangkan format cerdas H.265+ hemat lebih dari separuh ruang harddisk dengan lencana hijau hemat 60%. Render 3D metalik bersih dengan detail label ungu surveillance drive.
  ```

---

### 8. Modul 08: Akses Jarak Jauh CCTV & Jaringan

#### `images/cctv-p2p-cloud-setup.png`
- **Modul:** Modul 08 - Akses Remote (Bagian 1: Koneksi Cloud P2P Tanpa IP Publik)
- **Prompt:**
  ```text
  create images Model 3D kemudahan koneksi CCTV Cloud P2P. Layar monitor NVR menampilkan kode QR verifikasi dengan indikator status online warna hijau, dan di sampingnya smartphone teknisi sedang memindai kode QR tersebut sehingga layar HP langsung menampilkan tayangan langsung video kamera secara instan. Render 3D bersih dengan sudut isometrik modern.
  ```

#### `images/cctv-port-forwarding.png`
- **Modul:** Modul 08 - Akses Remote (Bagian 2: Port Forwarding, DDNS & Aliran RTSP)
- **Prompt:**
  ```text
  create images Model 3D diagram alur port forwarding remote CCTV. Dari internet luar paket data masuk ke modem router dengan IP publik, lalu diteruskan melalui port RTSP 554 dan port server 8000 langsung ke alamat IP lokal NVR di jaringan internal. Render 3D dengan garis panah bercahaya hijau mengalir di atas latar belakang putih bersih.
  ```

---

### 9. Modul 09: Troubleshooting Jaringan & CCTV

#### `images/troubleshooting-tree-internet.png`
- **Modul:** Modul 09 - Pohon Masalah (Bagian 1: Kasus 1 - Internet Mati Total)
- **Prompt:**
  ```text
  create images Model 3D diagram langkah penanganan masalah internet mati total. Teknisi memeriksa lampu indikator PON dan LOS pada modem optik ONT, kabel patch cord kuning, pengujian ping pada laptop tester, dan router utama dengan simbol centang hijau untuk jalur normal dan segitiga kuning untuk pemeriksaan. Render 3D isometrik bersih dan terstruktur.
  ```

#### `images/troubleshooting-tree-cctv.png`
- **Modul:** Modul 09 - Pohon Masalah (Bagian 2: Kasus 2 - CCTV Hilang Gambar & RTO)
- **Prompt:**
  ```text
  create images Model 3D alur investigasi kamera CCTV tidak ada gambar atau blank. Menampilkan multimeter digital mengukur voltase 12V DC pada ujung colokan kamera, pemeriksaan lampu link LED port switch PoE, dan laptop yang menjalankan program pencari IP kamera SADP Tool. Render 3D detail fokus pada peralatan kerja teknisi.
  ```

---

### 10. Modul 10: Maintenance Berkala Harian, Mingguan, Bulanan

#### `images/maintenance-backup-routine.png`
- **Modul:** Modul 10 - Maintenance Berkala (Bagian 1: Rutinitas Harian & Mingguan)
- **Prompt:**
  ```text
  create images Model 3D rutinitas backup perangkat router jaringan. Flashdisk USB rugged warna hijau dicolokkan ke port USB routerboard untuk menyimpan berkas cadangan .backup terenkripsi dan berkas skrip konfigurasi .rsc, didampingi kalender jadwal perawatan berkala bertanda centang hijau. Render 3D bersih dan elegan.
  ```

#### `images/maintenance-smart-hdd.png`
- **Modul:** Modul 10 - Maintenance Berkala (Bagian 2: Perawatan Bulanan & Uji S.M.A.R.T)
- **Prompt:**
  ```text
  create images Model 3D perawatan preventif harddisk CCTV dan perangkat server. Menampilkan harddisk 3.5 inci dengan indikator kesehatan S.M.A.R.T 100% prima, alat mini blower antistatis pembersih debu fan pendingin, dan termometer digital menunjukkan suhu kerja normal 35 derajat Celsius. Render 3D detail, bersih, dan profesional.
  ```

---

### 11. Modul 11: Dokumentasi Lapangan & BAST

#### `images/documentation-before-after.png`
- **Modul:** Modul 11 - Dokumentasi Lapangan (Bagian 1: Laporan Harian & Foto Progres 3 Tahap)
- **Prompt:**
  ```text
  create images Model 3D perbandingan sebelum dan sesudah perapian kabel server rack. Sisi kiri kabel kusut menjuntai berantakan tanpa label penanda; sisi kanan kabel tersusun lurus rapi di dalam horizontal organizer, diikat rapi dengan velcro strip hijau, dan dilengkapi label nomor port yang seragam. Render 3D kontras tinggi yang sangat memuaskan.
  ```

#### `images/documentation-bast-format.png`
- **Modul:** Modul 11 - Dokumentasi Lapangan (Bagian 2: Penyusunan Draf BAST & Topologi)
- **Prompt:**
  ```text
  create images Model 3D berkas Berita Acara Serah Terima (BAST) pekerjaan IT di atas papan jalan clipboard kayu rapi. Menampilkan lembar checklist inventaris peralatan dengan cap centang hijau, dua kolom tanda tangan resmi bermaterai, dan lampiran denah topologi jaringan bertingkat. Render 3D sudut isometrik bersih berwibawa.
  ```

---

## Slot Alat Kerja Lapangan & IT Staff Tambahan

### `images/cctv-ip-vs-analog.png`
- **Kategori:** CCTV Lapangan
- **Deskripsi:** Perbandingan fisik kamera IP Dome vs Analog Bullet dengan konektor portnya.
- **Prompt:**
  ```text
  create images Model 3D bersih dan detail dari kamera CCTV IP dome putih dan kamera CCTV analog bullet berdampingan. Kamera IP dome menunjukkan satu port kabel RJ45 PoE bersih. Kamera analog bullet menunjukkan kabel buntut dengan konektor BNC metal dan jack power DC 12V bersama konektor video balun pasif. Render 3D studio fotorealistik minimalis dengan pencahayaan lembut.
  ```

### `images/wifi-ap-ceiling-mount.png`
- **Kategori:** WiFi & Access Point
- **Deskripsi:** Access Point plafon WiFi 6 dengan instalasi drop ceiling tersembunyi.
- **Prompt:**
  ```text
  create images Model 3D Access Point WiFi 6 bundar warna putih terpasang rapi di plafon gypsum kantor. Tampak kabel LAN UTP Cat6 masuk tersembunyi lewat bracket mounting di balik plafon, dengan cincin lampu LED tipis menyala biru lembut memancarkan sinyal gelombang frekuensi ganda 2.4GHz dan 5GHz. Render 3D modern bersih minimalis.
  ```

### `images/poe-injector-vs-switch.png`
- **Kategori:** WiFi & PoE Power
- **Deskripsi:** Adaptor PoE Injector vs PoE Switch manageable.
- **Prompt:**
  ```text
  create images Model 3D adaptor PoE Injector hitam dengan dua port LAN: port Data In dari router dan port Data+Power Out menuju perangkat Access Point atau kamera CCTV, bersanding dengan switch PoE multi-port. Render 3D bersih dengan diagram aliran arus listrik DC dan data.
  ```

### `images/fiber-splicer-cleaver-kit.png`
- **Kategori:** Fiber Optik Tools
- **Deskripsi:** Paket kit perlengkapan sambung fiber optik lapangan.
- **Prompt:**
  ```text
  create images Model 3D satu set lengkap alat kerja teknisi fiber optik: fusion splicer mini, high-precision fiber cleaver pemotong kaca, stripper kabel drop core 3 lubang, botol alkohol dispenser, dan Optical Power Meter (OPM) berlayar hijau. Render 3D studio teratur di atas meja teknisi.
  ```

### `images/utp-crimper-lan-tester-kit.png`
- **Kategori:** UTP Cable Tools
- **Deskripsi:** Paket perkakas crimping dan testing kabel LAN.
- **Prompt:**
  ```text
  create images Model 3D tas perkakas teknisi UTP: tang crimping ratchet heavy duty warna hijau, LAN tester master dan remote dengan 8 lampu LED hijau berurutan menyala, punch down tool keystone jack, pemotong kabel kawat, dan kotak konektor RJ45 Cat6 tembaga. Render 3D bersih dan tajam.
  ```

### `images/it-support-work-kit.png`
- **Kategori:** IT Support Kit
- **Deskripsi:** Toolkit lengkap penunjang pekerjaan staf IT lapangan.
- **Prompt:**
  ```text
  create images Model 3D work kit lengkap teknisi IT Support lapangan: laptop diagnostik tipis dengan port RJ45, USB to LAN adapter, multimeter digital probe runcing, kabel console roll-over RJ45 to USB, label printer portabel pembuat stiker kabel, dan obeng set teknisi magnetik. Render 3D studio pencahayaan profesional.
  ```

---

## Tabel Rangkuman Berkas & Lisensi

| Berkas Tujuan | Kategori | Jenis Ilustrasi | Status Integrasi |
|---|---|---|---|
| `images/survey-cable-path.png` | Modul 01 | 3D Conduit & Plafon | Terhubung Modul |
| `images/survey-boq-sample.png` | Modul 01 | 3D Meja Survei BoQ | Terhubung Modul |
| `images/utp-color-pinout.png` | Modul 02 | 3D Pinout T568B RJ45 | Terhubung Modul |
| `images/utp-crimping-steps.png` | Modul 02 | 3D Tahap Crimping | Terhubung Modul |
| `images/fiber-connector-types.png` | Modul 03 | 3D Konektor SC-UPC/APC | Terhubung Modul |
| `images/fiber-fusion-splicing.png` | Modul 03 | 3D Fusion Splicer Core | Terhubung Modul |
| `images/rack-cable-management.png` | Modul 04 | 3D Server Rack 19" | Terhubung Modul |
| `images/poe-switch-budget.png` | Modul 04 | 3D PoE Budget Diagram | Terhubung Modul |
| `images/mikrotik-winbox-login.png` | Modul 05 | 3D Router & Winbox | Terhubung Modul |
| `images/mikrotik-nat-masquerade.png` | Modul 05 | 3D Alur NAT Masquerade | Terhubung Modul |
| `images/vlan-bridge-filtering.png` | Modul 06 | 3D Bridge VLAN Matrix | Terhubung Modul |
| `images/firewall-queue-vpn.png` | Modul 06 | 3D Firewall Queue VPN | Terhubung Modul |
| `images/cctv-system-topology.png` | Modul 07 | 3D DVR vs NVR PoE | Terhubung Modul |
| `images/cctv-hdd-calculation.png` | Modul 07 | 3D HDD WD Purple & Codec | Terhubung Modul |
| `images/cctv-p2p-cloud-setup.png` | Modul 08 | 3D QR Code Cloud P2P | Terhubung Modul |
| `images/cctv-port-forwarding.png` | Modul 08 | 3D Port Routing NVR | Terhubung Modul |
| `images/troubleshooting-tree-internet.png` | Modul 09 | 3D Pohon Internet ONT | Terhubung Modul |
| `images/troubleshooting-tree-cctv.png` | Modul 09 | 3D Alur CCTV SADP Tool | Terhubung Modul |
| `images/maintenance-backup-routine.png` | Modul 10 | 3D Backup Router Flashdisk | Terhubung Modul |
| `images/maintenance-smart-hdd.png` | Modul 10 | 3D SMART HDD & Blower | Terhubung Modul |
| `images/documentation-before-after.png` | Modul 11 | 3D Sebelum-Sesudah Rack | Terhubung Modul |
| `images/documentation-bast-format.png` | Modul 11 | 3D Berkas Dokumen BAST | Terhubung Modul |
| `images/cctv-ip-vs-analog.png` | Studio / CCTV | 3D Kamera IP vs Analog | Studio Lapangan |
| `images/wifi-ap-ceiling-mount.png` | Studio / WiFi | 3D AP Plafon WiFi 6 | Studio Lapangan |
| `images/poe-injector-vs-switch.png` | Studio / Power | 3D PoE Injector vs Switch | Studio Lapangan |
| `images/fiber-splicer-cleaver-kit.png` | Studio / Fiber | 3D Kit Fusion Splicer | Studio Lapangan |
| `images/utp-crimper-lan-tester-kit.png` | Studio / UTP | 3D Kit Tang Crimping & LAN | Studio Lapangan |
| `images/it-support-work-kit.png` | Studio / IT Kit | 3D Toolkit IT Support | Studio Lapangan |
