/**
 * FieldNet Belajar - Modules List View
 * Displays all 11 modules with category filters and completion indicators.
 */

import { db } from '../db.js';
import { icon } from '../icons.js';

export async function renderModules(container) {
  let manifest = { modules: [] };
  try {
    const res = await fetch('./content/manifest.json');
    manifest = await res.json();
  } catch {
    // Handled with fallback empty modules
  }

  const [progressList, quizList] = await Promise.all([
    db.progress.toArray(),
    db.quizResults.toArray()
  ]);

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      <!-- Top Title -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1>Modul</h1>
          <p style="font-size: var(--text-sm); color: var(--text-muted); margin-top: 2px;">
            11 kurikulum teknisi lapangan terlengkap.
          </p>
        </div>
        <a href="#/search" class="btn btn-icon" title="Cari">
          ${icon('search', 20)}
        </a>
      </div>

      <!-- Module List Grid -->
      <div class="module-grid">
        ${manifest.modules.map(mod => {
          const modProgress = progressList.find(p => p.moduleId === mod.id);
          const isDone = modProgress?.completed;
          const quizResult = quizList.find(q => q.moduleId === mod.id);

          return `
            <div class="card card-clickable" onclick="location.hash='#/lesson/${mod.id}'">
              <div class="module-header">
                <span class="module-badge">${mod.badge}</span>
                <span style="font-size: var(--text-xs); color: var(--text-muted);">${mod.duration}</span>
              </div>
              <div style="display: flex; gap: var(--space-3); align-items: center;">
                <div class="module-icon-box">
                  ${icon(mod.icon || 'book-open', 24)}
                </div>
                <div style="flex: 1; min-width: 0;">
                  <h3 style="font-size: var(--text-base);">
                    ${mod.order}. ${mod.title}
                  </h3>
                  <p style="font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px; line-height: 1.4;">
                    ${mod.desc}
                  </p>
                </div>
              </div>

              <!-- Status Footer -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-1); padding-top: var(--space-2); border-top: 1px solid var(--border-subtle);">
                <div style="display: flex; gap: var(--space-2); align-items: center;">
                  <span style="font-size: var(--text-xs); font-weight: 600; color: ${isDone ? 'var(--primary)' : 'var(--text-muted)'};">
                    ${isDone ? 'Selesai' : 'Belum'}
                  </span>
                  ${quizResult ? `
                    <span style="font-size: var(--text-xs); color: ${quizResult.passed ? 'var(--primary)' : 'var(--accent-amber)'}; font-weight: 600;">
                      • Skor ${quizResult.score}%
                    </span>
                  ` : ''}
                </div>
                <a href="#/lesson/${mod.id}" class="btn btn-outline btn-sm">Buka</a>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
