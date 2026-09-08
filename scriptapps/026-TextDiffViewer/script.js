const beforeInput = document.querySelector("#before-input");
const afterInput = document.querySelector("#after-input");
const output = document.querySelector("#diff-output");
const status = document.querySelector("#status");
const ignoreWhitespace = document.querySelector("#ignore-whitespace");
const counts = { removed: document.querySelector("#removed-count"), added: document.querySelector("#added-count"), same: document.querySelector("#unchanged-count") };
const esc = value => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const lines = text => text.replace(/\r\n?/g, "\n").split("\n");
const key = (line, ignore) => ignore ? line.replace(/\s+/g, "").trim() : line;
function diff(left, right, ignore) {
  const a = lines(left); const b = lines(right); const width = a.length * b.length;
  if (width > 900000) throw new Error("These texts are too large to compare at once. Try a smaller section.");
  const table = Array.from({ length: a.length + 1 }, () => new Uint32Array(b.length + 1));
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) table[i][j] = key(a[i], ignore) === key(b[j], ignore) ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
  const result = []; let i = 0; let j = 0;
  while (i < a.length || j < b.length) { if (i < a.length && j < b.length && key(a[i], ignore) === key(b[j], ignore)) { result.push({ type: "same", left: a[i], right: b[j], leftNo: i + 1, rightNo: j + 1 }); i++; j++; } else if (j < b.length && (i === a.length || table[i][j + 1] >= table[i + 1][j])) { result.push({ type: "added", right: b[j], rightNo: j + 1 }); j++; } else { result.push({ type: "removed", left: a[i], leftNo: i + 1 }); i++; } }
  return result;
}
function render() {
  try {
    const result = diff(beforeInput.value, afterInput.value, ignoreWhitespace.checked);
    const stats = result.reduce((all, row) => { all[row.type]++; return all; }, { removed: 0, added: 0, same: 0 });
    counts.removed.textContent = stats.removed; counts.added.textContent = stats.added; counts.same.textContent = stats.same;
    output.innerHTML = `<table class="diff-table"><caption class="sr-only">Text comparison results</caption><thead><tr><th colspan="3">Before</th><th colspan="3">After</th></tr></thead><tbody>${result.map(row => `<tr class="${row.type}"><td class="line-no">${row.leftNo || ""}</td><td class="marker">${row.type === "removed" ? "−" : row.type === "same" ? " " : ""}</td><td>${row.left === undefined ? "" : esc(row.left)}</td><td class="line-no">${row.rightNo || ""}</td><td class="marker">${row.type === "added" ? "+" : row.type === "same" ? " " : ""}</td><td>${row.right === undefined ? "" : esc(row.right)}</td></tr>`).join("")}</tbody></table>`;
    status.className = "status"; status.textContent = stats.removed || stats.added ? `Found ${stats.removed} removed and ${stats.added} added ${stats.removed + stats.added === 1 ? "line" : "lines"}.` : "The texts are identical.";
  } catch (error) { output.innerHTML = `<div class="empty-state">${esc(error.message)}</div>`; status.className = "status error"; status.textContent = error.message; }
}
document.querySelector("#compare-button").addEventListener("click", render); ignoreWhitespace.addEventListener("change", render);
document.querySelector("#swap-button").addEventListener("click", () => { [beforeInput.value, afterInput.value] = [afterInput.value, beforeInput.value]; render(); });
document.querySelector("#clear-button").addEventListener("click", () => { beforeInput.value = ""; afterInput.value = ""; output.innerHTML = "<div class=\"empty-state\">Your highlighted comparison will appear here.</div>"; status.textContent = "Add two texts to begin."; status.className = "status"; Object.values(counts).forEach(count => count.textContent = "0"); });
beforeInput.value = "The quick brown fox\njumps over the lazy dog."; afterInput.value = "The quick red fox\njumps over the very lazy dog."; render();
