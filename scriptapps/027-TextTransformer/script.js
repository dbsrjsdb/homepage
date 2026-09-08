const input = document.querySelector("#input-text");
const output = document.querySelector("#output-text");
const status = document.querySelector("#status");
const inputCount = document.querySelector("#input-count");
const outputCount = document.querySelector("#output-count");
const option = id => document.querySelector(`#${id}`);
const countText = count => `${count.toLocaleString()} ${count === 1 ? "character" : "characters"}`;
function titleCase(text) { return text.toLowerCase().replace(/\b([a-z\u00c0-\u024f])/gi, match => match.toUpperCase()); }
function sentenceCase(text) { return text.toLowerCase().replace(/(^|[.!?]\s+)([a-z\u00c0-\u024f])/g, (_, prefix, letter) => prefix + letter.toUpperCase()); }
function transform() {
  const original = input.value;
  let text = original;
  const caseMode = option("case-select").value;
  if (caseMode === "upper") text = text.toUpperCase();
  if (caseMode === "lower") text = text.toLowerCase();
  if (caseMode === "title") text = titleCase(text);
  if (caseMode === "sentence") text = sentenceCase(text);
  let rows = text.replace(/\r\n?/g, "\n").split("\n");
  if (option("trim-lines").checked) rows = rows.map(row => row.trim());
  if (option("collapse-spaces").checked) rows = rows.map(row => row.replace(/[ \t]+/g, " "));
  if (option("dedupe-lines").checked) rows = [...new Set(rows)];
  if (option("sort-lines").checked) rows = rows.map((row, index) => ({ row, index })).sort((a, b) => a.row.localeCompare(b.row) || a.index - b.index).map(item => item.row);
  text = rows.join("\n"); output.value = text; inputCount.textContent = countText(original.length); outputCount.textContent = countText(text.length);
  status.className = "status"; status.textContent = original ? `Transformed ${rows.length} ${rows.length === 1 ? "line" : "lines"} locally.` : "Enter text to begin.";
}
document.querySelectorAll("#case-select, #trim-lines, #collapse-spaces, #sort-lines, #dedupe-lines").forEach(control => control.addEventListener("change", transform));
document.querySelector("#transform-button").addEventListener("click", transform);
document.querySelector("#copy-button").addEventListener("click", async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = "Output copied to the clipboard."; } catch { status.textContent = "Copy was unavailable; select the output manually."; status.className = "status error"; } });
document.querySelector("#clear-button").addEventListener("click", () => { input.value = ""; output.value = ""; inputCount.textContent = countText(0); outputCount.textContent = countText(0); status.textContent = "Enter text to begin."; status.className = "status"; });
input.value = "  The QUICK fox  \nThe quick fox\n  the quiet dog "; transform();
