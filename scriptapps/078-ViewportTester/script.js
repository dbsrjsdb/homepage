const snippet = document.querySelector("#snippet");
const preview = document.querySelector("#preview");
const widthInput = document.querySelector("#width");
const heightInput = document.querySelector("#height");
const sizeLabel = document.querySelector("#size-label");
const breakpoint = document.querySelector("#breakpoint");
const status = document.querySelector("#status");
let current = { width: 375, height: 667 };

function bounded(value, fallback, min, max) { const number = Number.parseInt(value, 10); return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback; }
function setViewport(width, height, activeButton) {
  current = { width: bounded(width, 375, 240, 1920), height: bounded(height, 667, 320, 1200) };
  widthInput.value = current.width; heightInput.value = current.height;
  preview.style.width = `${current.width}px`; preview.style.height = `${current.height}px`;
  sizeLabel.textContent = `${current.width} × ${current.height} px`;
  breakpoint.textContent = current.width < 600 ? "Mobile layout" : current.width < 1024 ? "Tablet layout" : "Desktop layout";
  document.querySelectorAll(".preset").forEach(button => button.classList.toggle("active", button === activeButton));
  status.textContent = `Previewing ${current.width} × ${current.height} pixels.`;
}
function updatePreview() { preview.srcdoc = snippet.value; status.textContent = "Snippet preview updated locally."; }
snippet.addEventListener("input", updatePreview);
document.querySelectorAll(".preset").forEach(button => button.addEventListener("click", () => setViewport(button.dataset.width, button.dataset.height, button)));
document.querySelector("#apply").addEventListener("click", () => setViewport(widthInput.value, heightInput.value, null));
setViewport(current.width, current.height, document.querySelector(".preset.active"));
updatePreview();
