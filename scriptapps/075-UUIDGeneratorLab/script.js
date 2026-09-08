const quantity = document.querySelector("#quantity");
const formatCase = document.querySelector("#case");
const hyphens = document.querySelector("#hyphens");
const list = document.querySelector("#list");
const empty = document.querySelector("#empty");
const status = document.querySelector("#status");
const count = document.querySelector("#count");
const copyAll = document.querySelector("#copy");
let values = [];

function fallbackUuid() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  return [...bytes].map(byte => byte.toString(16).padStart(2, "0")).join("").replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");
}

function makeUuid() {
  return typeof crypto.randomUUID === "function" ? crypto.randomUUID() : fallbackUuid();
}

function inspect(uuid) {
  const parts = uuid.split("-");
  return { version: uuid[14], variant: (parseInt(uuid[19], 16) & 8) === 8 ? "RFC 4122" : "other", groups: parts.length };
}

function render() {
  const display = values.map(value => formatCase.value === "upper" ? value.toUpperCase() : value).map(value => hyphens.checked ? value : value.replaceAll("-", ""));
  empty.hidden = display.length > 0;
  list.innerHTML = display.map((value, index) => {
    const original = values[index];
    const details = inspect(original);
    return `<article class="uuid-row"><div><div class="uuid-main"><span class="uuid-index">${String(index + 1).padStart(2, "0")}</span><code class="uuid-value">${value}</code></div><div class="uuid-meta"><span class="chip">version ${details.version}</span><span class="chip">${details.variant} variant</span><span class="chip">${details.groups} groups</span></div></div><button class="uuid-copy" type="button" data-value="${value}">Copy</button></article>`;
  }).join("");
  count.textContent = values.length;
  copyAll.disabled = values.length === 0;
  list.querySelectorAll(".uuid-copy").forEach(button => button.addEventListener("click", async () => {
    await copyText(button.dataset.value, "UUID copied to the clipboard.");
  }));
}

async function copyText(value, message) {
  try { await navigator.clipboard.writeText(value); status.textContent = message; status.className = "status good"; }
  catch { status.textContent = "Clipboard access is unavailable; select the value and copy it manually."; status.className = "status"; }
}

document.querySelector("#generate").addEventListener("click", () => {
  const requested = Math.min(100, Math.max(1, Number.parseInt(quantity.value, 10) || 1));
  quantity.value = requested;
  values = Array.from({ length: requested }, makeUuid);
  render();
  status.textContent = `${requested} UUID${requested === 1 ? "" : "s"} generated locally.`;
  status.className = "status good";
});
formatCase.addEventListener("change", render);
hyphens.addEventListener("change", render);
copyAll.addEventListener("click", () => copyText(values.map(value => formatCase.value === "upper" ? value.toUpperCase() : value).map(value => hyphens.checked ? value : value.replaceAll("-", "")).join("\n"), "All UUIDs copied to the clipboard."));
document.querySelector("#clear").addEventListener("click", () => { values = []; render(); status.textContent = "Batch cleared."; status.className = "status"; });
render();
