/**
 * FieldNet Belajar - Interactive Troubleshooting Decision Tree
 * Step-by-step diagnostic tree for Internet Mati, CCTV Blank, and Koneksi RTO.
 */

import { icon } from '../icons.js';

const DECISION_TREES = {
  internet: {
    id: 'internet',
    title: 'Internet Mati',
    btnLabel: 'Internet',
    icon: 'router',
    desc: 'Diagnosa kabel fiber optik, router WAN, IP lease, dan DNS.',
    initialNode: 'node-ont-los',
    nodes: {
      'node-ont-los': {
        question: 'Apakah lampu LOS pada modem ONT berkedip warna merah?',
        yes: 'sol-los-red',
        no: 'node-ont-pon'
      },
      'node-ont-pon': {
        question: 'Apakah lampu PON di modem menyala hijau dan lampu LAN router berkedip normal?',
        yes: 'node-ping-gw',
        no: 'sol-cable-lan'
      },
      'node-ping-gw': {
        question: 'Apakah router berhasil melakukan ping ke IP gateway modem (misal 192.168.1.1)?',
        yes: 'node-ping-8888',
        no: 'sol-router-ip'
      },
      'node-ping-8888': {
        question: 'Apakah router berhasil melakukan ping ke IP DNS publik 8.8.8.8?',
        yes: 'node-ping-dns',
        no: 'sol-nat-route'
      },
      'node-ping-dns': {
        question: 'Apakah ping ke google.com berhasil dari terminal MikroTik?',
        yes: 'node-client-dhcp',
        no: 'sol-dns-setup'
      },
      'node-client-dhcp': {
        question: 'Apakah komputer klien mendapatkan IP lokal otomatis (bukan 169.254.x.x)?',
        yes: 'sol-client-browser',
        no: 'sol-dhcp-pool'
      }
    },
    solutions: {
      'sol-los-red': {
        badge: 'Kerusakan Fisik ISP',
        title: 'Kabel Fiber Putus',
        steps: [
          'Jalur fiber optik luar tidak menerima sinar laser.',
          'Ukur redaman dengan OPM atau cek tekukan tajam drop core.',
          'Hubungi call center atau tiket gangguan NOC ISP.'
        ],
        command: '/interface ethernet monitor ether1 once'
      },
      'sol-cable-lan': {
        badge: 'Masalah Kabel LAN',
        title: 'Link Modem Putus',
        steps: [
          'Port LAN modem atau port ether1 WAN router tidak terhubung.',
          'Periksa apakah adaptor daya modem longgar.',
          'Ganti kabel patch cord antara modem dan router.'
        ],
        command: '/interface ethernet print'
      },
      'sol-router-ip': {
        badge: 'Konfigurasi IP',
        title: 'IP WAN Belum Didapat',
        steps: [
          'Interface ether1 router belum memiliki IP atau DHCP Client mati.',
          'Buka IP -> DHCP Client dan aktifkan interface ether1.',
          'Pastikan status DHCP Client berubah menjadi bound.'
        ],
        command: '/ip dhcp-client add interface=ether1 disabled=no'
      },
      'sol-nat-route': {
        badge: 'Konfigurasi Routing',
        title: 'Routing & NAT Terputus',
        steps: [
          'Paket keluar router belum ditranslasi ke arah publik.',
          'Tambahkan NAT Masquerade dengan out-interface WAN.',
          'Periksa apakah default gateway 0.0.0.0/0 sudah terdaftar di IP Routes.'
        ],
        command: '/ip firewall nat add chain=srcnat out-interface=ether1 action=masquerade'
      },
      'sol-dns-setup': {
        badge: 'Konfigurasi DNS',
        title: 'DNS Resolver Belum Aktif',
        steps: [
          'Koneksi IP angka lancar tetapi nama domain gagal diterjemahkan.',
          'Buka menu IP -> DNS dan masukkan server 8.8.8.8 dan 1.1.1.1.',
          'Centang kotak Allow Remote Requests agar klien bisa bertanya ke router.'
        ],
        command: '/ip dns set allow-remote-requests=yes servers=8.8.8.8,1.1.1.1'
      },
      'sol-dhcp-pool': {
        badge: 'DHCP Lokal',
        title: 'DHCP Pool Habis',
        steps: [
          'Klien mengalami APIPA 169.254.x.x karena DHCP Server gagal merespon.',
          'Periksa apakah kabel LAN switch ke klien terpasang baik.',
          'Periksa apakah rentang IP pool DHCP sudah habis terpakai lease lama.'
        ],
        command: '/ip dhcp-server lease print'
      },
      'sol-client-browser': {
        badge: 'Sisi Pengguna',
        title: 'Proxy Browser Klien',
        steps: [
          'Jaringan router dan internet berjalan sempurna 100%.',
          'Periksa setelan proxy atau antivirus di laptop pengguna.',
          'Lakukan ipconfig /flushdns pada command prompt komputer klien.'
        ],
        command: 'ipconfig /flushdns'
      }
    }
  },

  cctv: {
    id: 'cctv',
    title: 'CCTV Blank',
    btnLabel: 'CCTV',
    icon: 'camera',
    desc: 'Diagnosa tegangan 12V, port switch PoE, IP ONVIF, dan RTSP.',
    initialNode: 'node-cctv-power',
    nodes: {
      'node-cctv-power': {
        question: 'Apakah lampu inframerah / lampu daya kamera menyala saat sensor ditutup?',
        yes: 'node-cctv-link',
        no: 'sol-cctv-power'
      },
      'node-cctv-link': {
        question: 'Apakah lampu link port ethernet di switch atau NVR menyala berkedip?',
        yes: 'node-cctv-ping',
        no: 'sol-cctv-cable'
      },
      'node-cctv-ping': {
        question: 'Apakah IP kamera bisa diping atau terdeteksi di software SADP / IP Scanner?',
        yes: 'node-cctv-nvr',
        no: 'sol-cctv-ip'
      },
      'node-cctv-nvr': {
        question: 'Apakah status kamera di menu Camera Management NVR berstatus Online?',
        yes: 'sol-cctv-codec',
        no: 'sol-cctv-pass'
      }
    },
    solutions: {
      'sol-cctv-power': {
        badge: 'Masalah Daya',
        title: 'Adaptor Drop 12V',
        steps: [
          'Tegangan listrik tidak sampai ke modul kamera.',
          'Ukur dengan multimeter, pastikan tegangan minimal 11.5V DC.',
          'Periksa sekring fuse box power supply jaring sentral.'
        ],
        command: 'Ganti adaptor 12V 2A di dekat kamera.'
      },
      'sol-cctv-cable': {
        badge: 'Masalah Fisik',
        title: 'Kabel Balun Rusak',
        steps: [
          'Data sinyal terputus di tengah tarikan kabel.',
          'Crimping ulang konektor RJ45 atau ganti sepasang video balun.',
          'Uji kabel memakai tester LAN continuity 8 pin.'
        ],
        command: 'Potong dan crimping ulang konektor RJ45.'
      },
      'sol-cctv-ip': {
        badge: 'Jaringan IP',
        title: 'IP Kamera Bentrok',
        steps: [
          'Kamera menyala tetapi berada di segmen subnet yang berbeda.',
          'Gunakan aplikasi SADP untuk memodifikasi IP kamera.',
          'Samakan subnet IP kamera dengan IP port internal NVR.'
        ],
        command: 'Scan kamera via SADP Tool di PC.'
      },
      'sol-cctv-pass': {
        badge: 'Otentikasi',
        title: 'Password Kamera Salah',
        steps: [
          'NVR tidak bisa membuka video karena salah kata sandi.',
          'Klik edit channel di NVR dan masukkan password kamera yang benar.',
          'Pastikan protokol ONVIF Profile S aktif di web browser kamera.'
        ],
        command: 'Sinkronkan user admin & password kamera di NVR.'
      },
      'sol-cctv-codec': {
        badge: 'Format Encoding',
        title: 'Resolusi Tidak Didukung',
        steps: [
          'Kamera online tetapi monitor menampilkan layar hitam.',
          'Resolusi kamera (misal 4K) melebihi batas decoding port HDMI NVR.',
          'Ubah codec dari H.265+ menjadi H.264 standar melalui WebGUI.'
        ],
        command: 'Turunkan resolusi main stream kamera ke 1080p.'
      }
    }
  },

  rto: {
    id: 'rto',
    title: 'Koneksi RTO',
    btnLabel: 'RTO',
    icon: 'alert-triangle',
    desc: 'Diagnosa looping switch, broadcast storm, kabel CRC error, dan queue.',
    initialNode: 'node-rto-blink',
    nodes: {
      'node-rto-blink': {
        question: 'Apakah seluruh lampu port switch berkedip sangat cepat secara serentak?',
        yes: 'sol-loop-storm',
        no: 'node-rto-ping-gw'
      },
      'node-rto-ping-gw': {
        question: 'Apakah ping ke gateway lokal 192.168.1.1 menghasilkan time < 1ms tanpa RTO?',
        yes: 'node-rto-bw',
        no: 'sol-crc-cable'
      },
      'node-rto-bw': {
        question: 'Apakah trafik pemakaian bandwidth di interface WAN mencapai 100% penuh?',
        yes: 'sol-queue-bw',
        no: 'sol-isp-latency'
      }
    },
    solutions: {
      'sol-loop-storm': {
        badge: 'Insiden Fatal',
        title: 'Loop Kabel Switch',
        steps: [
          'Terjadi looping Layer 2 akibat kabel tercolok balik ke switch.',
          'Cabut kabel patch cord satu per satu sampai lampu berkedip normal.',
          'Aktifkan protokol RSTP (Rapid Spanning Tree) pada bridge router.'
        ],
        command: '/interface bridge set [find] protocol-mode=rstp'
      },
      'sol-crc-cable': {
        badge: 'Fisik LAN',
        title: 'Crosstalk & CRC Error',
        steps: [
          'Kabel UTP mengalami kebocoran sinyal atau berdekatan kabel listrik PLN.',
          'Cek kolom Rx Drops dan Frame Errors pada menu Interfaces.',
          'Jauhkan kabel data dari genset dan kabel PLN minimal 30 cm.'
        ],
        command: '/interface ethernet monitor ether2 once'
      },
      'sol-queue-bw': {
        badge: 'Manajemen Trafik',
        title: 'Bandwidth Tercekik',
        steps: [
          'Ada pengguna yang menyedot seluruh kuota pipa internet.',
          'Buka menu Torch untuk melacak alamat IP pengunduh terbesar.',
          'Terapkan Simple Queue dengan batas Max Limit adil.'
        ],
        command: '/tool torch ether1 src-address=192.168.0.0/16'
      },
      'sol-isp-latency': {
        badge: 'Jalur ISP',
        title: 'Paket Loss ISP',
        steps: [
          'Jalur LAN lokal normal tetapi hop router ISP mengalami jitter tinggi.',
          'Jalankan traceroute 8.8.8.8 untuk menemukan titik hop yang RTO.',
          'Laporkan log traceroute ke penyedia internet untuk routing ulang.'
        ],
        command: '/tool traceroute 8.8.8.8'
      }
    }
  }
};

export async function renderTroubleshooter(container, params) {
  let selectedCase = params?.case || 'internet';
  let activeTree = DECISION_TREES[selectedCase] || DECISION_TREES.internet;
  let currentNodeId = activeTree.initialNode;
  let isSolution = false;

  function renderStep() {
    const isCurrentSol = activeTree.solutions[currentNodeId];

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        <!-- Title & Case Tabs -->
        <div>
          <h1>Pohon Masalah</h1>
          <p style="font-size: var(--text-sm); color: var(--text-muted); margin-top: 2px;">
            Panduan pelacakan gangguan lapangan langkah demi langkah.
          </p>
        </div>

        <!-- Case Selector Tabs -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2);">
          ${Object.values(DECISION_TREES).map(t => `
            <button class="btn ${selectedCase === t.id ? 'btn-primary' : 'btn-secondary'} btn-sm btn-select-case" data-case="${t.id}" style="padding: 0 4px;">
              ${t.btnLabel || 'Kasus'}
            </button>
          `).join('')}
        </div>

        <!-- Current Tree Card -->
        ${!isCurrentSol ? `
          <div class="card trouble-card">
            <div style="display: flex; align-items: center; gap: var(--space-2); color: var(--primary);">
              ${icon('alert-triangle', 20)}
              <span style="font-weight: 700; font-size: var(--text-xs); text-transform: uppercase;">
                Pertanyaan Diagnosa
              </span>
            </div>
            
            <h2 style="font-size: var(--text-base); line-height: 1.5;">
              ${activeTree.nodes[currentNodeId]?.question || 'Memeriksa...'}
            </h2>

            <div class="trouble-choice-group">
              <button class="btn btn-primary btn-choice" data-answer="yes">Ya</button>
              <button class="btn btn-secondary btn-choice" data-answer="no">Tidak</button>
            </div>
          </div>
        ` : `
          <!-- Solution Card -->
          <div class="card trouble-card" style="border-left: 4px solid var(--primary); background: var(--bg-surface-elevated);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="module-badge" style="background: var(--primary-surface); color: var(--primary); border-color: var(--primary-border);">
                ${isCurrentSol.badge}
              </span>
              <button id="btn-reset-tree" class="btn btn-outline btn-sm">Reset</button>
            </div>

            <h2 style="font-size: var(--text-lg); color: var(--text-primary);">
              ${isCurrentSol.title}
            </h2>

            <div style="display: flex; flex-direction: column; gap: var(--space-2);">
              <h4 style="font-size: var(--text-sm);">Solusi Tindakan:</h4>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-2);">
                ${isCurrentSol.steps.map(s => `
                  <li style="display: flex; gap: var(--space-2); font-size: var(--text-sm);">
                    <span style="color: var(--primary);">${icon('check', 16)}</span>
                    <span>${s}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            ${isCurrentSol.command ? `
              <div class="code-block" style="margin-top: var(--space-2);">
                <div class="code-header">
                  <span>Perintah Solusi</span>
                  <button class="btn btn-secondary btn-sm btn-copy-sol" data-code="${encodeURIComponent(isCurrentSol.command)}">
                    Salin
                  </button>
                </div>
                <code>${isCurrentSol.command}</code>
              </div>
            ` : ''}
          </div>
        `}
      </div>
    `;

    // Case change buttons
    container.querySelectorAll('.btn-select-case').forEach(btn => {
      btn.addEventListener('click', () => {
        const c = btn.getAttribute('data-case');
        renderTroubleshooter(container, { case: c });
      });
    });

    // Choice buttons
    container.querySelectorAll('.btn-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        const ans = btn.getAttribute('data-answer');
        const nextTarget = activeTree.nodes[currentNodeId]?.[ans];
        if (nextTarget) {
          currentNodeId = nextTarget;
          renderStep();
        }
      });
    });

    // Reset button
    const btnReset = container.querySelector('#btn-reset-tree');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        currentNodeId = activeTree.initialNode;
        renderStep();
      });
    }

    // Copy command button
    const btnCopy = container.querySelector('.btn-copy-sol');
    if (btnCopy) {
      btnCopy.addEventListener('click', async () => {
        const code = decodeURIComponent(btnCopy.getAttribute('data-code') || '');
        await navigator.clipboard.writeText(code);
        btnCopy.textContent = 'Tersalin';
        setTimeout(() => { btnCopy.textContent = 'Salin'; }, 2000);
      });
    }
  }

  renderStep();
}
