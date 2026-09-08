const entities = [
  ["&", "ampersand", "&amp;", "&", "punctuation"], ["<", "less-than", "&lt;", "&#60;", "punctuation"], [">", "greater-than", "&gt;", "&#62;", "punctuation"], ["\"", "quotation mark", "&quot;", "&#34;", "punctuation"], ["'", "apostrophe", "&apos;", "&#39;", "punctuation"], [" ", "non-breaking space", "&nbsp;", "&#160;", "punctuation"],
  ["©", "copyright", "&copy;", "&#169;", "symbols"], ["®", "registered trademark", "&reg;", "&#174;", "symbols"], ["™", "trade mark", "&trade;", "&#8482;", "symbols"], ["•", "bullet", "&bull;", "&#8226;", "symbols"], ["…", "horizontal ellipsis", "&hellip;", "&#8230;", "punctuation"], ["§", "section sign", "&sect;", "&#167;", "symbols"], ["♠", "black spade suit", "&spades;", "&#9824;", "symbols"], ["♥", "black heart suit", "&hearts;", "&#9829;", "symbols"],
  ["←", "left arrow", "&larr;", "&#8592;", "arrows"], ["→", "right arrow", "&rarr;", "&#8594;", "arrows"], ["↑", "up arrow", "&uarr;", "&#8593;", "arrows"], ["↓", "down arrow", "&darr;", "&#8595;", "arrows"], ["↔", "left-right arrow", "&harr;", "&#8596;", "arrows"], ["⇒", "right double arrow", "&rArr;", "&#8658;", "arrows"],
  ["±", "plus-minus sign", "&plusmn;", "&#177;", "math"], ["×", "multiplication sign", "&times;", "&#215;", "math"], ["÷", "division sign", "&divide;", "&#247;", "math"], ["≠", "not equal", "&ne;", "&#8800;", "math"], ["≤", "less than or equal", "&le;", "&#8804;", "math"], ["∞", "infinity", "&infin;", "&#8734;", "math"],
  ["€", "euro sign", "&euro;", "&#8364;", "currency"], ["£", "pound sign", "&pound;", "&#163;", "currency"], ["¥", "yen sign", "&yen;", "&#165;", "currency"], ["$", "dollar sign", "&dollar;", "&#36;", "currency"]
].map(([character, name, entity, decimal, category]) => ({ character, name, entity, decimal, category, hex: `U+${character.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}` }));

const search = document.querySelector("#search");
const category = document.querySelector("#category");
const list = document.querySelector("#list");
const empty = document.querySelector("#empty");
const resultCount = document.querySelector("#result-count");
const status = document.querySelector("#result-count");
const escapeHtml = value => String(value).replace(/[&<>\"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[character]));
const searchable = item => `${item.character} ${item.name} ${item.entity} ${item.decimal} ${item.hex}`.toLowerCase();

function render() {
  const query = search.value.trim().toLowerCase();
  const activeCategory = category.value;
  const matches = entities.filter(item => (!query || searchable(item).includes(query)) && (activeCategory === "all" || item.category === activeCategory));
  list.innerHTML = matches.map(item => `<article class="entity-card"><div class="entity-top"><span class="character" aria-label="${escapeHtml(item.name)}">${escapeHtml(item.character)}</span><span class="category">${escapeHtml(item.category)}</span></div><h3>${escapeHtml(item.name)}</h3><div class="code-line"><code>${escapeHtml(item.entity)}</code><button class="copy-button" type="button" data-copy="${escapeHtml(item.entity)}">Copy</button></div><div class="code-line"><code>${escapeHtml(item.decimal)}</code><button class="copy-button" type="button" data-copy="${escapeHtml(item.decimal)}">Copy</button></div><div class="code-line"><code>${escapeHtml(item.hex)}</code><button class="copy-button" type="button" data-copy="${escapeHtml(item.hex)}">Copy</button></div></article>`).join("");
  empty.hidden = matches.length > 0;
  resultCount.textContent = `${matches.length} ${matches.length === 1 ? "entity" : "entities"} shown${query ? ` for “${query}”` : ""}.`;
  list.querySelectorAll(".copy-button").forEach(button => button.addEventListener("click", () => copy(button.dataset.copy)));
}

async function copy(value) {
  try { await navigator.clipboard.writeText(value); status.textContent = `${value} copied to the clipboard.`; }
  catch { status.textContent = "Clipboard access is unavailable; select the value and copy it manually."; }
}

search.addEventListener("input", render);
category.addEventListener("change", render);
document.querySelector("#reset").addEventListener("click", () => { search.value = ""; category.value = "all"; render(); });
render();
