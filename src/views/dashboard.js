/**
 * FieldNet Belajar - Dashboard View (Beranda)
 * Shows learning progress, continue button, and module list.
 */

import { db } from '../db.js';
import { icon } from '../icons.js';

export async function renderDashboard(container) {
  // 1. Fetch manifest
  let manifest = { modules: [] };
  try {
    const res = await fetch('/content/manifest.json');
    manifest = await res.json();
  } catch {
    // Handled with fallback empty modules
  }

  // 2. Fetch user stats from IndexedDB
  const [progressList, quizList, checklistList] = await Promise.all([
    db.progress.toArray(),
    db.quizResults.toArray(),
    db.checklists.toArray()
  ]);

  const totalModules = manifest.modules.length;
  const completedModules = progressList.filter(p => p.completed).length;
  const passedQuizzes = quizList.filter(q => q.passed).length;
  const checkedItems = checklistList.filter(c => c.checked).length;
  const overallPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  // Determine last active module
  const lastActive = progressList.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))[0];
  const lastModMeta = lastActive ? manifest.modules.find(m => m.id === lastActive.moduleId) : manifest.modules[0];

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      <!-- Header Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: var(--text-xl);">Beranda</h1>
          <p style="font-size: var(--text-sm); color: var(--text-muted); margin-top: 2px;">
            Panduan teknisi jaringan dan CCTV lapangan.
          </p>
        </div>
        <div class="badge-status">
          <span class="badge-dot"></span>
          <span>Offline Siap</span>
        </div>
      </div>

      <!-- Overview Stats Card -->
      <div class="card" style="background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 600; font-size: var(--text-sm);">Progres Belajar</span>
          <span style="font-weight: 700; color: var(--primary); font-size: var(--text-md);">${overallPercent}%</span>
        </div>
        <div class="progress-container">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${overallPercent}%;"></div>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2); margin-top: var(--space-1); text-align: center;">
          <div style="padding: var(--space-2); background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-size: var(--text-md); font-weight: 700; color: var(--text-primary);">${completedModules}/${totalModules}</div>
            <div style="font-size: var(--text-xs); color: var(--text-muted);">Modul</div>
          </div>
          <div style="padding: var(--space-2); background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-size: var(--text-md); font-weight: 700; color: var(--text-primary);">${passedQuizzes}</div>
            <div style="font-size: var(--text-xs); color: var(--text-muted);">Kuis Lulus</div>
          </div>
          <div style="padding: var(--space-2); background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-size: var(--text-md); font-weight: 700; color: var(--text-primary);">${checkedItems}</div>
            <div style="font-size: var(--text-xs); color: var(--text-muted);">Checklist</div>
          </div>
        </div>
      </div>

      <!-- Quick Resume Card -->
      ${lastModMeta ? `
        <div class="card" style="border-left: 4px solid var(--primary);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: var(--text-xs); color: var(--primary); font-weight: 700; text-transform: uppercase;">Lanjutkan Belajar</span>
              <h3 style="font-size: var(--text-base);">${lastModMeta.title}</h3>
              <p style="font-size: var(--text-xs); color: var(--text-muted);">${lastModMeta.desc}</p>
            </div>
            <a href="#/lesson/${lastModMeta.id}" class="btn btn-primary btn-sm">Lanjut</a>
          </div>
        </div>
      ` : ''}

      <!-- Quick Action Shortcuts -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2);">
        <a href="#/checklist" class="btn btn-secondary" style="font-size: var(--text-xs); padding: 0 var(--space-2);">
          ${icon('check-square', 16)} Checklist
        </a>
        <a href="#/troubleshoot" class="btn btn-secondary" style="font-size: var(--text-xs); padding: 0 var(--space-2);">
          ${icon('alert-triangle', 16)} Masalah
        </a>
        <a href="#/reports" class="btn btn-secondary" style="font-size: var(--text-xs); padding: 0 var(--space-2);">
          ${icon('file-text', 16)} Laporan
        </a>
      </div>

      <!-- Module List Section -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-2);">
        <h2>Daftar Modul</h2>
        <a href="#/modules" class="btn btn-outline btn-sm">Lihat</a>
      </div>

      <div class="module-grid">
        ${manifest.modules.map(mod => {
          const modProgress = progressList.find(p => p.moduleId === mod.id);
          const isDone = modProgress?.completed;
          return `
            <div class="card card-clickable" onclick="location.hash='#/lesson/${mod.id}'">
              <div class="module-header">
                <span class="module-badge">${mod.badge}</span>
                <span style="font-size: var(--text-xs); color: var(--text-muted);">${mod.duration}</span>
              </div>
              <div style="display: flex; align-items: center; gap: var(--space-3);">
                <div class="module-icon-box">
                  ${icon(mod.icon || 'book-open', 22)}
                </div>
                <div style="flex: 1; min-width: 0;">
                  <h3 style="font-size: var(--text-base); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${mod.order}. ${mod.title}
                  </h3>
                  <p style="font-size: var(--text-xs); color: var(--text-muted); line-height: 1.4; margin-top: 2px;">
                    ${mod.desc}
                  </p>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-1); padding-top: var(--space-2); border-top: 1px solid var(--border-subtle);">
                <span style="font-size: var(--text-xs); color: ${isDone ? 'var(--primary)' : 'var(--text-muted)'}; font-weight: 600;">
                  ${isDone ? 'Selesai' : 'Belum'}
                </span>
                <span class="btn btn-outline btn-sm">${isDone ? 'Ulang' : 'Mulai'}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
