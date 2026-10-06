/**
 * FieldNet Belajar - Local Storage Database Layer
 * Offline IndexedDB storage matching Dexie.js architecture.
 * Manages user progress, quiz scores, field checklists, photos, notes, and BAST reports.
 */

const DB_NAME = 'FieldNetBelajarDB';
const DB_VERSION = 2;

class Table {
  constructor(dbPromise, name, keyPath, autoIncrement = false) {
    this.dbPromise = dbPromise;
    this.name = name;
    this.keyPath = keyPath;
    this.autoIncrement = autoIncrement;
  }

  async _getStore(mode = 'readonly') {
    const db = await this.dbPromise;
    const tx = db.transaction(this.name, mode);
    return { store: tx.objectStore(this.name), tx };
  }

  async get(key) {
    const { store } = await this._getStore('readonly');
    return new Promise((resolve, reject) => {
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  async put(item) {
    const { store, tx } = await this._getStore('readwrite');
    return new Promise((resolve, reject) => {
      const req = store.put(item);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async add(item) {
    const { store, tx } = await this._getStore('readwrite');
    return new Promise((resolve, reject) => {
      const req = store.add(item);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async delete(key) {
    const { store } = await this._getStore('readwrite');
    return new Promise((resolve, reject) => {
      const req = store.delete(key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }

  async toArray() {
    const { store } = await this._getStore('readonly');
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async count() {
    const { store } = await this._getStore('readonly');
    return new Promise((resolve, reject) => {
      const req = store.count();
      req.onsuccess = () => resolve(req.result || 0);
      req.onerror = () => reject(req.error);
    });
  }

  async clear() {
    const { store } = await this._getStore('readwrite');
    return new Promise((resolve, reject) => {
      const req = store.clear();
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }

  async bulkPut(items) {
    const { store, tx } = await this._getStore('readwrite');
    return new Promise((resolve, reject) => {
      for (const item of items) {
        store.put(item);
      }
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }

  where(field) {
    const self = this;
    return {
      equals: async (val) => {
        const all = await self.toArray();
        return all.filter(item => item[field] === val);
      }
    };
  }
}

class FieldNetDatabase {
  constructor() {
    this.dbPromise = this._init();
    this.progress = new Table(this.dbPromise, 'progress', 'moduleId');
    this.quizResults = new Table(this.dbPromise, 'quizResults', 'moduleId');
    this.checklists = new Table(this.dbPromise, 'checklists', 'id');
    this.bookmarks = new Table(this.dbPromise, 'bookmarks', 'id');
    this.notes = new Table(this.dbPromise, 'notes', 'id', true);
    this.reports = new Table(this.dbPromise, 'reports', 'id', true);
    this.bastDocs = new Table(this.dbPromise, 'bastDocs', 'id', true);
    this.settings = new Table(this.dbPromise, 'settings', 'key');
    this.images = new Table(this.dbPromise, 'images', 'id');
  }

  // Dexie-compatible table resolver
  table(name) {
    if (this[name]) return this[name];
    if (name === 'images') return this.images;
    if (name === 'settings') return this.settings;
    return null;
  }

  _init() {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        resolve(null);
        return;
      }
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('progress')) {
          db.createObjectStore('progress', { keyPath: 'moduleId' });
        }
        if (!db.objectStoreNames.contains('quizResults')) {
          db.createObjectStore('quizResults', { keyPath: 'moduleId' });
        }
        if (!db.objectStoreNames.contains('checklists')) {
          db.createObjectStore('checklists', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('bookmarks')) {
          db.createObjectStore('bookmarks', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('notes')) {
          db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('reports')) {
          db.createObjectStore('reports', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('bastDocs')) {
          db.createObjectStore('bastDocs', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('images')) {
          db.createObjectStore('images', { keyPath: 'id' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Backup all data to a single JSON object
  async exportBackup() {
    const [
      progressList,
      quizList,
      checklistList,
      bookmarkList,
      noteList,
      reportList,
      bastList,
      settingsList,
      imagesList
    ] = await Promise.all([
      this.progress.toArray(),
      this.quizResults.toArray(),
      this.checklists.toArray(),
      this.bookmarks.toArray(),
      this.notes.toArray(),
      this.reports.toArray(),
      this.bastDocs.toArray(),
      this.settings.toArray(),
      this.images.toArray()
    ]);

    return {
      appName: 'FieldNet Belajar',
      exportedAt: new Date().toISOString(),
      version: 2,
      data: {
        progress: progressList,
        quizResults: quizList,
        checklists: checklistList,
        bookmarks: bookmarkList,
        notes: noteList,
        reports: reportList,
        bastDocs: bastList,
        settings: settingsList,
        images: imagesList
      }
    };
  }

  // Restore backup from JSON object
  async importBackup(backupObj) {
    if (!backupObj || !backupObj.data) {
      throw new Error('Format berkas cadangan tidak valid.');
    }
    const d = backupObj.data;
    if (Array.isArray(d.progress)) await this.progress.bulkPut(d.progress);
    if (Array.isArray(d.quizResults)) await this.quizResults.bulkPut(d.quizResults);
    if (Array.isArray(d.checklists)) await this.checklists.bulkPut(d.checklists);
    if (Array.isArray(d.bookmarks)) await this.bookmarks.bulkPut(d.bookmarks);
    if (Array.isArray(d.notes)) await this.notes.bulkPut(d.notes);
    if (Array.isArray(d.reports)) await this.reports.bulkPut(d.reports);
    if (Array.isArray(d.bastDocs)) await this.bastDocs.bulkPut(d.bastDocs);
    if (Array.isArray(d.settings)) await this.settings.bulkPut(d.settings);
    if (Array.isArray(d.images)) await this.images.bulkPut(d.images);
    return true;
  }

  // Clear all data
  async resetAll() {
    await Promise.all([
      this.progress.clear(),
      this.quizResults.clear(),
      this.checklists.clear(),
      this.bookmarks.clear(),
      this.notes.clear(),
      this.reports.clear(),
      this.bastDocs.clear(),
      this.settings.clear(),
      this.images.clear()
    ]);
  }
}

export const db = new FieldNetDatabase();
