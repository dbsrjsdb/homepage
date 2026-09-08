const input = document.querySelector("#json-input");
const formatted = document.querySelector("#formatted-output");
const tree = document.querySelector("#tree-output");
const status = document.querySelector("#status");
const sizeOutput = document.querySelector("#size-output");
let parsed;
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
function nodeHtml(value, label = "root") {
  if (value === null || typeof value !== "object") { const type = value === null ? "null" : typeof value; return `<div class="property"><span class="property-key">${escapeHtml(label)}:</span><span class="value-${type === "string" ? "string" : type === "number" ? "number" : type === "boolean" ? "boolean" : "null"}">${escapeHtml(value === null ? "null" : typeof value === "string" ? JSON.stringify(value) : value)}</span></div>`; }
  const entries = Array.isArray(value) ? value.map((item, index) => [index, item]) : Object.entries(value); const title = Array.isArray(value) ? `${label} [${entries.length}]` : `${label} {${entries.length}}`;
  return `<div class="node"><details open><summary>${escapeHtml(title)}</summary>${entries.length ? entries.map(([key, child]) => nodeHtml(child, key)).join("") : `<div class="empty-tree">Empty</div>`}</details></div>`;
}
function parse() { try { parsed = JSON.parse(input.value); return true; } catch (error) { parsed = undefined; formatted.textContent = "—"; tree.innerHTML = "<div class=\"empty-tree\">Valid JSON is required to build the explorer.</div>"; sizeOutput.textContent = "0 characters"; status.className = "status error"; status.textContent = input.value ? `Invalid JSON: ${error.message}` : "Enter JSON to begin."; return false; } }
function validate() { if (!parse()) return false; const pretty = JSON.stringify(parsed, null, 2); formatted.textContent = pretty; tree.innerHTML = nodeHtml(parsed); sizeOutput.textContent = `${pretty.length.toLocaleString()} characters`; status.className = "status"; status.textContent = "Valid JSON. Explorer updated."; return true; }
document.querySelector("#validate-button").addEventListener("click", validate);
document.querySelector("#prettify-button").addEventListener("click", () => { if (validate()) { input.value = JSON.stringify(parsed, null, 2); status.textContent = "JSON prettified locally."; } });
document.querySelector("#minify-button").addEventListener("click", () => { if (validate()) { input.value = JSON.stringify(parsed); formatted.textContent = input.value; sizeOutput.textContent = `${input.value.length.toLocaleString()} characters`; status.textContent = "JSON minified locally."; } });
document.querySelector("#copy-button").addEventListener("click", async () => { if (parsed === undefined) return; try { await navigator.clipboard.writeText(formatted.textContent); status.textContent = "Formatted JSON copied to the clipboard."; } catch { status.textContent = "Copy was unavailable; select the formatted output manually."; status.className = "status error"; } });
document.querySelector("#clear-button").addEventListener("click", () => { input.value = ""; parsed = undefined; formatted.textContent = "—"; tree.textContent = "Validate JSON to explore it."; sizeOutput.textContent = "0 characters"; status.className = "status"; status.textContent = "Ready to validate."; });
document.querySelector("#expand-button").addEventListener("click", () => tree.querySelectorAll("details").forEach(item => item.open = true));
document.querySelector("#collapse-button").addEventListener("click", () => tree.querySelectorAll("details").forEach(item => item.open = false));
input.value = '{"project":"Local tools","features":["format","validate","explore"],"active":true,"version":1}'; validate();
