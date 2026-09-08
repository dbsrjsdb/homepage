// Run against a running local server: npm run test:routes
import assert from 'node:assert/strict';
const origin = process.env.TEST_ORIGIN || 'http://localhost:3000';
for (const [path, status] of [
  ['/', 200], ['/script-apps', 200], ['/chat', 200],
  ['/installable-apps', 200], ['/template', 200],
  ['/script-apps?app=006-imageformatconverter', 200],
  ['/script-apps?app=100-tinyecosystemsimulator', 200],
  ['/script-apps?app=unknown', 404],
  ['/script-apps?app=006-imageformatconverter&app=051-snake', 404],
  ['/apps/unknown', 404],
]) {
  const response = await fetch(new URL(path, origin), { redirect: 'manual', signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, status, path);
  await response.arrayBuffer();
}
const oldBookmark = await fetch(new URL('/apps/006-imageformatconverter', origin), { redirect: 'manual' });
assert.equal(oldBookmark.status, 308);
assert.equal(new URL(oldBookmark.headers.get('location'), origin).pathname + new URL(oldBookmark.headers.get('location'), origin).search, '/script-apps?app=006-imageformatconverter');
console.log('Navigation routes, selected tools, invalid selections, and legacy redirects pass.');
