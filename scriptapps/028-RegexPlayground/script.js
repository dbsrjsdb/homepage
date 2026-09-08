const patternInput = document.querySelector("#pattern-input");
const flagsInput = document.querySelector("#flags-input");
const testInput = document.querySelector("#test-input");
const output = document.querySelector("#highlight-output");
const details = document.querySelector("#details-output");
const status = document.querySelector("#status");
const matchCount = document.querySelector("#match-count");
const escapeHtml = value => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
function test() {
  let regex;
  try { regex = new RegExp(patternInput.value, flagsInput.value); } catch (error) { output.textContent = "Fix the pattern or flags to continue."; details.textContent = "No matches available."; matchCount.textContent = "0 matches"; status.className = "status error"; status.textContent = `Invalid regular expression: ${error.message}`; return; }
  const previewFlags = flagsInput.value.includes("g") ? flagsInput.value : `${flagsInput.value}g`;
  let scanner;
  try { scanner = new RegExp(patternInput.value, previewFlags.replace("y", "")); } catch (error) { status.className = "status error"; status.textContent = `Unable to scan matches: ${error.message}`; return; }
  const matches = []; let match;
  while ((match = scanner.exec(testInput.value)) !== null) { matches.push({ text: match[0], index: match.index, groups: match.slice(1) }); if (match[0] === "") scanner.lastIndex++; }
  let cursor = 0; let highlighted = "";
  matches.forEach(item => { highlighted += escapeHtml(testInput.value.slice(cursor, item.index)); highlighted += `<mark>${escapeHtml(item.text)}</mark>`; cursor = item.index + item.text.length; });
  output.innerHTML = highlighted + escapeHtml(testInput.value.slice(cursor));
  matchCount.textContent = `${matches.length} ${matches.length === 1 ? "match" : "matches"}`; status.className = "status"; status.textContent = matches.length ? `Found ${matches.length} ${matches.length === 1 ? "match" : "matches"}.` : "No matches found.";
  details.innerHTML = matches.length ? `<ol class="match-list">${matches.map(item => `<li><span>#${matches.indexOf(item) + 1}</span><code>${escapeHtml(item.text) || "(empty)"}</code><span>index ${item.index}${item.groups.length ? ` · ${item.groups.filter(Boolean).length} capture${item.groups.filter(Boolean).length === 1 ? "" : "s"}` : ""}</span></li>`).join("")}</ol>` : "No matches yet.";
}
document.querySelector("#test-button").addEventListener("click", test);
document.querySelector("#example-button").addEventListener("click", () => { patternInput.value = "https?://[^\\s]+"; flagsInput.value = "gi"; testInput.value = "Read https://example.com/docs or http://localhost:3000 today."; test(); });
document.querySelector("#clear-button").addEventListener("click", () => { patternInput.value = ""; flagsInput.value = ""; testInput.value = ""; output.textContent = "Run the pattern to see matches."; details.textContent = "No matches yet."; matchCount.textContent = "0 matches"; status.className = "status"; status.textContent = "Ready to test."; });
test();
