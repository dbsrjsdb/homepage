const fileInput = document.querySelector("#file-input");
const dropZone = document.querySelector("#drop-zone");
const status = document.querySelector("#status");
const resetButton = document.querySelector("#reset-button");
const resizeForm = document.querySelector("#resize-form");
const dimensionsControls = document.querySelector("#dimensions-controls");
const percentageControls = document.querySelector("#percentage-controls");
const widthInput = document.querySelector("#width-input");
const heightInput = document.querySelector("#height-input");
const lockInput = document.querySelector("#lock-input");
const percentageInput = document.querySelector("#percentage-input");
const formatInput = document.querySelector("#format-input");
const preview = document.querySelector("#preview");
const sizeSummary = document.querySelector("#size-summary");
const downloadButton = document.querySelector("#download-button");

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_DIMENSION = 10000;
let sourceImage = null;
let sourceUrl = null;
let latestCanvas = null;
let sourceName = "image";

function setStatus(message, isError = false) {
  status.className = isError ? "status error" : "status";
  status.textContent = message;
}

function getMode() {
  return document.querySelector('input[name="resize-mode"]:checked').value;
}

function setControlsEnabled(enabled) {
  for (const control of [
    widthInput, heightInput, lockInput, percentageInput, formatInput,
  ]) control.disabled = !enabled || (getMode() === "dimensions" ? control === percentageInput : control !== percentageInput && control !== formatInput);
  downloadButton.disabled = !enabled;
}

function getNumber(input, fallback, min, max) {
  const value = Number(input.value);
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.round(value)));
}

function updateMode() {
  const dimensions = getMode() === "dimensions";
  dimensionsControls.hidden = !dimensions;
  percentageControls.hidden = dimensions;
  setControlsEnabled(Boolean(sourceImage));
  renderPreview();
}

function getTargetSize() {
  if (!sourceImage) return null;
  if (getMode() === "percentage") {
    const percentage = getNumber(percentageInput, 100, 1, 1000);
    percentageInput.value = percentage;
    return {
      width: Math.min(MAX_DIMENSION, Math.max(1, Math.round(sourceImage.naturalWidth * percentage / 100))),
      height: Math.min(MAX_DIMENSION, Math.max(1, Math.round(sourceImage.naturalHeight * percentage / 100))),
    };
  }

  const width = getNumber(widthInput, sourceImage.naturalWidth, 1, MAX_DIMENSION);
  const height = getNumber(heightInput, sourceImage.naturalHeight, 1, MAX_DIMENSION);
  widthInput.value = width;
  heightInput.value = height;
  return { width, height };
}

function updateDimensions(changedInput) {
  if (!sourceImage || !lockInput.checked || getMode() !== "dimensions") return;
  const ratio = sourceImage.naturalWidth / sourceImage.naturalHeight;
  if (changedInput === widthInput) heightInput.value = Math.min(MAX_DIMENSION, Math.max(1, Math.round(Number(widthInput.value) / ratio)));
  if (changedInput === heightInput) widthInput.value = Math.min(MAX_DIMENSION, Math.max(1, Math.round(Number(heightInput.value) * ratio)));
  renderPreview();
}

function renderPreview() {
  if (!sourceImage) return;
  const target = getTargetSize();
  if (!target) return;
  const canvas = document.createElement("canvas");
  canvas.width = target.width;
  canvas.height = target.height;
  const context = canvas.getContext("2d");
  if (!context) {
    setStatus("Your browser could not create a drawing surface.", true);
    return;
  }
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(sourceImage, 0, 0, target.width, target.height);
  latestCanvas = canvas;
  preview.replaceChildren(canvas);
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", `Resized preview, ${target.width} by ${target.height} pixels`);
  sizeSummary.textContent = `${target.width} × ${target.height} px`;
  setStatus("Preview updated.");
}

function clearImage() {
  if (sourceUrl) URL.revokeObjectURL(sourceUrl);
  sourceUrl = null;
  sourceImage = null;
  latestCanvas = null;
  fileInput.value = "";
  preview.innerHTML = '<p class="empty-state">Your resized image will appear here.</p>';
  sizeSummary.textContent = "No image loaded";
  setControlsEnabled(false);
  resetButton.disabled = true;
  setStatus("No image selected yet.");
}

function loadFile(file) {
  if (!file) return;
  clearImage();
  resetButton.disabled = false;
  if (!file.type.startsWith("image/")) {
    setStatus("Please choose an image file.", true);
    return;
  }
  if (file.size > MAX_FILE_SIZE) {
    setStatus("That image is larger than the 20 MB limit.", true);
    return;
  }
  sourceName = file.name.replace(/\.[^.]+$/, "") || "image";
  sourceUrl = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    if (!image.naturalWidth || !image.naturalHeight) {
      setStatus("That image has no usable dimensions.", true);
      return;
    }
    sourceImage = image;
    widthInput.value = image.naturalWidth;
    heightInput.value = image.naturalHeight;
    percentageInput.value = 100;
    setControlsEnabled(true);
    renderPreview();
    setStatus(`Loaded ${image.naturalWidth} × ${image.naturalHeight} pixels.`);
  };
  image.onerror = () => setStatus("That image could not be read. Try another file.", true);
  image.src = sourceUrl;
}

function download() {
  if (!latestCanvas || !sourceImage) return;
  const format = formatInput.value;
  const extension = format.split("/")[1].replace("jpeg", "jpg");
  latestCanvas.toBlob((blob) => {
    if (!blob) {
      setStatus("The resized image could not be exported.", true);
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${sourceName}-resized.${extension}`;
    link.href = url;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(`Downloaded ${latestCanvas.width} × ${latestCanvas.height} ${extension.toUpperCase()} image.`);
  }, format, format === "image/jpeg" ? 0.92 : undefined);
}

fileInput.addEventListener("change", () => loadFile(fileInput.files[0]));
for (const event of ["dragenter", "dragover"]) dropZone.addEventListener(event, (e) => { e.preventDefault(); dropZone.classList.add("is-dragging"); });
for (const event of ["dragleave", "drop"]) dropZone.addEventListener(event, (e) => { e.preventDefault(); dropZone.classList.remove("is-dragging"); });
dropZone.addEventListener("drop", (event) => loadFile(event.dataTransfer.files[0]));
document.querySelectorAll('input[name="resize-mode"]').forEach((input) => input.addEventListener("change", updateMode));
widthInput.addEventListener("input", () => updateDimensions(widthInput));
heightInput.addEventListener("input", () => updateDimensions(heightInput));
for (const input of [lockInput, percentageInput, formatInput]) input.addEventListener("input", renderPreview);
resizeForm.addEventListener("submit", (event) => { event.preventDefault(); download(); });
resetButton.addEventListener("click", clearImage);
setControlsEnabled(false);
