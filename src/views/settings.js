/**
 * FieldNet Belajar - Settings View (Atur)
 * Theme switcher (Terang/Gelap/Sistem), backup/restore JSON, storage stats, and cache controls.
 */

import { db } from '../db.js';
import { icon } from '../icons.js';

export async function renderSettings(container) {
  // Current theme setting
  const currentTheme = localStorage.getItem('fn_theme') || 'system';

  // Stats from IndexedDB
  const [progCount, quizCount, chkCount, repCount, bastCount] = await Promise.all([
    db.progress.count(),
    db.quizResults.count(),
    db.checklists.count(),
    db.reports.count(),
    db.bastDocs.count()
  ]);

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      <!-- Title -->
      <div>
        <h1>Atur</h1>
        <p style="font-size: var(--text-sm); color: var(--text-muted); margin-top: 2px;">
          Pengaturan tema tampilan, cadangan data lokal, dan cache aplikasi.
        </p>
      </div>

      <!-- Theme Switcher Card -->
      <div class="card">
        <h3 style="font-size: var(--text-base); display: flex; align-items: center; gap: var(--space-2);">
          ${icon('sun', 18)} Mode Tampilan
        </h3>
        <p style="font-size: var(--text-xs); color: var(--text-muted);">
          Pilih tema visual yang nyaman untuk mata saat bekerja di lapangan.
        </p>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2); margin-top: var(--space-1);">
          <button class="btn ${currentTheme === 'light' ? 'btn-primary' : 'btn-secondary'} btn-theme" data-theme="light">
            Terang
          </button>
          <button class="btn ${currentTheme === 'dark' ? 'btn-primary' : 'btn-secondary'} btn-theme" data-theme="dark">
            Gelap
          </button>
          <button class="btn ${currentTheme === 'system' ? 'btn-primary' : 'btn-secondary'} btn-theme" data-theme="system">
            Sistem
          </button>
        </div>
      </div>

      <!-- Backup & Restore Card -->
      <div class="card">
        <h3 style="font-size: var(--text-base); display: flex; align-items: center; gap: var(--space-2);">
          ${icon('download', 18)} Cadangan Data
        </h3>
        <p style="font-size: var(--text-xs); color: var(--text-muted);">
          Semua progres kuis, checklist foto, dan laporan tersimpan di IndexedDB HP kamu.
        </p>

        <div style="display: flex; gap: var(--space-2); margin-top: var(--space-1);">
          <button id="btn-export-backup" class="btn btn-primary" style="flex: 1;">
            ${icon('download', 16)} Ekspor
          </button>
          
          <label class="btn btn-secondary" style="flex: 1; cursor: pointer;">
            ${icon('upload', 16)} Impor
            <input type="file" id="input-import-backup" accept=".json" style="display: none;">
          </label>
        </div>
      </div>

      <!-- Storage Info Card -->
      <div class="card">
        <h3 style="font-size: var(--text-base); display: flex; align-items: center; gap: var(--space-2);">
          ${icon('server', 18)} Penyimpanan Lokal
        </h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-2); font-size: var(--text-xs);">
          <div style="padding: var(--space-2); background: var(--bg-surface-elevated); border-radius: var(--radius-sm);">
            <span>Progres: </span><strong>${progCount} item</strong>
          </div>
          <div style="padding: var(--space-2); background: var(--bg-surface-elevated); border-radius: var(--radius-sm);">
            <span>Hasil Kuis: </span><strong>${quizCount} item</strong>
          </div>
          <div style="padding: var(--space-2); background: var(--bg-surface-elevated); border-radius: var(--radius-sm);">
            <span>Checklist & Foto: </span><strong>${chkCount} item</strong>
          </div>
          <div style="padding: var(--space-2); background: var(--bg-surface-elevated); border-radius: var(--radius-sm);">
            <span>Laporan & BAST: </span><strong>${repCount + bastCount} item</strong>
          </div>
        </div>

        <div style="margin-top: var(--space-2);">
          <button id="btn-clear-data" class="btn btn-danger btn-sm" style="width: 100%;">
            Hapus
          </button>
        </div>
      </div>

      <!-- App Info Card -->
      <div class="card" style="text-align: center; padding: var(--space-4);">
        <h4 style="font-size: var(--text-sm);">FieldNet Belajar v1.0.0</h4>
        <p style="font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px;">
          Offline-first PWA • 11 Modul Materi • Engine Capacitor Ready.
        </p>
      </div>
    </div>
  `;

  // Theme switch listeners
  container.querySelectorAll('.btn-theme').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-theme');
      localStorage.setItem('fn_theme', selected);
      applyTheme(selected);
      renderSettings(container);
    });
  });

  // Export backup
  const btnExport = container.querySelector('#btn-export-backup');
  if (btnExport) {
    btnExport.addEventListener('click', async () => {
      const data = await db.exportBackup();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fieldnet-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Import backup
  const inputImport = container.querySelector('#input-import-backup');
  if (inputImport) {
    inputImport.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        const json = JSON.parse(text);
        await db.importBackup(json);
        alert('Data berhasil dipulihkan.');
        renderSettings(container);
      } catch (err) {
        alert('Gagal memulihkan cadangan: ' + err.message);
      }
    });
  }

  // Clear data
  const btnClear = container.querySelector('#btn-clear-data');
  if (btnClear) {
    btnClear.addEventListener('click', async () => {
      if (confirm('Hapus seluruh data progres dan laporan lokal? Tindakan ini tidak dapat dibatalkan.')) {
        await db.resetAll();
        alert('Data berhasil dibersihkan.');
        renderSettings(container);
      }
    });
  }
}

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
  } else if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.setAttribute('data-theme', 'system');
  }
}
