const sets = { lower: "abcdefghijklmnopqrstuvwxyz", upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", numbers: "0123456789", symbols: "!@#$%^&*()-_=+[]{};:,.?" };
const words = ["amber", "anchor", "apricot", "arrow", "atlas", "bamboo", "beacon", "birch", "canyon", "cedar", "cinder", "cloud", "cobalt", "comet", "coral", "cricket", "dawn", "dune", "ember", "falcon", "fern", "flint", "forest", "glacier", "harbor", "hazel", "island", "jasmine", "lantern", "maple", "meadow", "mosaic", "otter", "pebble", "planet", "raven", "river", "saffron", "solar", "spruce", "thunder", "velvet", "willow", "zephyr"];
const lengthInput = document.querySelector("#length-input");
const lengthValue = document.querySelector("#length-value");
const memorableInput = document.querySelector("#memorable-input");
const output = document.querySelector("#password-output");
const status = document.querySelector("#status");
const entropyOutput = document.querySelector("#entropy-output");
const poolOutput = document.querySelector("#pool-output");
const strengthBar = document.querySelector("#strength-bar");
const strengthLabel = document.querySelector("#strength-label");
const randomInt = max => { const values = new Uint32Array(1); const limit = Math.floor(0x100000000 / max) * max; do { crypto.getRandomValues(values); } while (values[0] >= limit); return values[0] % max; };
const randomChar = chars => chars[randomInt(chars.length)];
function memorable(length) { let result = ""; while (result.length < length) result += (result ? "-" : "") + words[randomInt(words.length)]; const digits = String(randomInt(100)).padStart(2, "0"); result = result.slice(0, Math.max(0, length - 3)) + digits; return result.slice(0, length); }
function getPool() { return [...document.querySelectorAll(".charset:checked")].map(input => sets[input.dataset.set]).join(""); }
function strength(entropy) { if (entropy < 45) return ["Weak", "#ff6f61", 25]; if (entropy < 65) return ["Good", "#ffbd68", 55]; if (entropy < 90) return ["Strong", "#c7f36b", 78]; return ["Excellent", "#6fe7bb", 100]; }
function generate() {
  lengthValue.textContent = lengthInput.value;
  const length = Number(lengthInput.value);
  const pool = getPool();
  if (!memorableInput.checked && !pool) { output.textContent = "—"; status.textContent = "Select at least one character set."; status.className = "status error"; entropyOutput.textContent = "—"; poolOutput.textContent = "—"; strengthBar.style.width = "0"; strengthLabel.textContent = "—"; return; }
  const password = memorableInput.checked ? memorable(length) : Array.from({ length }, () => randomChar(pool)).join("");
  const effectivePool = pool.length;
  const entropy = Math.round(length * Math.log2(effectivePool));
  const [label, color, width] = memorableInput.checked ? ["Not estimated", "#aaa", 0] : strength(entropy);
  output.textContent = password; status.className = "status"; status.textContent = memorableInput.checked ? "Memorable password generated locally." : "Random password generated locally."; entropyOutput.textContent = memorableInput.checked ? "Not estimated" : `${entropy} bits`; poolOutput.textContent = memorableInput.checked ? `${words.length} words + numbers` : `${pool.length} characters`;
  strengthBar.style.width = `${width}%`; strengthBar.style.background = color; strengthLabel.textContent = label;
}
lengthInput.addEventListener("input", generate); memorableInput.addEventListener("change", generate); document.querySelectorAll(".charset").forEach(input => input.addEventListener("change", generate));
document.querySelector("#generate-button").addEventListener("click", generate);
document.querySelector("#copy-button").addEventListener("click", async () => { if (output.textContent === "—") return; try { await navigator.clipboard.writeText(output.textContent); status.textContent = "Password copied to the clipboard."; } catch { status.textContent = "Copy was unavailable; select the password manually."; status.className = "status error"; } });
generate();
