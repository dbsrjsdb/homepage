import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, access } from 'node:fs/promises';
import vm from 'node:vm';
import { projects, categories, filterProjects } from '../data/projects.ts';

test('all 100 catalog apps have executable sources and complete embedded assets', async () => {
  assert.equal(projects.length, 100);
  assert.equal(new Set(projects.map((app) => app.slug)).size, 100);
  for (const app of projects) {
    const root = `public/embedded/apps/${app.slug}`;
    const html = await readFile(`${root}/index.html`, 'utf8');
    const script = await readFile(`${root}/script.js`, 'utf8');
    new vm.Script(script, { filename: app.source });
    assert.equal(
      script,
      await readFile(`scriptapps/${app.source}/script.js`, 'utf8'),
    );
    assert.match(html, /href="\.\.\/\.\.\/theme.css"/);
    assert.match(html, /src="\.\.\/\.\.\/frame.js"/);
    for (const [, asset] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
      if (!/^(https?:|data:|blob:|mailto:)/.test(asset))
        await access(`${root}/${asset}`);
    }
  }
});

test('search is case insensitive, trims whitespace, combines words and category, and handles no results', () => {
  assert.equal(
    filterProjects('  image CONVERTER ', 'All')[0].slug,
    '006-imageformatconverter',
  );
  assert.equal(filterProjects('', 'All').length, 100);
  assert.equal(filterProjects('impossible-app-name', 'All').length, 0);
  assert.equal(filterProjects('image', 'Games').length, 0);
  for (const category of categories) {
    assert.ok(filterProjects('', category).length > 0);
    assert.ok(
      filterProjects('', category).every((app) => app.category === category),
    );
  }
});

test('frame sizing reports real content height and handles apps without footers', async () => {
  const script = await readFile('public/embedded/frame.js', 'utf8');
  for (const footer of [
    null,
    { getBoundingClientRect: () => ({ bottom: 630 }) },
  ]) {
    const calls = [];
    vm.runInNewContext(script, {
      document: {
        querySelector: (selector) =>
          selector === 'main'
            ? { getBoundingClientRect: () => ({ bottom: 500 }) }
            : footer,
      },
      parent: { postMessage: (...args) => calls.push(args) },
      location: { origin: 'https://example.test' },
      scrollY: 0,
      requestAnimationFrame: (fn) => fn(),
      addEventListener: () => {},
      ResizeObserver: class {
        observe() {}
      },
    });
    assert.equal(calls[0][0].height, footer ? 638 : 508);
    assert.equal(calls[0][1], 'https://example.test');
  }
});

test('password tools do not overstate memorable-password or short-passphrase strength', async () => {
  for (const [folder, expected] of [
    ['024-PasswordGenerator', 'Not estimated'],
    ['025-PassphraseGenerator', 'Weak'],
  ]) {
    const elements = new Map();
    const get = (selector) => {
      if (!elements.has(selector))
        elements.set(selector, {
          value:
            selector === '#length-input'
              ? '16'
              : selector === '#word-count'
                ? '4'
                : '-',
          checked: selector === '#memorable-input',
          style: {},
          addEventListener() {},
        });
      return elements.get(selector);
    };
    vm.runInNewContext(
      await readFile(`scriptapps/${folder}/script.js`, 'utf8'),
      {
        document: { querySelector: get, querySelectorAll: () => [] },
        crypto: globalThis.crypto,
        Uint32Array,
      },
    );
    assert.equal(get('#strength-label').textContent, expected);
  }
});

test('reimporting unchanged apps does not interrupt the running development server', async () => {
  const { stat } = await import('node:fs/promises');
  const files = [
    'data/apps.json',
    'public/embedded/apps/001-stringtoqr/index.html',
    'public/embedded/apps/001-stringtoqr/script.js',
  ];
  const before = await Promise.all(
    files.map(async (file) => (await stat(file)).mtimeMs),
  );
  await import('../scripts/import-apps.mjs');
  assert.deepEqual(
    await Promise.all(files.map(async (file) => (await stat(file)).mtimeMs)),
    before,
  );
});
