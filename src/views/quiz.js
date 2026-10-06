/**
 * FieldNet Belajar - Quiz Engine View
 * Randomized question order, multiple choice and true/false, scoring, and explanation.
 */

import { db } from '../db.js';
import { icon } from '../icons.js';

export async function renderQuiz(container, params) {
  const moduleId = params.id || 'module-01';

  let mod = null;
  try {
    const res = await fetch(`/content/${moduleId}.json`);
    mod = await res.json();
  } catch (err) {
    container.innerHTML = `<div class="card"><p>Kuis tidak ditemukan.</p><a href="#/modules" class="btn btn-primary">Kembali</a></div>`;
    return;
  }

  // Shuffle questions copy
  const questions = [...mod.quiz].sort(() => Math.random() - 0.5);
  let currentIndex = 0;
  let userAnswers = {};
  let isFinished = false;

  function renderQuestion() {
    if (isFinished) {
      renderResult();
      return;
    }

    const q = questions[currentIndex];
    const selectedOption = userAnswers[currentIndex];
    const hasAnswered = selectedOption !== undefined;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        <!-- Top Nav -->
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <a href="#/lesson/${mod.id}" class="btn btn-icon" title="Kembali">
            ${icon('arrow-left', 20)}
          </a>
          <div style="text-align: center;">
            <span style="font-size: var(--text-xs); color: var(--primary); font-weight: 700; text-transform: uppercase;">
              Kuis ${mod.title}
            </span>
            <div style="font-size: var(--text-sm); font-weight: 600;">
              Soal ${currentIndex + 1} dari ${questions.length}
            </div>
          </div>
          <div style="width: 44px;"></div>
        </div>

        <!-- Progress Bar -->
        <div class="progress-container">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${((currentIndex + 1) / questions.length) * 100}%;"></div>
          </div>
        </div>

        <!-- Question Card -->
        <div class="card quiz-card">
          <h2 style="font-size: var(--text-base); line-height: 1.5;">${q.question}</h2>

          <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-2);">
            ${q.options.map((opt, optIdx) => {
              let optClass = 'quiz-option';
              if (hasAnswered) {
                if (optIdx === q.answer) {
                  optClass += ' correct';
                } else if (optIdx === selectedOption) {
                  optClass += ' wrong';
                }
              } else if (optIdx === selectedOption) {
                optClass += ' selected';
              }

              return `
                <div class="${optClass}" role="button" tabindex="${hasAnswered ? '-1' : '0'}" data-index="${optIdx}" ${hasAnswered ? 'aria-disabled="true"' : ''}>
                  <span style="font-weight: 700; width: 24px;">${String.fromCharCode(65 + optIdx)}.</span>
                  <span style="flex: 1;">${opt}</span>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Explanation after answering -->
          ${hasAnswered ? `
            <div class="quiz-explanation">
              <strong>${selectedOption === q.answer ? 'Jawaban Tepat!' : 'Belum Tepat'}</strong>
              <p style="margin-top: 4px; font-size: var(--text-xs); line-height: 1.5;">${q.explanation}</p>
            </div>
          ` : ''}

          <!-- Navigation Action -->
          <div style="display: flex; justify-content: flex-end; margin-top: var(--space-2);">
            ${hasAnswered ? `
              <button id="btn-next-q" class="btn btn-primary">
                ${currentIndex + 1 < questions.length ? 'Lanjut' : 'Selesai'}
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    // Option click & keyboard listener
    container.querySelectorAll('.quiz-option').forEach(el => {
      if (hasAnswered) return;
      const selectHandler = () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        userAnswers[currentIndex] = idx;
        renderQuestion();
      };
      el.addEventListener('click', selectHandler);
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectHandler();
        }
      });
    });

    // Next question listener
    const btnNext = container.querySelector('#btn-next-q');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentIndex + 1 < questions.length) {
          currentIndex++;
          renderQuestion();
        } else {
          isFinished = true;
          saveAndRenderResult();
        }
      });
    }
  }

  async function saveAndRenderResult() {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) correctCount++;
    });
    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= 75;

    // Save to IndexedDB
    await db.quizResults.put({
      moduleId: mod.id,
      score,
      passed,
      takenAt: Date.now()
    });

    if (passed) {
      await db.progress.put({
        moduleId: mod.id,
        completed: true,
        updatedAt: Date.now()
      });
    }

    renderResult(score, passed, correctCount);
  }

  function renderResult(score, passed, correctCount) {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: var(--space-4); text-align: center;">
        <div class="card" style="padding: var(--space-6); gap: var(--space-4);">
          <div style="width: 72px; height: 72px; border-radius: 50%; background: ${passed ? 'var(--primary-surface)' : 'var(--accent-red-surface)'}; color: ${passed ? 'var(--primary)' : 'var(--accent-red)'}; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
            ${icon(passed ? 'award' : 'alert-triangle', 36)}
          </div>

          <div>
            <h1>${passed ? 'Lulus Kuis' : 'Belum Lulus'}</h1>
            <p style="font-size: var(--text-sm); color: var(--text-muted); margin-top: var(--space-1);">
              ${passed ? 'Selamat, pemahaman teknis kamu di modul ini sudah teruji.' : 'Pelajari kembali materi sebelum mencoba kuis ulang.'}
            </p>
          </div>

          <div style="font-size: var(--text-2xl); font-weight: 800; color: ${passed ? 'var(--primary)' : 'var(--accent-red)'};">
            ${score}%
          </div>

          <div style="font-size: var(--text-sm); color: var(--text-secondary);">
            Benar ${correctCount} dari ${questions.length} soal
          </div>

          <div style="display: flex; gap: var(--space-3); margin-top: var(--space-3);">
            <button id="btn-retry" class="btn btn-secondary" style="flex: 1;">Ulang</button>
            <a href="#/modules" class="btn btn-primary" style="flex: 1;">Lanjut</a>
          </div>
        </div>
      </div>
    `;

    const btnRetry = container.querySelector('#btn-retry');
    if (btnRetry) {
      btnRetry.addEventListener('click', () => {
        currentIndex = 0;
        userAnswers = {};
        isFinished = false;
        renderQuestion();
      });
    }
  }

  renderQuestion();
}
