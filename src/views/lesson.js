/**
 * FieldNet Belajar - Lesson Reader View
 * Step-by-step interactive lesson viewer with analogies, real CLI blocks, image fallbacks, and 3-point summaries.
 */

import { db } from '../db.js';
import { icon } from '../icons.js';

export async function renderLesson(container, params) {
  const moduleId = params.id || 'module-01';

  let mod = null;
  try {
    const res = await fetch(`/content/${moduleId}.json`);
    mod = await res.json();
  } catch (err) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: var(--space-8);">
        <p style="color: var(--accent-red);">Modul tidak ditemukan.</p>
        <div style="margin-top: var(--space-4);">
          <a href="#/modules" class="btn btn-primary">Kembali</a>
        </div>
      </div>
    `;
    return;
  }

  // Update last read progress in IndexedDB
  await db.progress.put({
    moduleId: mod.id,
    completed: false,
    updatedAt: Date.now()
  });

  // Load saved checklist states
  const savedChecklists = await db.checklists.toArray();
  const chkMap = new Map(savedChecklists.map(c => [c.id, c]));

  // Check if bookmarked
  const bookmark = await db.bookmarks.get(mod.id);
  let isBookmarked = !!bookmark;

  // Load cached images from IndexedDB
  const imageMap = new Map();
  if (Array.isArray(mod.sections)) {
    for (const sec of mod.sections) {
      if (sec.imageSlot && sec.imageSlot.filename) {
        const fname = sec.imageSlot.filename;
        const bare = fname.replace(/^images\//, '');
        const item = (await db.settings.get(`image:${fname}`)) ||
                     (await db.settings.get(`image:${bare}`)) ||
                     (await db.settings.get(`image:images/${bare}`));
        if (item && item.dataUrl) {
          imageMap.set(fname, item.dataUrl);
        }
      }
    }
  }

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      <!-- Top Action Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <a href="#/modules" class="btn btn-icon" title="Kembali">
          ${icon('arrow-left', 20)}
        </a>
        <div style="text-align: center; flex: 1; padding: 0 var(--space-2);">
          <span style="font-size: var(--text-xs); color: var(--primary); font-weight: 700; text-transform: uppercase;">
            ${mod.badge}
          </span>
          <h1 style="font-size: var(--text-md);">${mod.title}</h1>
        </div>
        <button id="btn-bookmark" class="btn btn-icon" title="Simpan">
          ${icon('bookmark', 20, isBookmarked ? 'text-primary' : '')}
        </button>
      </div>

      <!-- Intro Card -->
      <div class="card" style="border-left: 4px solid var(--primary);">
        <h3 style="font-size: var(--text-base);">Pengantar</h3>
        <p style="font-size: var(--text-sm); line-height: 1.6;">${mod.intro}</p>
      </div>

      <!-- Objectives Card -->
      <div class="card">
        <h3 style="font-size: var(--text-base); display: flex; align-items: center; gap: var(--space-2);">
          ${icon('shield-check', 18)} Tujuan Belajar
        </h3>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-1);">
          ${mod.objectives.map(obj => `
            <li style="display: flex; align-items: flex-start; gap: var(--space-2); font-size: var(--text-sm);">
              <span style="color: var(--primary); margin-top: 2px;">${icon('check', 16)}</span>
              <span>${obj}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Sections -->
      ${mod.sections.map((sec, sIdx) => `
        <div class="card" style="gap: var(--space-4);">
          <div style="display: flex; align-items: center; gap: var(--space-2); border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-2);">
            <span style="font-size: var(--text-xs); background: var(--primary-surface); color: var(--primary); padding: 2px 8px; border-radius: var(--radius-full); font-weight: 700;">
              Bagian ${sIdx + 1}
            </span>
            <h2 style="font-size: var(--text-base);">${sec.title}</h2>
          </div>

          <!-- Analogy Callout -->
          ${sec.analogy ? `
            <div class="callout callout-analogy">
              <div class="callout-header">
                ${icon('lightbulb', 18)} Analogi Lapangan
              </div>
              <p style="font-size: var(--text-sm);">${sec.analogy}</p>
            </div>
          ` : ''}

          <!-- Paragraphs -->
          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            ${sec.paragraphs.map(p => `
              <p style="font-size: var(--text-base); line-height: 1.6;">${p}</p>
            `).join('')}
          </div>

          <!-- Steps -->
          ${sec.steps && sec.steps.length > 0 ? `
            <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-2);">
              <h4 style="font-size: var(--text-sm); color: var(--text-primary);">Langkah Praktik:</h4>
              ${sec.steps.map(st => `
                <div class="step-card">
                  <div class="step-num">${st.step}</div>
                  <div class="step-content">
                    <strong style="font-size: var(--text-sm);">${st.title}</strong>
                    <p style="font-size: var(--text-sm); line-height: 1.5;">${st.text}</p>
                    <div class="step-why">Alasan: ${st.why}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Warning Callout -->
          ${sec.warning ? `
            <div class="callout callout-warning">
              <div class="callout-header">
                ${icon('alert-triangle', 18)} Perhatian Khusus
              </div>
              <p style="font-size: var(--text-sm);">${sec.warning}</p>
            </div>
          ` : ''}

          <!-- Technical Illustration Card -->
          ${sec.imageSlot ? (() => {
            const cachedUrl = imageMap.get(sec.imageSlot.filename);
            const initialSrc = cachedUrl || `/${sec.imageSlot.filename}`;
            return `
              <div class="image-presentation" style="margin: var(--space-2) 0; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; background: var(--bg-surface-elevated);">
                <div style="background: #000; text-align: center; position: relative; min-height: 160px; display: flex; align-items: center; justify-content: center;">
                  <img src="${initialSrc}" alt="${sec.imageSlot.alt || sec.imageSlot.caption}" style="max-height: 360px; width: 100%; object-fit: contain; display: block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                  <div class="image-slot-inner" style="display: none; flex-direction: column; align-items: center; justify-content: center; padding: var(--space-4); text-align: center; gap: var(--space-2); width: 100%; background: var(--bg-surface-elevated);">
                    <div class="image-slot-icon">${icon('image', 24)}</div>
                    <div class="image-slot-caption">${sec.imageSlot.caption}</div>
                    <div class="image-slot-file">${sec.imageSlot.filename}</div>
                    <div style="margin-top: var(--space-2);">
                      <a href="#/studio" class="btn btn-primary btn-sm">${icon('image', 14)} Studio</a>
                    </div>
                  </div>
                </div>
                <div style="padding: var(--space-2) var(--space-3); background: var(--bg-surface); border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; gap: var(--space-2);">
                  <span style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.4;">
                    ${sec.imageSlot.caption}
                  </span>
                  <a href="#/studio" class="btn btn-outline btn-sm" title="Studio">
                    ${icon('image', 14)} Studio
                  </a>
                </div>
              </div>
            `;
          })() : ''}
        </div>
      `).join('')}

      <!-- Real Commands CLI Block -->
      ${mod.realCommands && mod.realCommands.length > 0 ? `
        <div class="card">
          <h3 style="font-size: var(--text-base); display: flex; align-items: center; gap: var(--space-2);">
            ${icon('router', 18)} Konfigurasi Nyata
          </h3>
          ${mod.realCommands.map((cmd, cIdx) => `
            <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-2);">
              <span style="font-size: var(--text-sm); font-weight: 600;">${cmd.title}</span>
              <p style="font-size: var(--text-xs); color: var(--text-muted);">${cmd.explanation}</p>
              <div class="code-block">
                <div class="code-header">
                  <span>${cmd.context || 'Terminal'}</span>
                  <button class="btn btn-secondary btn-sm btn-copy-cmd" data-code="${encodeURIComponent(cmd.code)}">
                    Salin
                  </button>
                </div>
                <pre style="margin: 0; white-space: pre-wrap;"><code>${cmd.code}</code></pre>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Field Checklist Section -->
      ${mod.fieldChecklist && mod.fieldChecklist.length > 0 ? `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-2);">
            <h3 style="font-size: var(--text-base); display: flex; align-items: center; gap: var(--space-2);">
              ${icon('check-square', 18)} Checklist Lapangan
            </h3>
            <a href="#/checklist?mod=${mod.id}" class="btn btn-outline btn-sm">Foto</a>
          </div>
          <p style="font-size: var(--text-xs); color: var(--text-muted);">
            Periksa butir fisik berikut sebelum pekerjaan dinyatakan selesai di lokasi klien.
          </p>
          <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-1);">
            ${mod.fieldChecklist.map(chk => {
              const isDone = !!chkMap.get(chk.id)?.checked;
              return `
                <div class="chk-item" style="padding: var(--space-2); margin: 0; background: var(--bg-surface-elevated);" data-id="${chk.id}">
                  <div class="chk-row">
                    <div class="chk-box ${isDone ? 'checked' : ''} lesson-chk-toggle" data-id="${chk.id}">
                      ${isDone ? icon('check', 16) : ''}
                    </div>
                    <div class="chk-body">
                      <div class="chk-text" style="${isDone ? 'text-decoration: line-through; opacity: 0.7;' : ''}">
                        ${chk.text}
                      </div>
                      <div class="chk-tip">${chk.tip}</div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      <!-- 3 Points Summary -->
      <div class="card" style="background: var(--bg-surface-elevated); border-left: 4px solid var(--primary);">
        <h3 style="font-size: var(--text-base); display: flex; align-items: center; gap: var(--space-2);">
          ${icon('award', 18)} Ringkasan Tiga Poin
        </h3>
        <ol style="margin-left: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-2);">
          ${mod.summary3Points.map(pt => `
            <li style="font-size: var(--text-sm); line-height: 1.5; color: var(--text-primary);">${pt}</li>
          `).join('')}
        </ol>
      </div>

      <!-- Action Navigation Buttons -->
      <div style="display: flex; gap: var(--space-2); margin-top: var(--space-2);">
        <a href="#/modules" class="btn btn-secondary" style="flex: 1;">Kembali</a>
        <a href="#/checklist?mod=${mod.id}" class="btn btn-outline" style="flex: 1;">Checklist</a>
        <a href="#/quiz/${mod.id}" class="btn btn-primary" style="flex: 1;">Kuis</a>
      </div>
    </div>
  `;

  // Bookmark toggle listener
  const btnBookmark = container.querySelector('#btn-bookmark');
  if (btnBookmark) {
    btnBookmark.addEventListener('click', async () => {
      isBookmarked = !isBookmarked;
      if (isBookmarked) {
        await db.bookmarks.put({
          id: mod.id,
          moduleId: mod.id,
          title: mod.title,
          timestamp: Date.now()
        });
        btnBookmark.innerHTML = icon('bookmark', 20, 'text-primary');
        showToast('Tersimpan');
      } else {
        await db.bookmarks.delete(mod.id);
        btnBookmark.innerHTML = icon('bookmark', 20);
        showToast('Dihapus');
      }
    });
  }

  // Copy command listeners
  container.querySelectorAll('.btn-copy-cmd').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = decodeURIComponent(btn.getAttribute('data-code') || '');
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = 'Tersalin';
        setTimeout(() => { btn.textContent = 'Salin'; }, 2000);
      } catch {
        btn.textContent = 'Gagal';
      }
    });
  });

  // Lesson checklist interactive toggle listeners
  container.querySelectorAll('.lesson-chk-toggle').forEach(box => {
    box.addEventListener('click', async () => {
      const chkId = box.getAttribute('data-id');
      const cur = chkMap.get(chkId) || { id: chkId, moduleId: mod.id };
      cur.checked = !cur.checked;
      cur.updatedAt = Date.now();
      await db.checklists.put(cur);
      chkMap.set(chkId, cur);
      box.classList.toggle('checked', cur.checked);
      box.innerHTML = cur.checked ? icon('check', 16) : '';
      const textEl = box.closest('.chk-item')?.querySelector('.chk-text');
      if (textEl) {
        textEl.style.textDecoration = cur.checked ? 'line-through' : 'none';
        textEl.style.opacity = cur.checked ? '0.7' : '1';
      }
      showToast(cur.checked ? 'Tersimpan' : 'Dibatalkan');
    });
  });
}

function showToast(msg) {
  const existing = document.querySelector('.toast-msg');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}
