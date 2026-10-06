/**
 * FieldNet Belajar - Offline Search View
 * Full-text instantaneous search with highlighted snippets and empty state.
 */

import { searchContent } from '../search.js';
import { icon } from '../icons.js';

export async function renderSearch(container) {
  let currentResults = [];

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      <!-- Title -->
      <div>
        <h1>Pencarian</h1>
        <p style="font-size: var(--text-sm); color: var(--text-muted); margin-top: 2px;">
          Cari materi, perintah CLI, analogi, dan solusi offline.
        </p>
      </div>

      <!-- Search Input Bar -->
      <div style="display: flex; gap: var(--space-2);">
        <input type="search" id="input-search" class="form-input" style="flex: 1;" title="Kata kunci pencarian">
        <button id="btn-do-search" class="btn btn-primary">Cari</button>
      </div>

      <!-- Results Container -->
      <div id="results-area" style="display: flex; flex-direction: column; gap: var(--space-3);">
        ${renderEmptyState('Ketik kata kunci seperti VLAN, crimping, atau RTSP.')}
      </div>
    </div>
  `;

  const inputEl = container.querySelector('#input-search');
  const btnSearch = container.querySelector('#btn-do-search');
  const resultsArea = container.querySelector('#results-area');

  async function executeSearch() {
    const q = inputEl.value.trim();
    if (!q) {
      resultsArea.innerHTML = renderEmptyState('Ketik kata kunci untuk memulai pencarian.');
      return;
    }

    resultsArea.innerHTML = `
      <div style="text-align: center; padding: var(--space-6); color: var(--text-muted);">
        Mencari data...
      </div>
    `;

    currentResults = await searchContent(q);

    if (currentResults.length === 0) {
      resultsArea.innerHTML = `
        <div class="card" style="text-align: center; padding: var(--space-8); align-items: center;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--bg-muted); display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
            ${icon('search', 24)}
          </div>
          <h3 style="font-size: var(--text-base); margin-top: var(--space-2);">Tidak Ditemukan</h3>
          <p style="font-size: var(--text-xs); color: var(--text-muted); max-width: 280px;">
            Coba kata kunci lain yang lebih umum seperti IP, kabel, atau switch.
          </p>
          <div style="margin-top: var(--space-3);">
            <button id="btn-reset-search" class="btn btn-secondary btn-sm">Reset</button>
          </div>
        </div>
      `;

      const btnReset = resultsArea.querySelector('#btn-reset-search');
      if (btnReset) {
        btnReset.addEventListener('click', () => {
          inputEl.value = '';
          inputEl.focus();
          resultsArea.innerHTML = renderEmptyState('Ketik kata kunci untuk memulai pencarian.');
        });
      }
      return;
    }

    resultsArea.innerHTML = `
      <div style="font-size: var(--text-xs); color: var(--text-muted); font-weight: 600;">
        Ditemukan ${currentResults.length} hasil:
      </div>
      ${currentResults.map(item => `
        <div class="card card-clickable" onclick="location.hash='${item.link}'">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="module-badge">${item.matchType}</span>
            <span style="font-size: var(--text-xs); color: var(--primary); font-weight: 600;">${item.moduleTitle}</span>
          </div>
          <h3 style="font-size: var(--text-base);">${item.title}</h3>
          <p style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.4;">
            ${item.snippet}
          </p>
          <div style="display: flex; justify-content: flex-end; margin-top: var(--space-1);">
            <a href="${item.link}" class="btn btn-outline btn-sm">Buka</a>
          </div>
        </div>
      `).join('')}
    `;
  }

  btnSearch.addEventListener('click', executeSearch);
  inputEl.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') executeSearch();
  });
  inputEl.focus();

  function renderEmptyState(msg) {
    return `
      <div class="card" style="text-align: center; padding: var(--space-8); align-items: center;">
        <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--primary-surface); color: var(--primary); display: flex; align-items: center; justify-content: center;">
          ${icon('search', 24)}
        </div>
        <p style="font-size: var(--text-sm); color: var(--text-muted); margin-top: var(--space-2);">
          ${msg}
        </p>
      </div>
    `;
  }
}
