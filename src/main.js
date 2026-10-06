/**
 * FieldNet Belajar - Main Application Entrypoint
 * Initializes router, routes, service worker, theme, and offline events.
 */

import { router } from './router.js';
import { icon } from './icons.js';
import { renderDashboard } from './views/dashboard.js';
import { renderModules } from './views/modules.js';
import { renderLesson } from './views/lesson.js';
import { renderQuiz } from './views/quiz.js';
import { renderChecklist } from './views/checklist.js';
import { renderTroubleshooter } from './views/troubleshooter.js';
import { renderReports } from './views/reports.js';
import { renderSearch } from './views/search-view.js';
import { renderNotes } from './views/notes.js';
import { renderSettings, applyTheme } from './views/settings.js';

// Apply saved theme immediately
const savedTheme = localStorage.getItem('fn_theme') || 'system';
applyTheme(savedTheme);

// Initialize App Shell HTML
const app = document.getElementById('app');
app.innerHTML = `
  <header class="top-bar">
    <div class="top-bar-title" onclick="location.hash='#/'" style="cursor: pointer;">
      <span style="color: var(--primary); display: flex;">${icon('network', 22)}</span>
      <span>FieldNet Belajar</span>
    </div>
    <div class="top-bar-actions">
      <a href="#/search" class="btn btn-icon" title="Cari">
        ${icon('search', 20)}
      </a>
      <a href="#/notes" class="btn btn-icon" title="Catatan">
        ${icon('bookmark', 20)}
      </a>
    </div>
  </header>

  <main id="main-content" class="main-content"></main>

  <nav class="bottom-nav">
    <a href="#/" class="nav-item">
      ${icon('home', 20)}
      <span>Beranda</span>
    </a>
    <a href="#/modules" class="nav-item">
      ${icon('book-open', 20)}
      <span>Modul</span>
    </a>
    <a href="#/checklist" class="nav-item">
      ${icon('check-square', 20)}
      <span>Checklist</span>
    </a>
    <a href="#/reports" class="nav-item">
      ${icon('file-text', 20)}
      <span>Laporan</span>
    </a>
    <a href="#/settings" class="nav-item">
      ${icon('settings', 20)}
      <span>Atur</span>
    </a>
  </nav>
`;

const mainContent = document.getElementById('main-content');

// Configure routes
router
  .add('/', () => renderDashboard(mainContent))
  .add('/dashboard', () => renderDashboard(mainContent))
  .add('/modules', () => renderModules(mainContent))
  .add('/lesson/:id', (params) => renderLesson(mainContent, params))
  .add('/quiz/:id', (params) => renderQuiz(mainContent, params))
  .add('/checklist', (params) => renderChecklist(mainContent, params))
  .add('/troubleshoot', (params) => renderTroubleshooter(mainContent, params))
  .add('/troubleshoot/:case', (params) => renderTroubleshooter(mainContent, params))
  .add('/reports', () => renderReports(mainContent))
  .add('/search', () => renderSearch(mainContent))
  .add('/notes', () => renderNotes(mainContent))
  .add('/settings', () => renderSettings(mainContent))
  .add('*', () => renderDashboard(mainContent));

// Start routing
router.init();

// Register Service Worker for offline capability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => {
        // Service worker registered cleanly
      })
      .catch(() => {
        // Fallback gracefully without console noise
      });
  });
}
