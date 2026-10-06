/**
 * Content Validator for FieldNet Belajar
 * Validates uniform module schema, tone constraints, microcopy rules, and assets.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'content');

console.log('[Validator] Memeriksa manifest dan modul konten...');

const manifestPath = path.join(contentDir, 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('FAIL: manifest.json tidak ditemukan!');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
let errors = [];
let totalModules = 0;
let totalQuizzes = 0;
let totalChecklists = 0;

if (!manifest.version || !Array.isArray(manifest.modules)) {
  errors.push('Manifest tidak memiliki version atau array modules yang valid');
}

for (const meta of manifest.modules) {
  totalModules++;
  const filePath = path.join(contentDir, `${meta.id}.json`);
  if (!fs.existsSync(filePath)) {
    errors.push(`Berkas modul ${meta.id}.json tidak ditemukan!`);
    continue;
  }

  const mod = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 1. Required keys
  const requiredKeys = ['id', 'title', 'badge', 'intro', 'objectives', 'sections', 'realCommands', 'fieldChecklist', 'quiz', 'summary3Points'];
  for (const k of requiredKeys) {
    if (!mod[k]) {
      errors.push(`[${meta.id}] Properti wajib '${k}' hilang.`);
    }
  }

  // 2. Title max 2 words
  if (mod.title) {
    const wordCount = mod.title.trim().split(/\s+/).length;
    if (wordCount > 2) {
      errors.push(`[${meta.id}] Judul '${mod.title}' lebih dari 2 kata (${wordCount} kata).`);
    }
  }

  // 3. Objectives must be array
  if (!Array.isArray(mod.objectives) || mod.objectives.length === 0) {
    errors.push(`[${meta.id}] Objectives harus berupa array tidak kosong.`);
  }

  // 4. Summary must be exactly 3 points
  if (!Array.isArray(mod.summary3Points) || mod.summary3Points.length !== 3) {
    errors.push(`[${meta.id}] summary3Points harus berisi tepat 3 poin (sekarang: ${mod.summary3Points?.length}).`);
  }

  // 5. Sections check
  if (!Array.isArray(mod.sections) || mod.sections.length === 0) {
    errors.push(`[${meta.id}] Sections harus berupa array tidak kosong.`);
  } else {
    for (let si = 0; si < mod.sections.length; si++) {
      const sec = mod.sections[si];
      if (!sec.title || !sec.paragraphs) {
        errors.push(`[${meta.id}][sec ${si}] Section harus memiliki title dan paragraphs.`);
      }
      // Check paragraph length (max 4 sentences)
      if (Array.isArray(sec.paragraphs)) {
        for (let pi = 0; pi < sec.paragraphs.length; pi++) {
          const p = sec.paragraphs[pi];
          // Count sentences roughly by delimiters . ! ?
          const sentences = p.split(/[.!?]+/).filter(s => s.trim().length > 0);
          if (sentences.length > 4) {
            errors.push(`[${meta.id}][sec ${si}][p ${pi}] Paragraf memiliki ${sentences.length} kalimat (maksimal 4!).`);
          }
        }
      }
      // Check steps if present
      if (sec.steps && Array.isArray(sec.steps)) {
        for (const st of sec.steps) {
          if (!st.step || !st.title || !st.why) {
            errors.push(`[${meta.id}] Step harus memiliki step, title, dan why.`);
          }
        }
      }
    }
  }

  // 6. Checklist
  if (!Array.isArray(mod.fieldChecklist) || mod.fieldChecklist.length === 0) {
    errors.push(`[${meta.id}] fieldChecklist harus berupa array tidak kosong.`);
  } else {
    totalChecklists += mod.fieldChecklist.length;
  }

  // 7. Quiz check
  if (!Array.isArray(mod.quiz) || mod.quiz.length === 0) {
    errors.push(`[${meta.id}] quiz harus berupa array tidak kosong.`);
  } else {
    totalQuizzes += mod.quiz.length;
    for (let qi = 0; qi < mod.quiz.length; qi++) {
      const q = mod.quiz[qi];
      if (!q.question || !Array.isArray(q.options) || typeof q.answer !== 'number' || !q.explanation) {
        errors.push(`[${meta.id}][quiz ${qi}] Format kuis tidak lengkap.`);
      }
      if (q.answer < 0 || q.answer >= q.options.length) {
        errors.push(`[${meta.id}][quiz ${qi}] Indeks jawaban kuis tidak valid.`);
      }
    }
    // Ensure module has imageSlot
    let hasImageSlot = false;
    if (Array.isArray(mod.sections)) {
      for (const sec of mod.sections) {
        if (sec.imageSlot && sec.imageSlot.filename) {
          hasImageSlot = true;
          break;
        }
      }
    }
    if (!hasImageSlot) {
      errors.push(`[${meta.id}] Modul harus memiliki setidaknya satu 'imageSlot'.`);
    }
  }
}

// 8. Validate Image Prompts Coverage
const imagePromptsPath = path.join(rootDir, 'IMAGE_PROMPTS.md');
if (fs.existsSync(imagePromptsPath)) {
  const imagePromptsContent = fs.readFileSync(imagePromptsPath, 'utf8');
  for (const meta of manifest.modules) {
    const mod = JSON.parse(fs.readFileSync(path.join(contentDir, `${meta.id}.json`), 'utf8'));
    if (Array.isArray(mod.sections)) {
      for (const sec of mod.sections) {
        if (sec.imageSlot && sec.imageSlot.filename) {
          if (!imagePromptsContent.includes(sec.imageSlot.filename)) {
            errors.push(`[${meta.id}] Gambar '${sec.imageSlot.filename}' tidak terdaftar di IMAGE_PROMPTS.md`);
          }
        }
      }
    }
  }
} else {
  errors.push('IMAGE_PROMPTS.md tidak ditemukan!');
}

// 9. Validate Zero Placeholder and Zero Console in src/
const srcDir = path.join(rootDir, 'src');
function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full);
    } else if (f.endsWith('.js') || f.endsWith('.html')) {
      const code = fs.readFileSync(full, 'utf8');
      if (/placeholder\s*=/i.test(code)) {
        errors.push(`[${f}] Mengandung atribut 'placeholder' yang dilarang!`);
      }
      if (/console\.(log|error|warn|info)/.test(code)) {
        errors.push(`[${f}] Mengandung pemanggilan console.* yang dilarang!`);
      }
      // Check buttons for strictly 1 word
      const buttonMatches = code.matchAll(/<(?:button|a|label|span)[^>]*\bclass="[^"]*\bbtn\b[^"]*"[^>]*>([\s\S]*?)<\/(?:button|a|label|span)>/gi);
      for (const bm of buttonMatches) {
        let text = bm[1]
          .replace(/<[^>]+>/g, '')
          .replace(/\$\{[^}]+\}/g, '')
          .replace(/&nbsp;/g, ' ')
          .trim();
        if (text.length > 0) {
          const words = text.split(/\s+/).filter(w => w.length > 0);
          if (words.length > 1) {
            errors.push(`[${f}] Tombol '${text}' memiliki ${words.length} kata (wajib tepat 1 kata!).`);
          }
        }
      }
    }
  }
}
scanDir(srcDir);

// 10. Sync content/ to public/content, dist/content, and android assets
const pubContentDir = path.join(rootDir, 'public', 'content');
const distContentDir = path.join(rootDir, 'dist', 'content');
const androidPublicDir = path.join(rootDir, 'android', 'app', 'src', 'main', 'assets', 'public');
if (fs.existsSync(contentDir)) {
  fs.cpSync(contentDir, pubContentDir, { recursive: true });
  if (fs.existsSync(path.join(rootDir, 'dist'))) {
    fs.cpSync(contentDir, distContentDir, { recursive: true });
  }
}
if (fs.existsSync(path.join(rootDir, 'dist')) && fs.existsSync(androidPublicDir)) {
  fs.cpSync(path.join(rootDir, 'dist'), androidPublicDir, { recursive: true });
}

// 11. Validate Production Bundle and Service Worker in dist/
import zlib from 'node:zlib';
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  const assetsDir = path.join(distDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    const assetFiles = fs.readdirSync(assetsDir);
    const jsFiles = assetFiles.filter(f => f.endsWith('.js'));
    if (jsFiles.length === 0) {
      errors.push('dist/assets/ tidak memiliki berkas JavaScript produksi!');
    } else {
      for (const jf of jsFiles) {
        const jfPath = path.join(assetsDir, jf);
        const jfBuf = fs.readFileSync(jfPath);
        const gz = zlib.gzipSync(jfBuf);
        const gzKb = gz.length / 1024;
        if (gzKb > 200) {
          errors.push(`Ukuran bundle '${jf}' (${gzKb.toFixed(2)} KB gzip) melebihi batas 200 KB!`);
        }
      }
    }
  } else {
    errors.push('dist/assets/ tidak ditemukan!');
  }

  // Check dist/sw.js precache integrity
  const distSwPath = path.join(distDir, 'sw.js');
  if (fs.existsSync(distSwPath)) {
    const swCode = fs.readFileSync(distSwPath, 'utf8');
    const match = swCode.match(/const PRECACHE_ASSETS = \[([\s\S]*?)\];/);
    if (match) {
      const precacheUrls = match[1]
        .split('\n')
        .map(l => l.trim().replace(/^['"`\s]+|['"`,\s]+$/g, ''))
        .filter(l => l.length > 0 && !l.startsWith('//'));

      for (const url of precacheUrls) {
        if (url.startsWith('/src/')) {
          errors.push(`dist/sw.js memuat aset dev '/src/' yang tidak ada di dist: ${url}`);
        } else {
          let testPath = url === '/' ? path.join(distDir, 'index.html') : path.join(distDir, url.replace(/^\//, ''));
          if (!fs.existsSync(testPath)) {
            errors.push(`Aset precache dist/sw.js '${url}' tidak ditemukan di berkas fisik dist (${testPath})!`);
          }
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`Ditemukan ${errors.length} masalah validasi:`);
  errors.forEach(e => console.error(' - ' + e));
  process.exit(1);
} else {
  console.log(`[SUKSES] Validasi lulus! ${totalModules} modul, ${totalQuizzes} soal kuis, ${totalChecklists} butir checklist, bebas placeholder & console, bundle gzip < 200KB, precache 100% valid, terverifikasi.`);
}
