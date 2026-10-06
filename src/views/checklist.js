/**
 * FieldNet Belajar - Field Checklist View
 * Checkable items with personal notes and photo attachments (Blob/DataURL) stored locally in IndexedDB.
 */

import { db } from '../db.js';
import { icon } from '../icons.js';

export async function renderChecklist(container, params) {
  let manifest = { modules: [] };
  try {
    const res = await fetch('/content/manifest.json');
    manifest = await res.json();
  } catch {
    // Handled with fallback empty manifest
  }

  // Load all module checklists
  const allModules = await Promise.all(
    manifest.modules.map(async m => {
      try {
        const r = await fetch(`/content/${m.id}.json`);
        return await r.json();
      } catch {
        return null;
      }
    })
  );

  const activeModules = allModules.filter(Boolean);
  let selectedModId = params?.mod || 'all';

  // Load saved checklist states from IndexedDB
  const savedChecklists = await db.checklists.toArray();
  const savedMap = new Map(savedChecklists.map(item => [item.id, item]));

  // Flatten items based on filter
  let displayItems = [];
  activeModules.forEach(mod => {
    if (selectedModId === 'all' || selectedModId === mod.id) {
      if (Array.isArray(mod.fieldChecklist)) {
        mod.fieldChecklist.forEach(item => {
          displayItems.push({
            ...item,
            moduleId: mod.id,
            moduleTitle: mod.title
          });
        });
      }
    }
  });

  const checkedCount = displayItems.filter(item => savedMap.get(item.id)?.checked).length;

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      <!-- Header -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1>Checklist</h1>
          <p style="font-size: var(--text-sm); color: var(--text-muted); margin-top: 2px;">
            Daftar periksa teknis sebelum meninggalkan lokasi klien.
          </p>
        </div>
        <div style="font-size: var(--text-sm); font-weight: 700; color: var(--primary);">
          ${checkedCount}/${displayItems.length} Selesai
        </div>
      </div>

      <!-- Module Filter Dropdown -->
      <div class="form-group" style="margin-bottom: var(--space-2);">
        <label class="form-label">Filter Modul:</label>
        <select id="filter-module" class="form-select">
          <option value="all" ${selectedModId === 'all' ? 'selected' : ''}>Semua Modul</option>
          ${activeModules.map(m => `
            <option value="${m.id}" ${selectedModId === m.id ? 'selected' : ''}>${m.title}</option>
          `).join('')}
        </select>
      </div>

      <!-- Checklist Items List -->
      <div style="display: flex; flex-direction: column; gap: var(--space-3);">
        ${displayItems.map(item => {
          const saved = savedMap.get(item.id) || {};
          const isChecked = !!saved.checked;
          const noteText = saved.note || '';
          const photoUrl = saved.photoDataUrl || null;

          return `
            <div class="chk-item" data-id="${item.id}">
              <div class="chk-row">
                <div class="chk-box ${isChecked ? 'checked' : ''}" data-id="${item.id}">
                  ${isChecked ? icon('check', 16) : ''}
                </div>
                <div class="chk-body">
                  <div style="font-size: var(--text-xs); color: var(--primary); font-weight: 700;">
                    ${item.moduleTitle}
                  </div>
                  <div class="chk-text" style="${isChecked ? 'text-decoration: line-through; opacity: 0.7;' : ''}">
                    ${item.text}
                  </div>
                  <div class="chk-tip">${item.tip}</div>
                </div>
              </div>

              <!-- Attachment & Note Expansion -->
              <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-1); padding-top: var(--space-2); border-top: 1px solid var(--border-subtle);">
                <div style="display: flex; gap: var(--space-2); align-items: center;">
                  <input type="text" class="form-input chk-input-note" data-id="${item.id}" value="${noteText}" style="min-height: 36px; font-size: var(--text-xs);" title="Catatan lapangan">
                  
                  <label class="btn btn-secondary btn-sm" style="cursor: pointer;" title="Lampirkan foto">
                    ${icon('camera', 16)} Foto
                    <input type="file" accept="image/*" class="chk-input-file" data-id="${item.id}" style="display: none;">
                  </label>
                  
                  <button class="btn btn-primary btn-sm btn-save-chk" data-id="${item.id}">
                    Simpan
                  </button>
                </div>

                <!-- Photo Thumbnail Preview if Attached -->
                ${photoUrl ? `
                  <div style="display: flex; align-items: center; gap: var(--space-2); margin-top: var(--space-1);">
                    <img src="${photoUrl}" alt="Bukti Foto" style="width: 56px; height: 56px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                      <span style="font-size: var(--text-xs); font-weight: 600;">Foto Terlampir</span>
                      <button class="btn btn-outline btn-sm btn-del-photo" data-id="${item.id}" style="color: var(--accent-red); border-color: var(--accent-red); padding: 0 8px;">
                        Hapus
                      </button>
                    </div>
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Item to module lookup map
  const itemModMap = new Map(displayItems.map(d => [d.id, d.moduleId]));

  // Filter change
  const filterSelect = container.querySelector('#filter-module');
  filterSelect.addEventListener('change', () => {
    renderChecklist(container, { mod: filterSelect.value });
  });

  // Checkbox toggle
  container.querySelectorAll('.chk-box').forEach(box => {
    box.addEventListener('click', async () => {
      const id = box.getAttribute('data-id');
      const modId = itemModMap.get(id) || (selectedModId !== 'all' ? selectedModId : 'module-01');
      const cur = savedMap.get(id) || { id, moduleId: modId };
      cur.checked = !cur.checked;
      cur.updatedAt = Date.now();
      await db.checklists.put(cur);
      renderChecklist(container, { mod: selectedModId });
    });
  });

  // Save button for note
  container.querySelectorAll('.btn-save-chk').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const input = container.querySelector(`.chk-input-note[data-id="${id}"]`);
      const note = input ? input.value : '';
      const modId = itemModMap.get(id) || (selectedModId !== 'all' ? selectedModId : 'module-01');
      const cur = savedMap.get(id) || { id, moduleId: modId };
      cur.note = note;
      cur.updatedAt = Date.now();
      await db.checklists.put(cur);
      btn.textContent = 'Tersimpan';
      setTimeout(() => { btn.textContent = 'Simpan'; }, 1500);
    });
  });

  // Photo file upload
  container.querySelectorAll('.chk-input-file').forEach(fileInput => {
    fileInput.addEventListener('change', async (e) => {
      const id = fileInput.getAttribute('data-id');
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (evt) => {
        const photoDataUrl = evt.target.result;
        const modId = itemModMap.get(id) || (selectedModId !== 'all' ? selectedModId : 'module-01');
        const cur = savedMap.get(id) || { id, moduleId: modId };
        cur.photoDataUrl = photoDataUrl;
        cur.updatedAt = Date.now();
        await db.checklists.put(cur);
        renderChecklist(container, { mod: selectedModId });
      };
      reader.readAsDataURL(file);
    });
  });

  // Photo delete
  container.querySelectorAll('.btn-del-photo').forEach(delBtn => {
    delBtn.addEventListener('click', async () => {
      const id = delBtn.getAttribute('data-id');
      const cur = savedMap.get(id);
      if (cur) {
        delete cur.photoDataUrl;
        await db.checklists.put(cur);
        renderChecklist(container, { mod: selectedModId });
      }
    });
  });
}
