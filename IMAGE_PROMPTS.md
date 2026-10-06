# Daftar Prompt Gambar & Panduan Ilustrasi Lapangan

Dokumen ini berisi daftar prompt pembuatan gambar ilustrasi teknis dalam bahasa Inggris untuk seluruh slot gambar pada aplikasi **FieldNet Belajar**. Setiap prompt dirancang dengan konsistensi gaya:
- **Gaya Visual:** Flat technical illustration, clean precise line art, isometric perspective (jika relevan).
- **Palet Warna:** Aksen hijau utama (`#16A34A`), netral abu-abu arsitektural, latar belakang polos bersih (plain white / transparent).
- **Ketentuan:** Tanpa teks acak di dalam gambar kecuali label teknis yang diminta secara eksplisit.
- **Graceful Fallback:** Aplikasi telah dilengkapi kartu placeholder otomatis dengan caption dan nama file, sehingga tampilan tetap elegan meskipun file gambar belum diisi.

---

## 1. Modul 01: Survei Lokasi & Rencana Instalasi

### `images/survey-cable-path.png`
- **Modul:** Modul 01 - Survei Lokasi (Bagian 1: Observasi Fisik & Struktur Gedung)
- **Prompt:**
  > "A clean isometric flat technical illustration showing a ceiling crawl space and gypsum drop ceiling in an office building. On the left, a gray PVC conduit carrying network UTP cables. On the right, a black electrical conduit carrying 220V power cables, strictly separated by a measured distance of at least 30 cm with a clear dashed measurement bracket labeled '30 cm'. Minimalist aesthetic, clean line art, primary green accent (#16A34A) highlighting the data conduit, plain solid background, no extraneous clutter."

### `images/survey-boq-sample.png`
- **Modul:** Modul 01 - Survei Lokasi (Bagian 2: Penyusunan Bill of Quantities)
- **Prompt:**
  > "A flat technical vector illustration of network technician survey tools and planning sheet on an architectural floorplan blueprint. Shows a laser distance meter emitting a crisp green (#16A34A) laser line, a notebook open with a neat Bill of Quantities checklist, a calculator, and a yellow coiled UTP cable roll. Crisp lines, soft neutral tones, high contrast, white background."

---

## 2. Modul 02: Kabel UTP, Crimping & Testing

### `images/utp-color-pinout.png`
- **Modul:** Modul 02 - Kabel UTP (Bagian 1: Standar Warna T568A & T568B)
- **Prompt:**
  > "A detailed front-facing technical illustration of a transparent RJ45 modular plug viewed with the plastic retaining clip facing downward. Inside the clear plastic body, 8 colored copper wire pins are aligned in exact T568B order from pin 1 to 8: White-Orange, Orange, White-Green, Blue, White-Blue, Green, White-Brown, Brown. Sharp technical diagram, clean vector lines, accent green (#16A34A) highlights on the pin numbering 1 to 8, plain white background."

### `images/utp-crimping-steps.png`
- **Modul:** Modul 02 - Kabel UTP (Bagian 2: Teknik Crimping & Uji Tester LAN)
- **Prompt:**
  > "A three-stage technical illustration showing the UTP crimping process: Step 1 shows stripping the outer jacket 2.5 cm and untwisting pairs; Step 2 shows flush cutting wires to 1.2 cm and sliding into RJ45 plug with outer jacket nested past the internal crimp wedge; Step 3 shows heavy-duty ratchet crimping tool pressing down onto the RJ45 plug. Clean line art, green accent (#16A34A) on the tool handle and status ticks, pure solid background."

---

## 3. Modul 03: Fiber Optik Dasar, Splicing & Loss

### `images/fiber-connector-types.png`
- **Modul:** Modul 03 - Fiber Optik (Bagian 1: Karakteristik Core & Konektor FO)
- **Prompt:**
  > "A technical side-by-side comparison diagram of optical fiber connectors. On the left, a blue SC-UPC connector with a flat ceramic ferrule. On the right, a vibrant green (#16A34A) SC-APC connector highlighting the angled 8-degree ferrule tip with an angle indicator diagram. Precision technical line art, cross-sectional view of the 9-micron single-mode glass core, clean white background."

### `images/fiber-fusion-splicing.png`
- **Modul:** Modul 03 - Fiber Optik (Bagian 2: Teknik Splicing & Pengukuran Loss)
- **Prompt:**
  > "An isometric technical illustration of a modern fiber optic fusion splicer device with the windproof cover open. Inside the V-grooves, two stripped 125-micron glass fibers meet between dual tungsten electrodes with a miniature electric arc glow. The LCD display screen shows X and Y axis fiber alignment with a reading '0.01 dB'. Green accents (#16A34A) on rubber bumper pads and digital readout, clean white background."

---

## 4. Modul 04: Instalasi Rack, Switch, Router & Access Point

### `images/rack-cable-management.png`
- **Modul:** Modul 04 - Instalasi Rack (Bagian 1: Mounting Rack & Manajemen Kabel)
- **Prompt:**
  > "A front-elevation technical vector drawing of a 19-inch server rack enclosure. From top to bottom: 1U 24-port keystone patch panel, 1U horizontal cable management brush duct, and 1U 24-port Gigabit PoE switch. Short 30 cm green (#16A34A) and blue patch cords loop neatly through the brush panel into switch ports. Rack rails show standard 1U tick marks and cage nuts. Crisp engineering illustration, plain neutral background."

### `images/poe-switch-budget.png`
- **Modul:** Modul 04 - Instalasi Rack (Bagian 2: Kalkulasi Daya PoE & Penempatan AP)
- **Prompt:**
  > "A clean infographic diagram illustrating PoE Power Budget calculation. In the center, a 250W PoE switch with an energy gauge bar showing 180W used (green #16A34A) and 70W headroom reserve. Cables branch out to 8 ceiling-mounted Wi-Fi 6 Access Points (15W each) and 4 outdoor PTZ cameras (25W each). Flat isometric vector art, precise lines, white background."

---

## 5. Modul 05: Konfigurasi Dasar MikroTik

### `images/mikrotik-winbox-login.png`
- **Modul:** Modul 05 - Dasar MikroTik (Bagian 1: Akses Winbox & Pemberian Identitas)
- **Prompt:**
  > "A clean vector mockup of the MikroTik Winbox application connection dialog. Focus on the 'Neighbors' discovery tab listing discovered routers by MAC Address, IP Address (0.0.0.0), Identity ('MikroTik'), and Board Name. A mouse cursor highlights the top MAC address row with an accent green (#16A34A) border. Minimalist UI vector style, high legibility, crisp outlines."

### `images/mikrotik-nat-masquerade.png`
- **Modul:** Modul 05 - Dasar MikroTik (Bagian 2: Konfigurasi IP, DHCP, DNS & NAT)
- **Prompt:**
  > "A network translation diagram illustrating NAT Masquerade. On the left, private local network clients (192.168.10.0/24) send data packets. In the center, a MikroTik router box converts source addresses into a single public WAN IP (203.0.113.15) with an arrow pointing toward a clean globe cloud. Green (#16A34A) vector arrows indicate packet flow, crisp line art, white background."

---

## 6. Modul 06: Konfigurasi Lanjutan MikroTik

### `images/vlan-bridge-filtering.png`
- **Modul:** Modul 06 - Konfigurasi Lanjutan (Bagian 1: VLAN & Bridge VLAN Filtering)
- **Prompt:**
  > "An architectural diagram showing Bridge VLAN Filtering inside a managed switch. An 802.1Q trunk port carries combined tagged traffic: VLAN 10 (Office Staff - green #16A34A) and VLAN 20 (CCTV - amber). The internal bridge filtering matrix routes untagged frames to dedicated access ports ether3 and ether4. Clean vector isometric network topology, sharp lines, plain background."

### `images/firewall-queue-vpn.png`
- **Modul:** Modul 06 - Konfigurasi Lanjutan (Bagian 2: Firewall, Manajemen Bandwidth & VPN)
- **Prompt:**
  > "A three-pillar technical illustration representing network security and control. Pillar 1: A firewall shield blocking invalid red packets while letting green (#16A34A) established packets pass. Pillar 2: A bandwidth traffic queue with balanced lanes. Pillar 3: A padlock tunnel representing WireGuard VPN encryption. Flat modern vector art, clean lines, white background."

---

## 7. Modul 07: CCTV IP & Analog (NVR, DVR & HDD)

### `images/cctv-system-topology.png`
- **Modul:** Modul 07 - CCTV Sistem (Bagian 1: Arsitektur Analog HD vs IP Camera)
- **Prompt:**
  > "A comparative split-view diagram of CCTV architectures. Top half: Analog HD camera connecting via passive video balun and UTP wire to a central DVR box and 12V DC power distribution unit. Bottom half: Modern ONVIF IP dome camera connecting via a single green (#16A34A) Cat6 PoE cable directly into an 8-channel NVR. Clean isometric vector, plain white background."

### `images/cctv-hdd-calculation.png`
- **Modul:** Modul 07 - CCTV Sistem (Bagian 2: Kalkulasi Harddisk & Codec Kompresi)
- **Prompt:**
  > "A technical graphic comparing video compression storage savings. Shows a purple surveillance-grade 3.5-inch hard drive. Below it, two storage consumption bars: 'H.264 (Old)' taking 10 Terabytes, and 'H.265+ (Smart Codec)' taking only 4 Terabytes, highlighted with a green (#16A34A) '60% Storage Saved' badge. Flat precision technical drawing, crisp lines."

---

## 8. Modul 08: Akses Jarak Jauh CCTV & Jaringan

### `images/cctv-p2p-cloud-setup.png`
- **Modul:** Modul 08 - Akses Remote (Bagian 1: Koneksi Cloud P2P Tanpa IP Publik)
- **Prompt:**
  > "An isometric illustration showing P2P Cloud connectivity. In the center, a secure cloud server icon. On the left, an on-premise NVR displays a QR Code on its monitor with a green (#16A34A) 'Status: Online' indicator. On the right, a technician's smartphone scans the QR code, instantly displaying live multi-camera feeds. Clean vector line art, white background."

### `images/cctv-port-forwarding.png`
- **Modul:** Modul 08 - Akses Remote (Bagian 2: Port Forwarding, DDNS & Aliran RTSP)
- **Prompt:**
  > "A network port routing technical diagram. External internet traffic arrives at a modem router with a public IP. The router's NAT Virtual Server table maps incoming Port 8000 (Media Server), Port 554 (RTSP Stream - green #16A34A), and Port 8088 (Web HTTP) to the local private IP of the NVR (192.168.1.100). Clean vector diagram with directional arrows, white background."

---

## 9. Modul 09: Troubleshooting Jaringan & CCTV

### `images/troubleshooting-tree-internet.png`
- **Modul:** Modul 09 - Pohon Masalah (Bagian 1: Kasus 1 - Internet Mati Total)
- **Prompt:**
  > "A sleek decision-tree flowchart for internet outage diagnosis. Root node: 'Check ONT LOS/PON LEDs'. Branches lead to 'Optical Fiber Cut', 'Modem LAN Link Check', 'Gateway Ping Test', and 'DNS Lookup Check' with green (#16A34A) checkmark branches for YES and red warning nodes for NO. Clean flowchart design with rounded cards, readable structure, plain white background."

### `images/troubleshooting-tree-cctv.png`
- **Modul:** Modul 09 - Pohon Masalah (Bagian 2: Kasus 2 - CCTV Hilang Gambar & RTO)
- **Prompt:**
  > "A decision-tree flowchart for CCTV No Video troubleshooting. Step 1: 'Measure 12V DC Voltage at Camera'. Step 2: 'Check PoE Link LED on Switch'. Step 3: 'Ping IP via SADP Tool'. Step 4: 'Verify ONVIF RTSP Stream in VLC'. Clean technical boxes with green (#16A34A) action paths, crisp line art, white background."

---

## 10. Modul 10: Maintenance Berkala Harian, Mingguan, Bulanan

### `images/maintenance-backup-routine.png`
- **Modul:** Modul 10 - Maintenance Berkala (Bagian 1: Rutinitas Harian & Mingguan)
- **Prompt:**
  > "A technical illustration of a router backup workflow. A MikroTik router outputs two distinct files into a green (#16A34A) rugged USB flash drive: a binary '.backup' padlock file and a clean readable '.rsc' script text file. In the background, a calendar checklist shows weekly automated schedule ticks. Flat vector style, clean outlines, white background."

### `images/maintenance-smart-hdd.png`
- **Modul:** Modul 10 - Maintenance Berkala (Bagian 2: Perawatan Bulanan & Uji S.M.A.R.T)
- **Prompt:**
  > "A diagnostic dashboard mockup showing HDD S.M.A.R.T health parameters. A 3.5-inch hard drive graphic with sensor overlays indicating 'Temperature: 36°C' (Green #16A34A), 'Reallocated Sector Count: 0' (Good), and 'Health Status: 100% OK'. Beside it, a technician's antistatic mini blower dusting fan vents safely. High detail, vector aesthetic, white background."

---

## 11. Modul 11: Dokumentasi Lapangan & BAST

### `images/documentation-before-after.png`
- **Modul:** Modul 11 - Dokumentasi Lapangan (Bagian 1: Laporan Harian & Foto Progres 3 Tahap)
- **Prompt:**
  > "A split comparison technical illustration of server rack cable dressing. Left side ('Before'): Tangled bird's nest of loose cables, unnumbered wires hanging across equipment. Right side ('After'): Clean professional installation with straight bundle runs, Velcro straps, numbered cable markers, and green (#16A34A) patch cords in horizontal cable managers. Clean vector art, plain background."

### `images/documentation-bast-format.png`
- **Modul:** Modul 11 - Dokumentasi Lapangan (Bagian 2: Penyusunan Draf BAST & Topologi)
- **Prompt:**
  > "An isometric illustration of an official project handover document (Berita Acara Serah Terima - BAST) resting on a clipboard. Features an inventory checklist with green (#16A34A) acceptance stamps, two official signature lines with official company seals and duty stamps (materai), and an attached network topology blueprint. Clean corporate engineering style, white background."

---

## Panduan Penggantian Gambar & Tabel Lisensi

Jika kamu mengunduh foto atau gambar dari internet untuk menggantikan slot ilustrasi di atas, ikuti langkah berikut:
1. Pastikan resolusi gambar minimal **800 x 500 piksel** (rasio 16:9 atau 4:3).
2. Simpan gambar dalam format `.png` atau `.webp` dengan nama berkas yang sama persis di folder `public/images/`.
3. Catat sumber dan lisensi pada tabel di bawah ini untuk memastikan kepatuhan hak cipta:

| Berkas Tujuan | Modul Terkait | Sumber URL | Jenis Lisensi | Tanggal Unduh |
|---|---|---|---|---|
| `images/survey-cable-path.png` | Modul 01 | *Contoh: Unsplash / Wikimedia* | CC-BY / Bebas Hak Cipta | - |
| `images/survey-boq-sample.png` | Modul 01 | *Contoh: Dokumentasi Internal* | Milik Sendiri | - |
| `images/utp-color-pinout.png` | Modul 02 | *Contoh: Wikimedia Commons* | CC-BY-SA 4.0 | - |
| `images/utp-crimping-steps.png` | Modul 02 | *Contoh: Tangkapan Kamera Lapangan* | Milik Sendiri | - |
| `images/fiber-connector-types.png`| Modul 03 | *Contoh: Wikimedia Commons* | CC-BY 3.0 | - |
| `images/fiber-fusion-splicing.png`| Modul 03 | *Contoh: Dokumentasi Lapangan* | Milik Sendiri | - |
| `images/rack-cable-management.png`| Modul 04 | *Contoh: Foto Site Resmi* | Milik Sendiri | - |
| `images/poe-switch-budget.png` | Modul 04 | *Contoh: Diagram Desain* | Milik Sendiri | - |
| `images/mikrotik-winbox-login.png`| Modul 05 | *Contoh: Tangkapan Layar Winbox* | Edukasi / Fair Use | - |
| `images/mikrotik-nat-masquerade.png`| Modul 05| *Contoh: Tangkapan Layar Winbox* | Edukasi / Fair Use | - |
| `images/vlan-bridge-filtering.png`| Modul 06 | *Contoh: Diagram Topologi* | Milik Sendiri | - |
| `images/firewall-queue-vpn.png` | Modul 06 | *Contoh: Diagram Keamanan* | Milik Sendiri | - |
| `images/cctv-system-topology.png` | Modul 07 | *Contoh: Dokumentasi Proyek* | Milik Sendiri | - |
| `images/cctv-hdd-calculation.png` | Modul 07 | *Contoh: Bagan Teknis* | Milik Sendiri | - |
| `images/cctv-p2p-cloud-setup.png` | Modul 08 | *Contoh: Tangkapan Layar NVR* | Edukasi / Fair Use | - |
| `images/cctv-port-forwarding.png` | Modul 08 | *Contoh: Diagram Port NAT* | Milik Sendiri | - |
| `images/troubleshooting-tree-internet.png`| Modul 09| *Contoh: Diagram Alur* | Milik Sendiri | - |
| `images/troubleshooting-tree-cctv.png`| Modul 09| *Contoh: Diagram Alur* | Milik Sendiri | - |
| `images/maintenance-backup-routine.png`| Modul 10| *Contoh: Tangkapan Layar Files* | Edukasi / Fair Use | - |
| `images/maintenance-smart-hdd.png`| Modul 10| *Contoh: Tangkapan Layar SMART*| Edukasi / Fair Use | - |
| `images/documentation-before-after.png`| Modul 11| *Contoh: Foto Lapangan Asli* | Milik Sendiri | - |
| `images/documentation-bast-format.png`| Modul 11| *Contoh: Scan Format BAST* | Milik Sendiri | - |
