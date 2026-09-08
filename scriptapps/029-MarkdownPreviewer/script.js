const input = document.querySelector("#markdown-input");
const preview = document.querySelector("#preview");
const status = document.querySelector("#status");
const escapeHtml = value => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
function inline(text) {
  let safe = escapeHtml(text);
  safe = safe.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/__([^_]+)__/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>").replace(/_([^_]+)_/g, "<em>$1</em>");
  return safe.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}
function renderMarkdown(markdown) {
  const rows = markdown.replace(/\r\n?/g, "\n").split("\n"); let html = ""; let paragraph = []; let listType = null; let inCode = false; let code = [];
  const closeList = () => { if (listType) { html += `</${listType}>`; listType = null; } };
  const flushParagraph = () => { if (paragraph.length) { html += `<p>${inline(paragraph.join(" "))}</p>`; paragraph = []; } };
  rows.forEach(row => {
    if (row.startsWith("```")) { flushParagraph(); closeList(); if (inCode) { html += `<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`; code = []; } inCode = !inCode; return; }
    if (inCode) { code.push(row); return; }
    if (!row.trim()) { flushParagraph(); closeList(); return; }
    const heading = row.match(/^(#{1,3})\s+(.+)$/); if (heading) { flushParagraph(); closeList(); html += `<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`; return; }
    if (/^\s*(---+|\*\s*\*\s*\*)\s*$/.test(row)) { flushParagraph(); closeList(); html += "<hr>"; return; }
    const quote = row.match(/^>\s?(.*)$/); if (quote) { flushParagraph(); closeList(); html += `<blockquote>${inline(quote[1])}</blockquote>`; return; }
    const item = row.match(/^\s*[-*+]\s+(.+)$/); const numbered = row.match(/^\s*\d+[.)]\s+(.+)$/); if (item || numbered) { flushParagraph(); const desired = numbered ? "ol" : "ul"; if (listType !== desired) { closeList(); listType = desired; html += `<${listType}>`; } html += `<li>${inline((item || numbered)[1])}</li>`; return; }
    closeList(); paragraph.push(row.trim());
  });
  flushParagraph(); closeList(); if (inCode) html += `<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`; return html || "<p class=\"empty-preview\">Your preview will appear here.</p>";
}
function update() { preview.innerHTML = renderMarkdown(input.value); const chars = input.value.length; const words = input.value.trim() ? input.value.trim().split(/\s+/).length : 0; document.querySelector("#character-count").textContent = `${chars.toLocaleString()} characters`; document.querySelector("#word-count").textContent = `${words.toLocaleString()} words`; status.textContent = input.value ? "Preview updated locally." : "Ready to write."; }
function download() { const body = renderMarkdown(input.value); const documentText = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Markdown export</title><style>body{max-width:760px;margin:40px auto;padding:0 20px;font:16px/1.6 system-ui}pre{background:#eee;padding:14px;overflow:auto}blockquote{border-left:4px solid #aaa;padding-left:14px}</style></head><body>${body}</body></html>`; const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([documentText], { type: "text/html" })); link.download = "markdown-export.html"; link.click(); URL.revokeObjectURL(link.href); status.textContent = "HTML download prepared."; }
input.addEventListener("input", update); document.querySelector("#download-button").addEventListener("click", download); document.querySelector("#clear-button").addEventListener("click", () => { input.value = ""; update(); });
document.querySelectorAll("[data-insert]").forEach(button => button.addEventListener("click", () => { const start = input.selectionStart; const end = input.selectionEnd; const value = button.dataset.insert; input.value = input.value.slice(0, start) + value + input.value.slice(end); input.focus(); input.setSelectionRange(start + value.length, start + value.length); update(); }));
input.value = "# A small note\n\nWrite **clearly**, then preview it.\n\n- Fast\n- Local\n\n[Learn Markdown](https://commonmark.org/help/)"; update();
