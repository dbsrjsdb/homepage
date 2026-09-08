import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

async function writeChanged(file, content) {
  const previous = await readFile(file).catch((error) => {
    if (error.code !== 'ENOENT') throw error;
    return null;
  });
  if (!previous?.equals(Buffer.from(content))) await writeFile(file, content);
}

// The supplied hub is the source of categories; the list supplies readable names.
const hub = await readFile('scriptapps/000-JSPlaygroundHub/script.js', 'utf8');
const rows = [...hub.matchAll(/^  (\[".*"\]),?$/gm)].map((match) =>
  JSON.parse(match[1]),
);
const lines = (await readFile('scriptapp_list.md', 'utf8')).trim().split('\n');
assert.equal(rows.length, 100, 'Expected all 100 catalog entries');
assert.equal(lines.length, 99, 'The supplied list covers apps 002–100');
const output = 'public/embedded/apps';
await mkdir(output, { recursive: true });
const projects = [];
for (const [, description, category, folder] of rows) {
  assert.match(folder, /^\d{3}-[A-Za-z0-9]+$/);
  const index = Number(folder.slice(0, 3));
  const title =
    index === 1 ? 'Text to QR Code' : lines[index - 2].split(' — ')[0];
  const slug = folder.toLowerCase();
  const source = path.join('scriptapps', folder);
  const target = path.join(output, slug);
  await mkdir(target, { recursive: true });
  for (const file of await readdir(source)) {
    if (
      file !== 'index.html' &&
      /\.(html|css|js|png|svg|jpg|webp|woff2?)$/.test(file)
    ) {
      await writeChanged(
        path.join(target, file),
        await readFile(path.join(source, file)),
      );
    }
  }
  let html = await readFile(path.join(source, 'index.html'), 'utf8');
  assert.match(html, /<\/head>/i);
  // Keep every app's DOM and script intact; theme only its outer presentation.
  html = html
    .replace(
      /<\/head>/i,
      '<link rel="stylesheet" href="../../theme.css">\n</head>',
    )
    .replace(/<\/body>/i, '<script src="../../frame.js"></script>\n</body>');
  await writeChanged(path.join(target, 'index.html'), html);
  projects.push({ title, description, category, slug, source: folder });
}
await writeChanged('data/apps.json', JSON.stringify(projects, null, 2) + '\n');
console.log(`Imported ${projects.length} apps with shared styling.`);
