# Panduan Penambahan Konten (Content Guide)

Aplikasi **FieldNet Belajar** dirancang dengan arsitektur **content-driven** dan **zero-code modification**. Artinya, untuk menambahkan modul pembelajaran baru, kuis, perintah CLI nyata, maupun butir checklist lapangan, kamu **tidak perlu menyentuh kode aplikasi (JavaScript/CSS)** sama sekali. Cukup buat file JSON baru di dalam folder `content/` dan daftarkan di `content/manifest.json`.

---

## 1. Alur Penambahan Modul Baru

1. **Buat File Modul Baru:**
   Buat file bernama `module-12.json` (atau nomor berikutnya) di dalam folder `content/`.
2. **Daftarkan ke Manifest:**
   Buka `content/manifest.json` dan tambahkan metadata modul ke dalam array `modules`.
3. **Tambahkan ke Precache Service Worker (Opsional tapi Disarankan):**
   Tambahkan path `/content/module-12.json` ke array `PRECACHE_ASSETS` di `sw.js` agar langsung dicache saat update pertama.
4. **Verifikasi:**
   Buka aplikasi; modul baru akan otomatis muncul di Beranda, Daftar Modul, Pencarian Offline, dan Filter Checklist!

---

## 2. Aturan Format & Standar Penulisan

Agar kualitas konten tetap konsisten dan nyaman dipelajari oleh calon teknisi, patuhi aturan mutlak berikut:

- **Gaya Bahasa:** Bahasa Indonesia non-formal, seperti diajarin oleh teman senior yang sabar di warung kopi.
- **Sapaan:** Gunakan kata **kamu** (hindari bahasa birokratis kaku seperti "peserta", "anda", atau "saudara").
- **Analogi Sehari-hari:** Setiap konsep teknis wajib diawali analogi dunia nyata (contoh: VLAN diibaratkan rombongan warga beda jalur).
- **Panjang Paragraf:** **Maksimal 4 kalimat per paragraf**. Paragraf yang terlalu panjang membuat mata lelah di layar ponsel.
- **Langkah Bernomor:** Setiap langkah praktik wajib memiliki `title`, `text`, dan `why` (penjelasan kenapa langkah itu penting).
- **Peringatan Singkat:** Beri blok peringatan (`warning`) untuk tindakan yang berpotensi fatal atau merusak perangkat.
- **Ringkasan Tiga Poin:** Tepat **3 butir ringkasan** (`summary3Points`) pada akhir modul.
- **Microcopy:** Judul modul maksimal 2 kata.

---

## 3. Template JSON Siap Salin (Copy-Paste Template)

Gunakan template di bawah ini untuk modul baru kamu:

```json
{
  "id": "module-12",
  "title": "Jaringan Nirkabel",
  "badge": "Transmisi Radio",
  "intro": "Menghubungkan dua kantor beda bukit tanpa kabel tanah butuh ketelitian membidik antena point-to-point. Di modul ini, kamu akan diajari cara menghitung kelengkungan Fresnel zone, membidik arah azimuth radio outdoor, dan mengunci sinyal RSSI terkuat.",
  "objectives": [
    "Memahami konsep Fresnel zone dan line-of-sight (LoS) bebas halangan.",
    "Memasang radio outdoor pada tiang pipa galvanis dengan penangkal petir.",
    "Melakukan pointing antena microwave hingga mendapat sinyal minimal -60 dBm.",
    "Mengukur throughput kapasitas link nirkabel menggunakan bandwidth test."
  ],
  "sections": [
    {
      "title": "Prinsip Line of Sight & Fresnel",
      "analogy": "Fresnel zone itu seperti perut tabung balon udara di antara dua senter. Walaupun kedua senter saling tatap, kalau ada pucuk pohon bambu yang masuk ke tengah balon, sinyalnya bakal terpantul buyar.",
      "paragraphs": [
        "Komunikasi nirkabel point-to-point membutuhkan jalur pandang bebas hambatan atau Line of Sight (LoS). Hambatan bukan hanya gedung tinggi di tengah jalur, tetapi juga pertumbuhan pohon kelapa dan kontur bukit tanah. Daerah elips di sekitar garis lurus tersebut dinamakan zona Fresnel pertama.",
        "Minimal 60 sampai 80 persen area zona Fresnel harus benar-benar bersih dari rintangan. Jika zona ini terpotong, paket data akan mengalami hamburan sinyal yang mengakibatkan penurunan kecepatan dramatis. Karena itu, survei ketinggian tiang tower adalah langkah awal paling vital sebelum memanjat."
      ],
      "steps": [
        {
          "step": 1,
          "title": "Gunakan Aplikasi Simulasi Link",
          "text": "Buka software perencana link (seperti Ubiquiti ISP Design Center) untuk memetakan koordinat GPS dan profil elevasi tanah.",
          "why": "Memastikan tinggi tiang di kedua sisi cukup tinggi melompati puncak pohon tanpa perlu menduga-duga."
        },
        {
          "step": 2,
          "title": "Pasang Surge Protector Petir",
          "text": "Pasang unit Ethernet Surge Protector di bawah tiang radio dan hubungkan kabel ground ke arde tembaga tanah.",
          "why": "Radio outdoor di ketinggian sangat rentan tersambar induksi petir yang bisa merambat ke port switch dalam ruangan."
        }
      ],
      "warning": "Jangan pernah memanjat tiang tower pipa tanpa mengenakan Full Body Harness dan tali pengaman ganda berstandar K3 lapangan.",
      "imageSlot": {
        "id": "img-12-fresnel-zone",
        "filename": "images/wireless-fresnel-zone.png",
        "caption": "Diagram kelengkungan zona Fresnel 60% bebas rintangan antara dua menara radio.",
        "alt": "Diagram visual Line of Sight dan clearance zona Fresnel nirkabel"
      }
    }
  ],
  "realCommands": [
    {
      "title": "Uji Throughput Link Nirkabel MikroTik",
      "code": "/tool bandwidth-test address=192.168.88.2 direction=both protocol=udp user=admin password=KunciR4hasia",
      "explanation": "Perintah untuk menguji kapasitas transfer riil download dan upload link radio nirkabel pada protokol UDP.",
      "context": "Pengujian link point-to-point di atas tower."
    }
  ],
  "fieldChecklist": [
    {
      "id": "chk-12-01",
      "text": "Pastikan braket antena terkunci rapat dengan baut anti-karat agar arah bidik tidak bergeser kena angin kencang.",
      "tip": "Gunakan threadlocker (lem baut biru) pada baut dudukan radio outdoor."
    },
    {
      "id": "chk-12-02",
      "text": "Bungkus konektor pigtail RF memakai isolasi karet butyl waterproof 3 lapis.",
      "tip": "Mencegah air hujan merembes masuk ke pin emas kabel koaksial yang memicu korosi redaman."
    }
  ],
  "quiz": [
    {
      "id": "qz-12-01",
      "question": "Berapakah persentase minimal zona Fresnel pertama yang wajib bersih dari rintangan pohon dan gedung?",
      "type": "choice",
      "options": ["Minimal 60%", "Cukup 10%", "Harus 100% tanpa celah", "Zona Fresnel tidak berpengaruh"],
      "answer": 0,
      "explanation": "Standar industri telekomunikasi mensyaratkan minimal 60% zona Fresnel pertama bebas dari rintangan fisik untuk menghindari degradasi sinyal yang parah."
    },
    {
      "id": "qz-12-02",
      "question": "Nilai kekuatan sinyal RSSI nirkabel manakah yang dianggap sangat bagus dan stabil untuk link outdoor?",
      "type": "choice",
      "options": ["-55 dBm sampai -65 dBm", "-95 dBm", "Plus 50 dBm", "0 dBm"],
      "answer": 0,
      "explanation": "Rentang sinyal antara -50 dBm hingga -65 dBm adalah zona ideal yang menghasilkan modulasi kecepatan tertinggi tanpa membuat penerima mengalami saturasi."
    }
  ],
  "summary3Points": [
    "Pastikan jalur Line of Sight bersih dengan clearance zona Fresnel minimal 60% bebas halangan pohon.",
    "Lindungi perangkat outdoor dengan grounding tembaga dan bungkus konektor RF memakai isolasi karet anti air.",
    "Kunci kekuatan sinyal di rentang -55 hingga -65 dBm untuk menjaga kestabilan transfer data saat cuaca hujan."
  ]
}
```

---

## 4. Cara Menambah Entri ke `manifest.json`

Tambahkan entri metadata berikut ke dalam array `modules` di `content/manifest.json`:

```json
{
  "id": "module-12",
  "order": 12,
  "title": "Jaringan Nirkabel",
  "badge": "Transmisi Radio",
  "desc": "Kalkulasi zona Fresnel, pointing radio outdoor, dan isolasi cuaca pigtail.",
  "duration": "30 Menit",
  "icon": "wifi"
}
```

Simpan file, dan modul baru kamu akan seketika tersedia secara offline untuk seluruh teknisi!
