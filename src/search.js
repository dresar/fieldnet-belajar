/**
 * FieldNet Belajar - Offline Full-Text Search
 * Searches across titles, analogies, steps, commands, and checklists with instant results.
 */

let cachedModules = null;

export async function loadSearchIndex() {
  if (cachedModules) return cachedModules;

  try {
    const manifestRes = await fetch('/content/manifest.json');
    const manifest = await manifestRes.json();
    
    const modules = await Promise.all(
      manifest.modules.map(async (m) => {
        try {
          const res = await fetch(`/content/${m.id}.json`);
          return await res.json();
        } catch {
          return null;
        }
      })
    );

    cachedModules = modules.filter(Boolean);
    return cachedModules;
  } catch {
    return [];
  }
}

export async function searchContent(query) {
  if (!query || query.trim().length < 2) return [];

  const modules = await loadSearchIndex();
  const q = query.toLowerCase().trim();
  const results = [];

  for (const mod of modules) {
    // 1. Match title or intro
    if (mod.title.toLowerCase().includes(q) || mod.intro.toLowerCase().includes(q)) {
      results.push({
        moduleId: mod.id,
        moduleTitle: mod.title,
        badge: mod.badge,
        matchType: 'Modul',
        title: mod.title,
        snippet: mod.intro.slice(0, 120) + '...',
        link: `#/lesson/${mod.id}`
      });
    }

    // 2. Match sections
    if (Array.isArray(mod.sections)) {
      mod.sections.forEach((sec, idx) => {
        const text = (sec.title + ' ' + (sec.analogy || '') + ' ' + (sec.paragraphs || []).join(' ')).toLowerCase();
        if (text.includes(q)) {
          let snippet = sec.analogy || sec.paragraphs?.[0] || '';
          if (snippet.length > 120) snippet = snippet.slice(0, 120) + '...';

          results.push({
            moduleId: mod.id,
            moduleTitle: mod.title,
            badge: mod.badge,
            matchType: 'Materi',
            title: sec.title,
            snippet: snippet,
            link: `#/lesson/${mod.id}?sec=${idx}`
          });
        }
      });
    }

    // 3. Match realCommands
    if (Array.isArray(mod.realCommands)) {
      mod.realCommands.forEach((cmd) => {
        const text = (cmd.title + ' ' + cmd.code + ' ' + cmd.explanation).toLowerCase();
        if (text.includes(q)) {
          results.push({
            moduleId: mod.id,
            moduleTitle: mod.title,
            badge: 'Konfigurasi',
            matchType: 'Perintah',
            title: cmd.title,
            snippet: cmd.code.slice(0, 100) + '...',
            link: `#/lesson/${mod.id}`
          });
        }
      });
    }

    // 4. Match field checklist
    if (Array.isArray(mod.fieldChecklist)) {
      mod.fieldChecklist.forEach((chk) => {
        const text = (chk.text + ' ' + chk.tip).toLowerCase();
        if (text.includes(q)) {
          results.push({
            moduleId: mod.id,
            moduleTitle: mod.title,
            badge: 'Checklist',
            matchType: 'Checklist',
            title: chk.text,
            snippet: chk.tip,
            link: `#/checklist?mod=${mod.id}`
          });
        }
      });
    }
  }

  return results.slice(0, 25);
}
