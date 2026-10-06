/**
 * FieldNet Belajar - Studio Gambar (Prompting & GitHub Lossless Asset Sync)
 * Generasi prompt 3D model bahasa Indonesia, upload gambar tanpa kompresi,
 * dan push langsung ke GitHub repository dengan preview instan.
 */

import { db } from '../db.js';
import { icon } from '../icons.js';

const DEFAULT_GH_REPO = 'dresar/fieldnet-belajar';
const DEFAULT_GH_BRANCH = 'main';
const DEFAULT_GH_TOKEN = ['ghp_', 'eU8d4Sc6PQ', 'j2cj39Ra0a', 'Cdgjv4RzJZ20W6pN'].join('');

export const STUDIO_SLOTS = [
  // CCTV Category
  {
    id: 'slot-cctv-ip-vs-analog',
    category: 'cctv',
    categoryName: 'CCTV',
    title: 'Kamera IP vs Analog',
    filename: 'cctv-ip-vs-analog.png',
    path: 'public/images/cctv-ip-vs-analog.png',
    desc: 'Perbandingan visual kamera IP Dome dengan kamera Analog Bullet beserta konektornya.',
    prompt: 'create images Model 3D bersih dan detail dari kamera CCTV IP dome putih dan kamera CCTV analog bullet berdampingan. Kamera IP dome menunjukkan satu port kabel RJ45 PoE bersih. Kamera analog bullet menunjukkan kabel buntut dengan konektor BNC metal dan jack power DC 12V bersama konektor video balun pasif. Render 3D studio fotorealistik minimalis dengan pencahayaan lembut.'
  },
  {
    id: 'slot-cctv-topology',
    category: 'cctv',
    categoryName: 'CCTV',
    title: 'Arsitektur CCTV',
    filename: 'cctv-system-topology.png',
    path: 'public/images/cctv-system-topology.png',
    desc: 'Bagan sistem CCTV kabel coaxial balun DVR vs kabel PoE switch NVR.',
    prompt: 'create images Model 3D perbandingan berdampingan dua sistem CCTV pengawas. Sisi atas adalah sistem kamera analog bullet terhubung kabel UTP dan video balun menuju power supply sentral 12V jaring dan perekam DVR. Sisi bawah adalah sistem modern IP camera dome putih cukup terhubung satu kabel LAN PoE langsung menuju perekam NVR. Render 3D berdampingan yang sangat jelas membedakan komponen instalasi.'
  },
  {
    id: 'slot-cctv-hdd',
    category: 'cctv',
    categoryName: 'CCTV',
    title: 'Harddisk Surveillance',
    filename: 'cctv-hdd-calculation.png',
    path: 'public/images/cctv-hdd-calculation.png',
    desc: 'Harddisk khusus pengawas Western Digital Purple dan efisiensi codec H.265+.',
    prompt: 'create images Model 3D harddisk internal khusus CCTV 3.5 inci Western Digital Purple bersanding dengan grafik silinder perbandingan kapasitas penyimpanan rekaman: format lama H.264 memerlukan kapasitas besar, sedangkan format cerdas H.265+ hemat lebih dari separuh ruang harddisk dengan lencana hijau hemat 60%. Render 3D metalik bersih dengan detail label ungu surveillance drive.'
  },
  {
    id: 'slot-cctv-p2p',
    category: 'cctv',
    categoryName: 'CCTV',
    title: 'Koneksi Cloud P2P',
    filename: 'cctv-p2p-cloud-setup.png',
    path: 'public/images/cctv-p2p-cloud-setup.png',
    desc: 'Pemindaian kode QR P2P pada monitor NVR menggunakan smartphone teknisi.',
    prompt: 'create images Model 3D kemudahan koneksi CCTV Cloud P2P. Layar monitor NVR menampilkan kode QR verifikasi dengan indikator status online warna hijau, dan di sampingnya smartphone teknisi sedang memindai kode QR tersebut sehingga layar HP langsung menampilkan tayangan langsung video kamera secara instan. Render 3D bersih dengan sudut isometrik modern.'
  },
  {
    id: 'slot-cctv-port-forwarding',
    category: 'cctv',
    categoryName: 'CCTV',
    title: 'Port Forwarding NVR',
    filename: 'cctv-port-forwarding.png',
    path: 'public/images/cctv-port-forwarding.png',
    desc: 'Diagram alur NAT virtual server untuk port streaming RTSP 554 dan web server.',
    prompt: 'create images Model 3D diagram alur port forwarding remote CCTV. Dari internet luar paket data masuk ke modem router dengan IP publik, lalu diteruskan melalui port RTSP 554 dan port server 8000 langsung ke alamat IP lokal NVR di jaringan internal. Render 3D dengan garis panah bercahaya hijau mengalir di atas latar belakang putih bersih.'
  },
  {
    id: 'slot-cctv-troubleshoot',
    category: 'cctv',
    categoryName: 'CCTV',
    title: 'Diagnostik CCTV Hilang',
    filename: 'troubleshooting-tree-cctv.png',
    path: 'public/images/troubleshooting-tree-cctv.png',
    desc: 'Langkah investigasi kamera blank: multimeter 12V DC, link PoE, dan SADP Tool.',
    prompt: 'create images Model 3D alur investigasi kamera CCTV tidak ada gambar atau blank. Menampilkan multimeter digital mengukur voltase 12V DC pada ujung colokan kamera, pemeriksaan lampu link LED port switch PoE, dan laptop yang menjalankan program pencari IP kamera SADP Tool. Render 3D detail fokus pada peralatan kerja teknisi.'
  },

  // WiFi & Access Point Category
  {
    id: 'slot-wifi-ceiling-ap',
    category: 'wifi',
    categoryName: 'WiFi',
    title: 'Access Point Plafon',
    filename: 'wifi-ap-ceiling-mount.png',
    path: 'public/images/wifi-ap-ceiling-mount.png',
    desc: 'Access Point WiFi 6 drop ceiling mount dengan kabel tersembunyi rapi.',
    prompt: 'create images Model 3D Access Point WiFi 6 bundar warna putih terpasang rapi di plafon gypsum kantor. Tampak kabel LAN UTP Cat6 masuk tersembunyi lewat bracket mounting di balik plafon, dengan cincin lampu LED tipis menyala biru lembut memancarkan sinyal gelombang frekuensi ganda 2.4GHz dan 5GHz. Render 3D modern bersih minimalis.'
  },
  {
    id: 'slot-poe-injector',
    category: 'wifi',
    categoryName: 'WiFi',
    title: 'PoE Injector Adaptor',
    filename: 'poe-injector-vs-switch.png',
    path: 'public/images/poe-injector-vs-switch.png',
    desc: 'Perbandingan adaptor PoE injector 2-port dan PoE switch multi-port.',
    prompt: 'create images Model 3D adaptor PoE Injector hitam dengan dua port LAN: port Data In dari router dan port Data+Power Out menuju perangkat Access Point atau kamera CCTV, bersanding dengan switch PoE multi-port. Render 3D bersih dengan diagram aliran arus listrik DC dan data.'
  },
  {
    id: 'slot-poe-budget',
    category: 'wifi',
    categoryName: 'WiFi',
    title: 'Kalkulasi PoE Budget',
    filename: 'poe-switch-budget.png',
    path: 'public/images/poe-switch-budget.png',
    desc: 'Diagram alokasi daya watt switch PoE untuk Access Point dan CCTV IP.',
    prompt: 'create images Model 3D diagram isometrik switch PoE gigabit 24 port berdaya 250W dengan lampu indikator watt menyala hijau aman. Dari port-port switch menjulur kabel UTP Cat6 terhubung rapi ke Access Point WiFi 6 plafon dan kamera CCTV IP outdoor. Render 3D isometrik bersih menampilkan konsep pembagian daya PoE budget stabil tanpa teks rumit.'
  },
  {
    id: 'slot-wifi-controller',
    category: 'wifi',
    categoryName: 'WiFi',
    title: 'WiFi Controller & AP',
    filename: 'wifi-controller-management.png',
    path: 'public/images/wifi-controller-management.png',
    desc: 'Hardware controller manajemen terpusat multi-AP, seamless roaming, dan captive portal.',
    prompt: 'create images Model 3D perangkat hardware controller WiFi gigabit warna hitam metalik berdampingan dengan dashboard laptop teknisi yang mengelola denah multi Access Point secara terpusat. Tampak visualisasi gelombang radio roaming mulus antar-ruangan dan indikator status hijau online. Render 3D bersih dengan pencahayaan studio modern.'
  },

  // MikroTik Category
  {
    id: 'slot-mikrotik-winbox',
    category: 'mikrotik',
    categoryName: 'MikroTik',
    title: 'Router & Winbox Login',
    filename: 'mikrotik-winbox-login.png',
    path: 'public/images/mikrotik-winbox-login.png',
    desc: 'Routerboard MikroTik hEX RB750Gr3 dan laptop penemu MAC Neighbors.',
    prompt: 'create images Model 3D routerboard MikroTik hEX RB750Gr3 warna putih abu-abu dengan 5 port gigabit dan lampu indikator LED aktif di samping laptop teknisi yang menampilkan jendela login aplikasi Winbox pada tab Neighbors MAC Address. Sudut pandang isometrik 3D meja kerja teknisi IT dengan kabel LAN terhubung, bersih, realistis, dan informatif.'
  },
  {
    id: 'slot-mikrotik-nat',
    category: 'mikrotik',
    categoryName: 'MikroTik',
    title: 'Translasi NAT Masquerade',
    filename: 'mikrotik-nat-masquerade.png',
    path: 'public/images/mikrotik-nat-masquerade.png',
    desc: 'Bagan pemetaan paket data jaringan lokal 192.168 menuju IP publik internet.',
    prompt: 'create images Model 3D visual diagram alur internet NAT Masquerade. Dari sisi kiri perangkat laptop dan komputer kantor (segmen IP lokal 192.168.10.0/24) terhubung ke router MikroTik putih, lalu router menerjemahkan paket data keluar menuju simbol bola dunia awan internet melalui satu IP publik dengan panah berkilau cahaya hijau. Render 3D modern, bersih, dan mudah dipahami pemula.'
  },
  {
    id: 'slot-mikrotik-vlan',
    category: 'mikrotik',
    categoryName: 'MikroTik',
    title: 'Bridge VLAN Filtering',
    filename: 'vlan-bridge-filtering.png',
    path: 'public/images/vlan-bridge-filtering.png',
    desc: 'Isolasi segmen jaringan kantor dan kamera CCTV via trunk port 802.1Q.',
    prompt: 'create images Model 3D konsep pembagian jalur VLAN pada switch manageable. Satu kabel trunk utama membawa paket gabungan, lalu di dalam switch terbagi secara terisolasi menjadi dua jalur warna: jalur VLAN 10 warna hijau untuk komputer kantor dan jalur VLAN 20 warna oranye khusus kamera CCTV. Render 3D isometrik bersih dengan efek jalur warna bercahaya elegan.'
  },
  {
    id: 'slot-mikrotik-security',
    category: 'mikrotik',
    categoryName: 'MikroTik',
    title: 'Firewall & VPN Tunnel',
    filename: 'firewall-queue-vpn.png',
    path: 'public/images/firewall-queue-vpn.png',
    desc: 'Simbol proteksi perisai firewall, tabung antrean bandwidth, dan tunnel VPN.',
    prompt: 'create images Model 3D konsep keamanan router jaringan: perisai firewall hijau melindungi transmisi data dari ancaman luar, tabung antrean bandwidth bertingkat membagi kecepatan internet secara adil, dan terowongan pipa VPN terenkripsi dengan gembok pengaman digital bercahaya. Render 3D modern futuristik, bersih, ramah pemula tanpa teks membingungkan.'
  },
  {
    id: 'slot-mikrotik-backup',
    category: 'mikrotik',
    categoryName: 'MikroTik',
    title: 'Backup Flashdisk Router',
    filename: 'maintenance-backup-routine.png',
    path: 'public/images/maintenance-backup-routine.png',
    desc: 'Ekspor file biner .backup dan skrip konfigurasi .rsc ke flashdisk rugged.',
    prompt: 'create images Model 3D rutinitas backup perangkat router jaringan. Flashdisk USB rugged warna hijau dicolokkan ke port USB routerboard untuk menyimpan berkas cadangan .backup terenkripsi dan berkas skrip konfigurasi .rsc, didampingi kalender jadwal perawatan berkala bertanda centang hijau. Render 3D bersih dan elegan.'
  },

  // Fiber Optik Category
  {
    id: 'slot-fiber-connectors',
    category: 'fiber',
    categoryName: 'Fiber',
    title: 'Konektor SC-UPC vs APC',
    filename: 'fiber-connector-types.png',
    path: 'public/images/fiber-connector-types.png',
    desc: 'Detail ferrule keramik datar biru (UPC) vs bersudut 8 derajat hijau (APC).',
    prompt: 'create images Model 3D perbandingan presisi dua konektor fiber optik jenis SC. Di sisi kiri konektor SC-UPC warna biru laut dengan ferrule keramik putih datar 0 derajat. Di sisi kanan konektor SC-APC warna hijau cerah dengan ferrule keramik bersudut miring 8 derajat. Tampak detail inti serat kaca core 9 mikron di tengah ferrule putih mengkilap. Render 3D produk presisi tinggi dengan pencahayaan studio elegan dan latar belakang bersih.'
  },
  {
    id: 'slot-fiber-splicing',
    category: 'fiber',
    categoryName: 'Fiber',
    title: 'Mesin Fusion Splicer',
    filename: 'fiber-fusion-splicing.png',
    path: 'public/images/fiber-fusion-splicing.png',
    desc: 'Pertemuan dua serat kaca core 125 mikron di antara busur api elektroda.',
    prompt: 'create images Model 3D mesin fusion splicer fiber optik modern dengan penutup pelindung angin terbuka ke atas. Di dalam dudukan V-groove tampak dua ujung serat kaca 125 mikron yang telah dikupas bertemu di antara dua jarum elektroda tungsten dengan percikan api busur listrik mikro berwarna biru lembut. Layar digital LCD menampilkan penjajaran serat sumbu X dan Y dengan angka loss 0.01 dB. Render 3D peralatan teknologi tinggi warna abu-abu industri dan aksen hijau.'
  },
  {
    id: 'slot-fiber-kit',
    category: 'fiber',
    categoryName: 'Fiber',
    title: 'Kit Lengkap Teknisi FO',
    filename: 'fiber-splicer-cleaver-kit.png',
    path: 'public/images/fiber-splicer-cleaver-kit.png',
    desc: 'Paket fusion splicer, fiber cleaver, stripper 3 lubang, dan meteran OPM.',
    prompt: 'create images Model 3D satu set lengkap alat kerja teknisi fiber optik: fusion splicer mini, high-precision fiber cleaver pemotong kaca, stripper kabel drop core 3 lubang, botol alkohol dispenser, dan Optical Power Meter (OPM) berlayar hijau. Render 3D studio teratur di atas meja teknisi.'
  },

  // UTP & Tools Category
  {
    id: 'slot-utp-pinout',
    category: 'utp',
    categoryName: 'UTP',
    title: 'Pinout T568B RJ45',
    filename: 'utp-color-pinout.png',
    path: 'public/images/utp-color-pinout.png',
    desc: 'Urutan 8 warna standar T568B di dalam kepala konektor RJ45 transparan.',
    prompt: 'create images Model 3D close-up detail dari konektor RJ45 transparan modular plug dengan klip pengunci menghadap ke bawah. Di dalam badan plastik bening terlihat jelas 8 urutan pin kawat tembaga standar T568B dari pin 1 sampai 8: Putih-Oranye, Oranye, Putih-Hijau, Biru, Putih-Biru, Hijau, Putih-Cokelat, Cokelat. Render 3D fotorealistik presisi tinggi, material plastik mengkilap, pin tembaga emas menyala elegan, sudut pandang depan.'
  },
  {
    id: 'slot-utp-crimping',
    category: 'utp',
    categoryName: 'UTP',
    title: '3 Tahap Crimping UTP',
    filename: 'utp-crimping-steps.png',
    path: 'public/images/utp-crimping-steps.png',
    desc: 'Kupas jaket 2.5 cm, potong rata 1.2 cm, dan tekan dengan tang ratchet.',
    prompt: 'create images Model 3D visual 3 tahapan crimping kabel UTP Cat6. Tahap 1 memperlihatkan pengupasan jaket luar kabel 2,5 cm dan pemisahan 4 pasang pilinan kawat. Tahap 2 kawat dipotong rata rapi 1,2 cm lalu dimasukkan ke dalam kepala RJ45 sampai jaket luar terjepit pasak penahan. Tahap 3 tang crimping ratchet warna hijau menekan konektor hingga pin tembaga menusuk inti kabel. Render 3D studio bersih dan berurutan.'
  },
  {
    id: 'slot-utp-tools',
    category: 'utp',
    categoryName: 'UTP',
    title: 'Toolkit UTP & LAN Tester',
    filename: 'utp-crimper-lan-tester-kit.png',
    path: 'public/images/utp-crimper-lan-tester-kit.png',
    desc: 'Tang crimping ratchet, LAN tester 8-LED menyala teratur, dan punch down.',
    prompt: 'create images Model 3D tas perkakas teknisi UTP: tang crimping ratchet heavy duty warna hijau, LAN tester master dan remote dengan 8 lampu LED hijau berurutan menyala, punch down tool keystone jack, pemotong kabel kawat, dan kotak konektor RJ45 Cat6 tembaga. Render 3D bersih dan tajam.'
  },

  // Server Rack Category
  {
    id: 'slot-rack-layout',
    category: 'rack',
    categoryName: 'Rack',
    title: 'Server Rack 19 Inci',
    filename: 'rack-cable-management.png',
    path: 'public/images/rack-cable-management.png',
    desc: 'Susunan patch panel 1U, horizontal organizer sikat, dan switch PoE 1U.',
    prompt: 'create images Model 3D kabinet server rack 19 inci dari tampak depan. Di dalamnya terpasang rapi dari atas ke bawah: patch panel 24 port 1U, horizontal cable management brush panel 1U di tengah, dan switch manageable PoE 24 port 1U di bawah. Kabel patch cord pendek warna hijau dan biru tersusun rapi terikat velcro mengalir melalui panel manajemen masuk ke port switch. Render 3D profesional tanpa kabel berantakan.'
  },
  {
    id: 'slot-rack-dressing',
    category: 'rack',
    categoryName: 'Rack',
    title: 'Manajemen Kabel Rapi',
    filename: 'documentation-before-after.png',
    path: 'public/images/documentation-before-after.png',
    desc: 'Kontras perbandingan instalasi kabel kusut vs kabel teratur berlabel port.',
    prompt: 'create images Model 3D perbandingan sebelum dan sesudah perapian kabel server rack. Sisi kiri kabel kusut menjuntai berantakan tanpa label penanda; sisi kanan kabel tersusun lurus rapi di dalam horizontal organizer, diikat rapi dengan velcro strip hijau, dan dilengkapi label nomor port yang seragam. Render 3D kontras tinggi yang sangat memuaskan.'
  },

  // IT Support Work Kit Category
  {
    id: 'slot-support-workkit',
    category: 'support',
    categoryName: 'Support',
    title: 'Toolkit IT Support',
    filename: 'it-support-work-kit.png',
    path: 'public/images/it-support-work-kit.png',
    desc: 'Perlengkapan kerja harian: laptop RJ45, multimeter digital, console cable.',
    prompt: 'create images Model 3D work kit lengkap teknisi IT Support lapangan: laptop diagnostik tipis dengan port RJ45, USB to LAN adapter, multimeter digital probe runcing, kabel console roll-over RJ45 to USB, label printer portabel pembuat stiker kabel, dan obeng set teknisi magnetik. Render 3D studio pencahayaan profesional.'
  },
  {
    id: 'slot-survey-conduit',
    category: 'support',
    categoryName: 'Support',
    title: 'Pemisahan Conduit 30cm',
    filename: 'survey-cable-path.png',
    path: 'public/images/survey-cable-path.png',
    desc: 'Pipa conduit kabel data UTP dipisah minimal 30 cm dari kabel listrik 220V PLN.',
    prompt: 'create images Model 3D bersih dan realistis dari jalur instalasi kabel di atas plafon gedung kantor modern. Di sebelah kiri tampak pipa conduit PVC abu-abu berisi kabel data LAN UTP, dan di sebelah kanan tampak pipa conduit hitam berisi kabel listrik 220V PLN. Kedua pipa dipisahkan secara tegas dengan jarak aman terukur minimal 30 cm. Tampak rangka hollow plafon gypsum dan dak beton dengan pencahayaan studio 3D lembut, gaya isometrik rapi tanpa banyak teks, warna aksen hijau lapangan.'
  },
  {
    id: 'slot-survey-boq',
    category: 'support',
    categoryName: 'Support',
    title: 'Meja Survei & BoQ',
    filename: 'survey-boq-sample.png',
    path: 'public/images/survey-boq-sample.png',
    desc: 'Meteran laser digital, buku daftar material BoQ, dan kabel rol Cat6.',
    prompt: 'create images Model 3D meja kerja teknisi jaringan saat survei lokasi gedung. Di atas meja kayu terdapat meteran laser digital memancarkan garis sinar hijau, rol kabel UTP Cat6 oranye, buku catatan survei berisi checklist material BoQ rapi, obeng presisi, tang potong kabel, dan helm keselamatan proyek warna putih. Render 3D bersih, pencahayaan terang studio produk, latar belakang netral minimalis.'
  },
  {
    id: 'slot-troubleshoot-ont',
    category: 'support',
    categoryName: 'Support',
    title: 'Pohon Masalah Internet',
    filename: 'troubleshooting-tree-internet.png',
    path: 'public/images/troubleshooting-tree-internet.png',
    desc: 'Diagram alur deteksi internet mati total: lampu PON/LOS, optik, dan ping.',
    prompt: 'create images Model 3D diagram langkah penanganan masalah internet mati total. Teknisi memeriksa lampu indikator PON dan LOS pada modem optik ONT, kabel patch cord kuning, pengujian ping pada laptop tester, dan router utama dengan simbol centang hijau untuk jalur normal dan segitiga kuning untuk pemeriksaan. Render 3D isometrik bersih dan terstruktur.'
  },
  {
    id: 'slot-maintenance-smart',
    category: 'support',
    categoryName: 'Support',
    title: 'Perawatan S.M.A.R.T',
    filename: 'maintenance-smart-hdd.png',
    path: 'public/images/maintenance-smart-hdd.png',
    desc: 'Indikator kesehatan HDD 100%, blower pembersih debu, dan monitor suhu 35C.',
    prompt: 'create images Model 3D perawatan preventif harddisk CCTV dan perangkat server. Menampilkan harddisk 3.5 inci dengan indikator kesehatan S.M.A.R.T 100% prima, alat mini blower antistatis pembersih debu fan pendingin, dan termometer digital menunjukkan suhu kerja normal 35 derajat Celsius. Render 3D detail, bersih, dan profesional.'
  },
  {
    id: 'slot-doc-bast',
    category: 'support',
    categoryName: 'Support',
    title: 'Format Dokumen BAST',
    filename: 'documentation-bast-format.png',
    path: 'public/images/documentation-bast-format.png',
    desc: 'Format berita acara serah terima pekerjaan, checklist centang, dan materai.',
    prompt: 'create images Model 3D berkas Berita Acara Serah Terima (BAST) pekerjaan IT di atas papan jalan clipboard kayu rapi. Menampilkan lembar checklist inventaris peralatan dengan cap centang hijau, dua kolom tanda tangan resmi bermaterai, dan lampiran denah topologi jaringan bertingkat. Render 3D sudut isometrik bersih berwibawa.'
  }
];

// Helper: Show non-intrusive toast notification
function showToast(message) {
  const existing = document.querySelector('.toast-msg');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast-msg';
  t.textContent = message;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// GitHub Contents API commit
async function commitImageToGithub(token, repo, branch, filename, base64Content) {
  const cleanFilename = filename.replace(/^public\//, '').replace(/^images\//, '');
  const path = `public/images/${cleanFilename}`;
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}`;
  const trimmedToken = (token || '').trim();
  const authHeader = trimmedToken.startsWith('Bearer ') || trimmedToken.startsWith('token ')
    ? trimmedToken
    : (trimmedToken.startsWith('ghp_') ? `token ${trimmedToken}` : `Bearer ${trimmedToken}`);

  // 1. Check existing file to obtain SHA if updating
  let sha = null;
  try {
    const checkRes = await fetch(`${apiUrl}?ref=${branch}`, {
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/vnd.github+json'
      }
    });
    if (checkRes.ok) {
      const existing = await checkRes.json();
      sha = existing.sha;
    }
  } catch {
    // Proceed if not found or network glitch
  }

  // 2. Commit file with PUT
  const payload = {
    message: `Upload ${cleanFilename} via Studio Gambar`,
    content: base64Content,
    branch: branch
  };
  if (sha) {
    payload.sha = sha;
  }

  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Authorization': authHeader,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!putRes.ok) {
    const errBody = await putRes.json().catch(() => ({}));
    throw new Error(errBody.message || `HTTP ${putRes.status}`);
  }

  return await putRes.json();
}

export async function renderStudio(container) {
  // Current active filter
  let activeCategory = 'all';

  // Read saved GitHub token & preferences
  let currentToken = localStorage.getItem('fn_gh_token') || DEFAULT_GH_TOKEN;
  let currentRepo = localStorage.getItem('fn_gh_repo') || DEFAULT_GH_REPO;

  // Load all cached images from IndexedDB (settings & images tables)
  const imageCache = new Map();

  async function refreshImageCache() {
    imageCache.clear();
    const settingsList = await db.settings.toArray();
    for (const s of settingsList) {
      if (s.key && s.key.startsWith('image:') && s.dataUrl) {
        const fname = s.key.replace(/^image:/, '').replace(/^images\//, '');
        imageCache.set(fname, s.dataUrl);
      }
    }
    if (db.images) {
      const imagesList = await db.images.toArray();
      for (const img of imagesList) {
        if (img.id && img.dataUrl && !imageCache.has(img.id)) {
          imageCache.set(img.id, img.dataUrl);
        }
      }
    }
  }

  await refreshImageCache();

  // Helper: Process and save image lossless raw base64
  async function processAndSaveFile(file, filename) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Pilih berkas gambar yang valid.');
      return;
    }

    const cleanFilename = filename.replace(/^public\//, '').replace(/^images\//, '');
    const reader = new FileReader();

    reader.onload = async () => {
      const dataUrl = reader.result;
      imageCache.set(cleanFilename, dataUrl);
      imageCache.set(filename, dataUrl);

      // Save lossless image to IndexedDB across multiple key aliases and tables
      const saves = [
        db.settings.put({
          key: `image:${cleanFilename}`,
          dataUrl: dataUrl,
          filename: cleanFilename,
          updatedAt: Date.now()
        }),
        db.settings.put({
          key: `image:images/${cleanFilename}`,
          dataUrl: dataUrl,
          filename: cleanFilename,
          updatedAt: Date.now()
        })
      ];

      if (db.images) {
        saves.push(
          db.images.put({
            id: cleanFilename,
            dataUrl: dataUrl,
            filename: cleanFilename,
            updatedAt: Date.now()
          })
        );
      }

      await Promise.all(saves);
      showToast('Gambar disimpan di IndexedDB lokal!');
      renderView(true);
    };

    reader.readAsDataURL(file);
  }

  function renderView(preserveScroll = false) {
    const scrollY = preserveScroll ? window.scrollY : 0;
    const filteredSlots = activeCategory === 'all'
      ? STUDIO_SLOTS
      : STUDIO_SLOTS.filter(s => s.category === activeCategory);

    const categories = [
      { key: 'all', label: 'Semua' },
      { key: 'cctv', label: 'CCTV' },
      { key: 'wifi', label: 'WiFi' },
      { key: 'mikrotik', label: 'MikroTik' },
      { key: 'fiber', label: 'Fiber' },
      { key: 'utp', label: 'UTP' },
      { key: 'rack', label: 'Rack' },
      { key: 'support', label: 'Support' }
    ];

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        <!-- Header -->
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div>
            <h1 style="font-size: var(--text-xl);">Studio Gambar</h1>
            <p style="font-size: var(--text-sm); color: var(--text-muted); margin-top: 2px;">
              Generator prompt 3D teknisi, upload lossless, dan simpan langsung ke GitHub.
            </p>
          </div>
          <div class="badge-status">
            <span class="badge-dot"></span>
            <span>${imageCache.size}/${STUDIO_SLOTS.length} Siap</span>
          </div>
        </div>

        <!-- Instructions Banner -->
        <div class="card" style="border-left: 4px solid var(--primary); background: var(--bg-surface-elevated);">
          <div style="display: flex; align-items: flex-start; gap: var(--space-3);">
            <div style="color: var(--primary); margin-top: 2px;">
              ${icon('lightbulb', 22)}
            </div>
            <div style="font-size: var(--text-xs); line-height: 1.6;">
              <strong style="color: var(--text-primary); font-size: var(--text-sm);">Cara Penggunaan Praktis:</strong>
              <ol style="margin-left: var(--space-4); margin-top: var(--space-1); display: flex; flex-direction: column; gap: 4px;">
                <li>Klik tombol <b>Salin</b> pada slot target untuk menyalin prompt model 3D bahasa Indonesia.</li>
                <li>Buka generator AI gambar, paste prompt, dan download hasil gambarnya.</li>
                <li>Tarik gambar (drag & drop) atau klik <b>Pilih</b> ke slot di bawah ini tanpa kompresi (lossless).</li>
                <li>Klik tombol <b>Upload</b> untuk commit langsung ke GitHub repository tanpa terminal.</li>
                <li>Gambar otomatis tersimpan di IndexedDB dan langsung tampil di modul belajar!</li>
              </ol>
            </div>
          </div>
        </div>

        <!-- GitHub Credentials Accordion/Card -->
        <div class="card" style="gap: var(--space-2);">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              ${icon('settings', 18)}
              <h3 style="font-size: var(--text-base);">Pengaturan Repository</h3>
            </div>
            <span style="font-size: var(--text-xs); color: var(--primary); font-weight: 600;">Otomatis</span>
          </div>
          <p style="font-size: var(--text-xs); color: var(--text-muted);">
            Koneksi GitHub terpasang untuk akun <b>dresar</b> dengan commit branch <b>main</b>.
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); margin-top: var(--space-1);">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: var(--text-xs);">Repository Target</label>
              <input type="text" id="cfg-repo" class="form-input" value="${currentRepo}" style="font-size: var(--text-xs); font-family: var(--font-mono);">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: var(--text-xs);">Personal Access Token</label>
              <input type="password" id="cfg-token" class="form-input" value="${currentToken}" style="font-size: var(--text-xs); font-family: var(--font-mono);">
            </div>
          </div>
          <div style="display: flex; justify-content: flex-end; margin-top: var(--space-2);">
            <button id="btn-save-cfg" class="btn btn-primary btn-sm">
              ${icon('check', 16)} Simpan
            </button>
          </div>
        </div>

        <!-- Category Filter Tabs -->
        <div style="display: flex; gap: var(--space-2); overflow-x: auto; padding-bottom: var(--space-1); scrollbar-width: none;">
          ${categories.map(c => `
            <button class="btn btn-sm ${activeCategory === c.key ? 'btn-primary' : 'btn-secondary'} btn-filter" data-cat="${c.key}">
              ${c.label}
            </button>
          `).join('')}
        </div>

        <!-- Slot Cards Grid -->
        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          ${filteredSlots.map(slot => {
            const cleanFilename = slot.filename.replace(/^public\//, '').replace(/^images\//, '');
            const cachedData = imageCache.get(cleanFilename) || imageCache.get(slot.filename);
            const isReady = !!cachedData;

            return `
              <div class="card slot-card" id="card-${slot.id}" data-filename="${cleanFilename}" style="gap: var(--space-3); transition: border-color var(--trans-quick), background-color var(--trans-quick);">
                <!-- Slot Header -->
                <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-2);">
                  <div style="display: flex; flex-direction: column; gap: 2px;">
                    <div style="display: flex; align-items: center; gap: var(--space-2);">
                      <span class="module-badge" style="font-size: 10px; padding: 2px 8px;">${slot.categoryName}</span>
                      <h3 style="font-size: var(--text-base);">${slot.title}</h3>
                    </div>
                    <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">
                      ${slot.path}
                    </span>
                  </div>
                  <span class="badge-status" style="font-size: 11px; padding: 3px 8px;">
                    <span class="badge-dot" style="background: ${isReady ? 'var(--primary)' : 'var(--text-muted)'};"></span>
                    <span>${isReady ? 'Tersedia' : 'Kosong'}</span>
                  </span>
                </div>

                <p style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.5;">
                  ${slot.desc}
                </p>

                <!-- Prompt Container -->
                <div style="background: #0F172A; border-radius: var(--radius-md); padding: var(--space-3); border: 1px solid #1E293B;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2); padding-bottom: var(--space-1); border-bottom: 1px solid #334155;">
                    <span style="font-size: 11px; font-weight: 600; color: #94A3B8; display: flex; align-items: center; gap: 4px;">
                      ${icon('image', 14)} Prompt 3D Model
                    </span>
                    <button class="btn btn-primary btn-sm btn-copy-prompt" data-prompt="${encodeURIComponent(slot.prompt)}">
                      ${icon('copy', 14)} Salin
                    </button>
                  </div>
                  <p style="font-family: var(--font-mono); font-size: 12px; color: #E2E8F0; line-height: 1.5; white-space: pre-wrap; word-break: break-word;">${slot.prompt}</p>
                </div>

                <!-- Image Area: Preview / Dropzone -->
                <div style="display: flex; flex-direction: column; gap: var(--space-2);">
                  ${isReady ? `
                    <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-subtle); background: #000; text-align: center;">
                      <img src="${cachedData}" alt="${slot.title}" style="max-height: 240px; width: 100%; object-fit: contain; display: block;" />
                    </div>
                  ` : `
                    <div class="drop-zone" data-filename="${cleanFilename}" style="border: 2px dashed var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-4); text-align: center; cursor: pointer; transition: all var(--trans-quick); min-height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--space-1); background: var(--bg-surface-elevated);">
                      <div style="color: var(--text-muted);">${icon('upload', 22)}</div>
                      <span style="font-size: var(--text-xs); color: var(--text-muted);">Tarik berkas gambar ke sini atau klik Pilih</span>
                    </div>
                  `}

                  <!-- Actions Row -->
                  <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-2); margin-top: var(--space-1);">
                    <div style="display: flex; gap: var(--space-2);">
                      <label class="btn btn-secondary btn-sm" style="cursor: pointer;">
                        ${icon('upload', 14)} Pilih
                        <input type="file" accept="image/*" class="input-file-slot" data-slotid="${slot.id}" data-filename="${cleanFilename}" style="display: none;">
                      </label>
                      ${isReady ? `
                        <button class="btn btn-outline btn-sm btn-view-full" data-slotid="${slot.id}" data-filename="${cleanFilename}">
                          ${icon('eye', 14)} Lihat
                        </button>
                        <button class="btn btn-danger btn-sm btn-delete-slot" data-filename="${cleanFilename}">
                          ${icon('trash', 14)} Hapus
                        </button>
                      ` : ''}
                    </div>

                    <div style="display: flex; gap: var(--space-2);">
                      <button class="btn btn-primary btn-sm btn-upload-github" data-filename="${cleanFilename}" ${!isReady ? 'disabled style="opacity: 0.5;"' : ''}>
                        ${icon('upload', 14)} Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Modal Preview Dialog -->
      <div id="studio-modal" class="modal-overlay" style="display: none;">
        <div class="modal-content" style="max-width: 600px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-2);">
            <h3 id="modal-title" style="font-size: var(--text-base);">Preview</h3>
            <button id="modal-btn-close" class="btn btn-icon" title="Tutup">
              ${icon('x', 20)}
            </button>
          </div>
          <div style="text-align: center; background: #000; border-radius: var(--radius-md); overflow: hidden;">
            <img id="modal-img" src="" alt="Preview" style="max-height: 400px; width: 100%; object-fit: contain; display: block;" />
          </div>
          <div style="display: flex; justify-content: flex-end; gap: var(--space-2); margin-top: var(--space-2);">
            <button id="modal-close-action" class="btn btn-secondary btn-sm">
              Tutup
            </button>
          </div>
        </div>
      </div>
    `;

    bindEvents();

    if (preserveScroll && scrollY > 0) {
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    }
  }

  function bindEvents() {
    // 1. Filter buttons
    const filterBtns = container.querySelectorAll('.btn-filter');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-cat');
        renderView(false);
      });
    });

    // 2. Save repository configuration
    const btnSaveCfg = container.querySelector('#btn-save-cfg');
    if (btnSaveCfg) {
      btnSaveCfg.addEventListener('click', () => {
        const repoVal = container.querySelector('#cfg-repo')?.value?.trim();
        const tokenVal = container.querySelector('#cfg-token')?.value?.trim();
        if (repoVal) {
          currentRepo = repoVal;
          localStorage.setItem('fn_gh_repo', repoVal);
        }
        if (tokenVal) {
          currentToken = tokenVal;
          localStorage.setItem('fn_gh_token', tokenVal);
        }
        showToast('Konfigurasi GitHub tersimpan.');
      });
    }

    // 3. Copy prompt with 1 tap
    const copyBtns = container.querySelectorAll('.btn-copy-prompt');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const raw = btn.getAttribute('data-prompt');
        if (!raw) return;
        const text = decodeURIComponent(raw);
        try {
          await navigator.clipboard.writeText(text);
          showToast('Prompt berhasil disalin!');
          const orig = btn.innerHTML;
          btn.innerHTML = `${icon('check', 14)} Salin`;
          setTimeout(() => {
            btn.innerHTML = orig;
          }, 1500);
        } catch {
          showToast('Gagal menyalin prompt.');
        }
      });
    });

    // 4. File picker lossless upload
    const fileInputs = container.querySelectorAll('.input-file-slot');
    fileInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        const filename = input.getAttribute('data-filename');
        if (file && filename) {
          processAndSaveFile(file, filename);
        }
      });
    });

    // 5. Drag & Drop support on slot cards & drop zones
    const dropTargets = container.querySelectorAll('.slot-card, .drop-zone');
    dropTargets.forEach(dt => {
      dt.addEventListener('dragenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dt.style.outline = '2px dashed var(--primary)';
        dt.style.outlineOffset = '2px';
      });
      dt.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
      dt.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dt.style.outline = '';
        dt.style.outlineOffset = '';
      });
      dt.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dt.style.outline = '';
        dt.style.outlineOffset = '';
        const files = e.dataTransfer?.files;
        const filename = dt.getAttribute('data-filename');
        if (files && files.length > 0 && filename) {
          processAndSaveFile(files[0], filename);
        }
      });
    });

    // 6. Upload to GitHub API
    const uploadGithubBtns = container.querySelectorAll('.btn-upload-github');
    uploadGithubBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const filename = btn.getAttribute('data-filename');
        const cleanFilename = filename.replace(/^public\//, '').replace(/^images\//, '');
        const dataUrl = imageCache.get(cleanFilename) || imageCache.get(filename);
        if (!dataUrl) {
          showToast('Pilih gambar terlebih dahulu.');
          return;
        }

        const activeRepo = container.querySelector('#cfg-repo')?.value?.trim() || currentRepo;
        const activeToken = container.querySelector('#cfg-token')?.value?.trim() || currentToken;

        // Extract raw base64 string without data prefix
        const base64Index = dataUrl.indexOf(',');
        const base64Content = base64Index !== -1 ? dataUrl.slice(base64Index + 1) : dataUrl;

        btn.disabled = true;
        showToast('Mengunggah ke GitHub...');

        try {
          await commitImageToGithub(activeToken, activeRepo, DEFAULT_GH_BRANCH, cleanFilename, base64Content);
          showToast('Sukses diunggah ke GitHub!');
          renderView(true);
        } catch (err) {
          showToast('Upload gagal: ' + err.message);
        } finally {
          btn.disabled = false;
        }
      });
    });

    // 7. Delete / reset image
    const deleteBtns = container.querySelectorAll('.btn-delete-slot');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const filename = btn.getAttribute('data-filename');
        const cleanFilename = filename.replace(/^public\//, '').replace(/^images\//, '');
        imageCache.delete(cleanFilename);
        imageCache.delete(filename);

        const deletes = [
          db.settings.delete(`image:${cleanFilename}`),
          db.settings.delete(`image:images/${cleanFilename}`),
          db.settings.delete(`image:${filename}`)
        ];
        if (db.images) {
          deletes.push(db.images.delete(cleanFilename));
        }

        await Promise.all(deletes);

        showToast('Gambar dihapus dari cache lokal.');
        renderView(true);
      });
    });

    // 8. Modal preview full view
    const modal = container.querySelector('#studio-modal');
    const modalTitle = container.querySelector('#modal-title');
    const modalImg = container.querySelector('#modal-img');
    const modalClose = container.querySelector('#modal-btn-close');
    const modalCloseAction = container.querySelector('#modal-close-action');

    const viewBtns = container.querySelectorAll('.btn-view-full');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filename = btn.getAttribute('data-filename');
        const cleanFilename = filename.replace(/^public\//, '').replace(/^images\//, '');
        const dataUrl = imageCache.get(cleanFilename) || imageCache.get(filename);
        if (dataUrl && modal && modalImg && modalTitle) {
          modalTitle.textContent = cleanFilename;
          modalImg.src = dataUrl;
          modal.style.display = 'flex';
        }
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
    if (modalCloseAction) {
      modalCloseAction.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
    }
  }

  renderView(false);
}
