#!/usr/bin/env node
// Regenerates the <!-- PROJECTS --> block in README.md from the live GitHub
// API. Zero dependencies (Node 18+ global fetch). Driven by
// .github/projects.json. Run locally or from .github/workflows/update-readme.yml.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const USER = 'maxgfr';
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(HERE, '..', '..');
const CONFIG = JSON.parse(readFileSync(join(HERE, '..', 'projects.json'), 'utf8'));
const README_PATH = join(REPO_ROOT, 'README.md');

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': `${USER}-readme-bot` };
if (token) headers.Authorization = `Bearer ${token}`;

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status} ${await res.text()}`);
  return res.json();
}

async function allOwnedRepos() {
  const out = [];
  for (let page = 1; page < 20; page++) {
    const batch = await gh(`/users/${USER}/repos?per_page=100&page=${page}&type=owner&sort=full_name`);
    out.push(...batch);
    if (batch.length < 100) break;
  }
  // public, non-fork, non-archived, not explicitly excluded
  return out.filter(
    (r) => !r.private && !r.fork && !r.archived && !(CONFIG.exclude || []).includes(r.name)
  );
}

function linkLabel(url) {
  let host = '';
  try { host = new URL(url).host.toLowerCase(); } catch { return 'site'; }
  if (host.includes('npmjs.com')) return 'npm';
  if (host.includes('github.com') && url.includes('/marketplace/')) return 'marketplace';
  if (host === `${USER}.github.io`) return 'demo';
  return 'site';
}

function bullet(repo) {
  const d = (CONFIG.descriptions || {})[repo.name];
  const desc = (d && d.en) || repo.description || 'No description.';
  let line = `- **[${repo.name}](${repo.html_url})** — ${desc.trim()}`;
  const hp = (repo.homepage || '').trim();
  if (hp) line += ` · [${linkLabel(hp)}](${hp})`;
  return line;
}

// Collapsed-by-default category so the README stays short; expand to browse.
function details(title, lines) {
  return `<details>\n<summary><strong>${title}</strong> · ${lines.length}</summary>\n\n${lines.join('\n')}\n\n</details>`;
}

function renderProjects(repos) {
  const byName = new Map(repos.map((r) => [r.name, r]));
  const used = new Set();
  const out = [];
  for (const cat of CONFIG.categories) {
    const lines = [];
    for (const name of cat.repos) {
      const r = byName.get(name);
      if (!r) continue; // repo renamed/removed — silently skip
      used.add(name);
      lines.push(bullet(r));
    }
    if (lines.length) out.push(details(cat.title_en, lines));
  }
  // any owned public repo not placed in a category → surfaced, never dropped
  const leftover = repos
    .filter((r) => !used.has(r.name))
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
  if (leftover.length) {
    out.push(details((CONFIG.fallback && CONFIG.fallback.en) || '🆕 Uncategorized', leftover.map(bullet)));
  }
  return { md: out.join('\n\n'), count: used.size + leftover.length };
}

function replaceBlock(text, name, content) {
  const re = new RegExp(`(<!-- ${name}:START -->)[\\s\\S]*?(<!-- ${name}:END -->)`);
  if (!re.test(text)) throw new Error(`Marker block "${name}" not found in README.md`);
  return text.replace(re, `$1\n${content}\n$2`);
}

async function main() {
  const repos = await allOwnedRepos();
  const projects = renderProjects(repos);

  let readme = readFileSync(README_PATH, 'utf8');
  readme = replaceBlock(readme, 'PROJECTS', projects.md);
  writeFileSync(README_PATH, readme);

  console.log(`Generated: ${repos.length} repos, ${projects.count} project bullets.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
