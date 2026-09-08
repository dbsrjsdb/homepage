let selectedFile = null;
const status = document.querySelector("#status");
const output = document.querySelector("#hash-output");
const dropZone = document.querySelector("#drop-zone");
const setFile = file => { selectedFile = file; document.querySelector("#file-details").hidden = false; document.querySelector("#file-name").textContent = file.name; document.querySelector("#file-size").textContent = `${file.size.toLocaleString()} bytes`; status.className = "status"; status.textContent = "File ready. Choose an algorithm and calculate."; output.textContent = "—"; };
const toHex = buffer => [...new Uint8Array(buffer)].map(byte => byte.toString(16).padStart(2, "0")).join("");
async function calculate() { if (!selectedFile) { status.className = "status error"; status.textContent = "Choose a file before calculating a hash."; return; } if (!crypto.subtle) { status.className = "status error"; status.textContent = "Web Crypto is unavailable in this browser."; return; } const algorithm = document.querySelector("#algorithm-input").value; status.className = "status"; status.textContent = `Reading ${selectedFile.name}…`; try { const digest = await crypto.subtle.digest(algorithm, await selectedFile.arrayBuffer()); output.textContent = toHex(digest); status.textContent = `${algorithm} calculated locally.`; } catch (error) { output.textContent = "—"; status.className = "status error"; status.textContent = `Could not calculate the hash: ${error.message}`; } }
document.querySelector("#file-input").addEventListener("change", event => { const file = event.target.files[0]; if (file) setFile(file); });
dropZone.addEventListener("dragover", event => { event.preventDefault(); dropZone.style.borderColor = "var(--accent)"; });
dropZone.addEventListener("dragleave", () => { dropZone.style.borderColor = ""; });
dropZone.addEventListener("drop", event => { event.preventDefault(); dropZone.style.borderColor = ""; const file = event.dataTransfer.files[0]; if (file) setFile(file); });
document.querySelector("#calculate-button").addEventListener("click", calculate);
document.querySelector("#copy-button").addEventListener("click", async () => { if (output.textContent === "—") return; try { await navigator.clipboard.writeText(output.textContent); status.textContent = "Digest copied to the clipboard."; } catch { status.className = "status error"; status.textContent = "Copy was unavailable; select the digest manually."; } });
document.querySelector("#clear-button").addEventListener("click", () => { selectedFile = null; document.querySelector("#file-input").value = ""; document.querySelector("#file-details").hidden = true; output.textContent = "—"; status.className = "status"; status.textContent = "Choose a file to begin."; });
