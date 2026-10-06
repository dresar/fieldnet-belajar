/**
 * FieldNet Belajar - Daily Report & BAST Generator
 * Generates structured field reports and legal BAST contracts with print stylesheet and PDF export.
 */

import { db } from '../db.js';
import { icon } from '../icons.js';

export async function renderReports(container) {
  let activeTab = 'daily'; // 'daily' or 'bast'
  const savedReports = await db.reports.toArray();
  const savedBasts = await db.bastDocs.toArray();
  let latestRep = savedReports.length > 0 ? savedReports[savedReports.length - 1] : null;
  let latestBast = savedBasts.length > 0 ? savedBasts[savedBasts.length - 1] : null;

  function renderUI() {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        <!-- Title & Subtitle -->
        <div class="no-print">
          <h1>Laporan</h1>
          <p style="font-size: var(--text-sm); color: var(--text-muted); margin-top: 2px;">
            Pembuat laporan kerja harian dan draf Berita Acara Serah Terima.
          </p>
        </div>

        <!-- Mode Tabs -->
        <div class="no-print" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2);">
          <button class="btn ${activeTab === 'daily' ? 'btn-primary' : 'btn-secondary'} btn-tab" data-tab="daily">
            Laporan
          </button>
          <button class="btn ${activeTab === 'bast' ? 'btn-primary' : 'btn-secondary'} btn-tab" data-tab="bast">
            BAST
          </button>
        </div>

        <!-- Daily Report Form -->
        ${activeTab === 'daily' ? `
          <div class="card no-print">
            <h3 style="font-size: var(--text-base);">Formulir Laporan</h3>
            
            <div class="form-group">
              <label class="form-label">Tanggal Pelaksanaan</label>
              <input type="date" id="rep-date" class="form-input" value="${latestRep?.date || new Date().toISOString().split('T')[0]}">
            </div>

            <div class="form-group">
              <label class="form-label">Nama Teknisi</label>
              <input type="text" id="rep-tech" class="form-input" value="${latestRep?.tech || 'Teknisi Lapangan'}">
            </div>

            <div class="form-group">
              <label class="form-label">Nama Lokasi / Site</label>
              <input type="text" id="rep-site" class="form-input" value="${latestRep?.site || 'Site Gedung Klien'}">
            </div>

            <div class="form-group">
              <label class="form-label">Pekerjaan Selesai</label>
              <textarea id="rep-work" class="form-textarea">${latestRep?.work || 'Instalasi rack server, penarikan kabel UTP Cat6, dan konfigurasi router MikroTik.'}</textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Material Terpakai</label>
              <textarea id="rep-mat" class="form-textarea">${latestRep?.mat || '1 Roll Kabel Cat6, 16 pcs RJ45, 1 patch panel 24 port.'}</textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Kendala & Solusi</label>
              <textarea id="rep-issues" class="form-textarea">${latestRep?.issues || 'Pekerjaan selesai sesuai standar tanpa kendala fisik.'}</textarea>
            </div>

            <div style="display: flex; gap: var(--space-2); margin-top: var(--space-2);">
              <button id="btn-save-report" class="btn btn-primary" style="flex: 1;">Simpan</button>
              <button id="btn-print-report" class="btn btn-secondary" style="flex: 1;">Cetak</button>
            </div>
          </div>
        ` : `
          <!-- BAST Form -->
          <div class="card no-print">
            <h3 style="font-size: var(--text-base);">Formulir BAST</h3>

            <div class="form-group">
              <label class="form-label">Nomor Surat BAST</label>
              <input type="text" id="bast-no" class="form-input" value="${latestBast?.no || `BAST/FN/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/001`}">
            </div>

            <div class="form-group">
              <label class="form-label">Pihak Pertama (Pelaksana)</label>
              <input type="text" id="bast-p1" class="form-input" value="${latestBast?.p1 || 'Teknisi Pelaksana (FieldNet Engineering)'}">
            </div>

            <div class="form-group">
              <label class="form-label">Pihak Kedua (Klien / Pemberi Kerja)</label>
              <input type="text" id="bast-p2" class="form-input" value="${latestBast?.p2 || 'Penanggung Jawab Site (Pemberi Kerja)'}">
            </div>

            <div class="form-group">
              <label class="form-label">Rincian Perangkat & Jasa</label>
              <textarea id="bast-items" class="form-textarea">${latestBast?.items || '- 1 Unit Router MikroTik terpasang\n- 8 Unit Kamera IP PoE 1080p\n- 1 Unit NVR + HDD 4TB\n- Uji commissioning seluruh perangkat normal'}</textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Masa Garansi (Hari)</label>
              <input type="number" id="bast-warranty" class="form-input" value="${latestBast?.warranty || '90'}">
            </div>

            <div style="display: flex; gap: var(--space-2); margin-top: var(--space-2);">
              <button id="btn-save-bast" class="btn btn-primary" style="flex: 1;">Simpan</button>
              <button id="btn-print-bast" class="btn btn-secondary" style="flex: 1;">Cetak</button>
            </div>
          </div>
        `}

        <!-- Printable Document Output Container -->
        <div id="print-area" class="card print-document" style="border: 1px solid var(--border-subtle); background: var(--bg-surface);">
          ${renderDocumentPreview()}
        </div>
      </div>
    `;

    // Tab buttons
    container.querySelectorAll('.btn-tab').forEach(b => {
      b.addEventListener('click', () => {
        activeTab = b.getAttribute('data-tab');
        renderUI();
      });
    });

    // Save Daily Report
    const btnSaveRep = container.querySelector('#btn-save-report');
    if (btnSaveRep) {
      btnSaveRep.addEventListener('click', async () => {
        const item = {
          date: container.querySelector('#rep-date').value,
          tech: container.querySelector('#rep-tech').value,
          site: container.querySelector('#rep-site').value,
          work: container.querySelector('#rep-work').value,
          mat: container.querySelector('#rep-mat').value,
          issues: container.querySelector('#rep-issues').value,
          createdAt: latestRep?.createdAt || Date.now()
        };
        if (latestRep?.id) item.id = latestRep.id;
        const savedId = await db.reports.put(item);
        if (!item.id && savedId) item.id = savedId;
        latestRep = item;
        btnSaveRep.textContent = 'Tersimpan';
        setTimeout(() => { btnSaveRep.textContent = 'Simpan'; }, 1500);
        updatePrintPreview();
      });
    }

    // Print Daily Report
    const btnPrintRep = container.querySelector('#btn-print-report');
    if (btnPrintRep) {
      btnPrintRep.addEventListener('click', () => {
        updatePrintPreview();
        window.print();
      });
    }

    // Save BAST
    const btnSaveBast = container.querySelector('#btn-save-bast');
    if (btnSaveBast) {
      btnSaveBast.addEventListener('click', async () => {
        const item = {
          no: container.querySelector('#bast-no').value,
          p1: container.querySelector('#bast-p1').value,
          p2: container.querySelector('#bast-p2').value,
          items: container.querySelector('#bast-items').value,
          warranty: container.querySelector('#bast-warranty').value,
          createdAt: latestBast?.createdAt || Date.now()
        };
        if (latestBast?.id) item.id = latestBast.id;
        const savedId = await db.bastDocs.put(item);
        if (!item.id && savedId) item.id = savedId;
        latestBast = item;
        btnSaveBast.textContent = 'Tersimpan';
        setTimeout(() => { btnSaveBast.textContent = 'Simpan'; }, 1500);
        updatePrintPreview();
      });
    }

    // Print BAST
    const btnPrintBast = container.querySelector('#btn-print-bast');
    if (btnPrintBast) {
      btnPrintBast.addEventListener('click', () => {
        updatePrintPreview();
        window.print();
      });
    }

    // Live update preview on inputs change
    container.querySelectorAll('input, textarea').forEach(inp => {
      inp.addEventListener('input', updatePrintPreview);
    });
  }

  function updatePrintPreview() {
    const area = container.querySelector('#print-area');
    if (area) {
      area.innerHTML = renderDocumentPreview();
    }
  }

  function renderDocumentPreview() {
    if (activeTab === 'daily') {
      const date = container.querySelector('#rep-date')?.value || new Date().toISOString().split('T')[0];
      const tech = container.querySelector('#rep-tech')?.value || 'Teknisi Lapangan';
      const site = container.querySelector('#rep-site')?.value || 'Site Gedung Klien';
      const work = container.querySelector('#rep-work')?.value || 'Instalasi rack server, penarikan kabel UTP Cat6, dan konfigurasi MikroTik.';
      const mat = container.querySelector('#rep-mat')?.value || '1 Roll Kabel Cat6, 16 pcs RJ45, 1 patch panel 24 port.';
      const issues = container.querySelector('#rep-issues')?.value || 'Pekerjaan selesai sesuai standar tanpa kendala fisik.';

      return `
        <div class="print-header">
          <div class="print-title">Laporan Kerja Lapangan</div>
          <p>FieldNet Belajar - Technical Site Report</p>
        </div>
        <table class="print-table">
          <tr>
            <th style="width: 25%;">Tanggal</th>
            <td>${date}</td>
          </tr>
          <tr>
            <th>Teknisi</th>
            <td>${tech}</td>
          </tr>
          <tr>
            <th>Lokasi / Site</th>
            <td>${site}</td>
          </tr>
          <tr>
            <th>Pekerjaan Selesai</th>
            <td style="white-space: pre-wrap;">${work}</td>
          </tr>
          <tr>
            <th>Material Terpakai</th>
            <td style="white-space: pre-wrap;">${mat}</td>
          </tr>
          <tr>
            <th>Kendala & Solusi</th>
            <td style="white-space: pre-wrap;">${issues}</td>
          </tr>
        </table>
        <div class="print-signatures">
          <div class="print-sig-box">
            <div>Teknisi Pelaksana</div>
            <div class="print-sig-line">${tech}</div>
          </div>
          <div class="print-sig-box">
            <div>Pengawas Lapangan</div>
            <div class="print-sig-line">Penanggung Jawab Site</div>
          </div>
        </div>
      `;
    } else {
      const no = container.querySelector('#bast-no')?.value || 'BAST/FN/2026/001';
      const p1 = container.querySelector('#bast-p1')?.value || 'Teknisi Pelaksana (FieldNet Engineering)';
      const p2 = container.querySelector('#bast-p2')?.value || 'Penanggung Jawab Site (Pemberi Kerja)';
      const items = container.querySelector('#bast-items')?.value || '- 1 Unit Router MikroTik terpasang\n- 8 Unit Kamera IP PoE 1080p\n- 1 Unit NVR + HDD 4TB\n- Uji commissioning seluruh perangkat normal';
      const warranty = container.querySelector('#bast-warranty')?.value || '90';

      return `
        <div class="print-header">
          <div class="print-title">Berita Acara Serah Terima (BAST)</div>
          <p>Nomor: ${no}</p>
        </div>
        <p style="font-size: 10pt; line-height: 1.5; margin-bottom: 12px;">
          Pada hari ini telah dilakukan serah terima pekerjaan instalasi jaringan dan CCTV antara:
        </p>
        <table class="print-table">
          <tr>
            <th style="width: 30%;">PIHAK PERTAMA (Pelaksana)</th>
            <td>${p1}</td>
          </tr>
          <tr>
            <th>PIHAK KEDUA (Pemberi Kerja)</th>
            <td>${p2}</td>
          </tr>
          <tr>
            <th>Lingkup Hasil Pekerjaan</th>
            <td style="white-space: pre-wrap;">${items}</td>
          </tr>
          <tr>
            <th>Ketentuan Garansi</th>
            <td>Masa garansi berlaku selama ${warranty} hari sejak dokumen ini ditandatangani.</td>
          </tr>
        </table>
        <p style="font-size: 9pt; color: #444; margin-top: 8px;">
          PIHAK KEDUA telah melakukan pengetesan operasional dan menerima pekerjaan tersebut dalam kondisi baik dan berfungsi normal.
        </p>
        <div class="print-signatures">
          <div class="print-sig-box">
            <div>PIHAK PERTAMA (Pelaksana)</div>
            <div class="print-sig-line">${p1}</div>
          </div>
          <div class="print-sig-box">
            <div>PIHAK KEDUA (Pemberi Kerja)</div>
            <div class="print-sig-line">${p2}</div>
          </div>
        </div>
      `;
    }
  }

  renderUI();
}
