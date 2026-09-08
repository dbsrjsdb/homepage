const words = ["amber", "anchor", "apricot", "arrow", "atlas", "bamboo", "beacon", "birch", "canyon", "cedar", "cinder", "cloud", "cobalt", "comet", "coral", "cricket", "dawn", "dune", "ember", "falcon", "fern", "flint", "forest", "glacier", "harbor", "hazel", "island", "jasmine", "lantern", "maple", "meadow", "mosaic", "otter", "pebble", "planet", "raven", "river", "saffron", "solar", "spruce", "thunder", "velvet", "willow", "zephyr"];
const wordCount = document.querySelector("#word-count");
const wordCountValue = document.querySelector("#word-count-value");
const separator = document.querySelector("#separator");
const output = document.querySelector("#phrase-output");
const status = document.querySelector("#status");
const entropyOutput = document.querySelector("#entropy-output");
const poolOutput = document.querySelector("#pool-output");
const strengthBar = document.querySelector("#strength-bar");
const strengthLabel = document.querySelector("#strength-label");
const randomInt = max => { const values = new Uint32Array(1); const limit = Math.floor(0x100000000 / max) * max; do { crypto.getRandomValues(values); } while (values[0] >= limit); return values[0] % max; };
function generate() {
  const count = Number(wordCount.value);
  wordCountValue.textContent = count;
  const capitalize = document.querySelector("#capitalize").checked;
  const addNumber = document.querySelector("#add-number").checked;
  const chosen = Array.from({ length: count }, () => words[randomInt(words.length)]).map(word => capitalize ? word[0].toUpperCase() + word.slice(1) : word);
  let phrase = chosen.join(separator.value);
  if (addNumber) phrase += `${separator.value}${String(randomInt(100)).padStart(2, "0")}`;
  const entropy = Math.round(count * Math.log2(words.length) + (addNumber ? Math.log2(100) : 0));
  const [label, color, width] = entropy < 45 ? ["Weak", "#ff6f61", 25] : entropy < 65 ? ["Good", "#ffbd68", 55] : entropy < 90 ? ["Strong", "#c7f36b", 78] : ["Excellent", "#6fe7bb", 100];
  output.textContent = phrase; status.className = "status"; status.textContent = "A new passphrase was generated locally."; entropyOutput.textContent = `${entropy} bits`; poolOutput.textContent = `${words.length} words`; strengthBar.style.width = `${width}%`; strengthBar.style.background = color; strengthLabel.textContent = label;
}
document.querySelectorAll("#word-count, #separator, #capitalize, #add-number").forEach(control => control.addEventListener("input", generate));
document.querySelector("#generate-button").addEventListener("click", generate);
document.querySelector("#copy-button").addEventListener("click", async () => { if (output.textContent === "—") return; try { await navigator.clipboard.writeText(output.textContent); status.textContent = "Passphrase copied to the clipboard."; } catch { status.textContent = "Copy was unavailable; select the phrase manually."; status.className = "status error"; } });
generate();
