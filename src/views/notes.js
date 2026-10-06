/**
 * FieldNet Belajar - Bookmarks & Notes View
 * Personal technician field notes and saved bookmarks.
 */

import { db } from '../db.js';
import { icon } from '../icons.js';

export async function renderNotes(container) {
  const [bookmarks, notes] = await Promise.all([
    db.bookmarks.toArray(),
    db.notes.toArray()
  ]);

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      <!-- Title -->
      <div>
        <h1>Catatan</h1>
        <p style="font-size: var(--text-sm); color: var(--text-muted); margin-top: 2px;">
          Koleksi bookmark materi dan catatan pribadi teknisi.
        </p>
      </div>

      <!-- Bookmarks Section -->
      <div class="card">
        <h3 style="font-size: var(--text-base); display: flex; align-items: center; gap: var(--space-2);">
          ${icon('bookmark', 18)} Materi Tersimpan
        </h3>
        ${bookmarks.length === 0 ? `
          <p style="font-size: var(--text-xs); color: var(--text-muted); margin-top: var(--space-1);">
            Belum ada materi yang ditandai bookmark.
          </p>
        ` : `
          <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-1);">
            ${bookmarks.map(bm => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-2); background: var(--bg-surface-elevated); border-radius: var(--radius-md);">
                <div style="font-size: var(--text-sm); font-weight: 600;">${bm.title}</div>
                <div style="display: flex; gap: var(--space-2);">
                  <a href="#/lesson/${bm.moduleId}" class="btn btn-outline btn-sm">Buka</a>
                  <button class="btn btn-secondary btn-sm btn-del-bm" data-id="${bm.id}">Hapus</button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <!-- Add New Note -->
      <div class="card">
        <h3 style="font-size: var(--text-base); display: flex; align-items: center; gap: var(--space-2);">
          ${icon('edit', 18)} Tambah Catatan
        </h3>
        <div class="form-group">
          <label for="input-new-note" class="form-label">Isi Catatan</label>
          <textarea id="input-new-note" class="form-textarea" rows="3"></textarea>
        </div>
        <button id="btn-add-note" class="btn btn-primary" style="align-self: flex-end;">
          Simpan
        </button>
      </div>

      <!-- Notes List -->
      <div style="display: flex; flex-direction: column; gap: var(--space-3);">
        ${notes.map(n => `
          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <span style="font-size: var(--text-xs); color: var(--text-muted);">
                ${new Date(n.createdAt).toLocaleDateString('id-ID')}
              </span>
              <button class="btn btn-outline btn-sm btn-del-note" data-id="${n.id}" style="color: var(--accent-red); border-color: var(--accent-red);">
                Hapus
              </button>
            </div>
            <p style="font-size: var(--text-sm); line-height: 1.5; white-space: pre-wrap;">
              ${n.content}
            </p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Delete bookmark
  container.querySelectorAll('.btn-del-bm').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      await db.bookmarks.delete(id);
      renderNotes(container);
    });
  });

  // Add note
  const btnAdd = container.querySelector('#btn-add-note');
  const inputNote = container.querySelector('#input-new-note');
  if (btnAdd && inputNote) {
    btnAdd.addEventListener('click', async () => {
      const text = inputNote.value.trim();
      if (!text) return;
      await db.notes.add({
        content: text,
        createdAt: Date.now()
      });
      renderNotes(container);
    });
  }

  // Delete note
  container.querySelectorAll('.btn-del-note').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      await db.notes.delete(id);
      renderNotes(container);
    });
  });
}
