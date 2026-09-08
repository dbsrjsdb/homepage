const fileInput = document.querySelector("#file-input");
const dropZone = document.querySelector("#drop-zone");
const status = document.querySelector("#status");
const resetButton = document.querySelector("#reset-button");
const formatInput = document.querySelector("#format-input");
const qualityInput = document.querySelector("#quality-input");
const qualityValue = document.querySelector("#quality-value");
const downloadButton = document.querySelector("#download-button");
const originalPreview = document.querySelector("#original-preview");
const compressedPreview = document.querySelector("#compressed-preview");
const originalSize = document.querySelector("#original-size");
const compressedSize = document.querySelector("#compressed-size");
const savings = document.querySelector("#savings");
const dimensions = document.querySelector("#dimensions");

const MAX_FILE_SIZE = 20 * 1024 * 1024;
let sourceImage = null;
let sourceUrl = null;
let sourceName = "image";
let latestBlob = null;
let latestUrl = null;

function setStatus(message, isError = false) {
  status.className = isError ? "status error" : "status";
  status.textContent = message;
}

function setControlsEnabled(enabled) {
  formatInput.disabled = !enabled;
  qualityInput.disabled = !enabled;
  downloadButton.disabled = !enabled || !latestBlob;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function updateQualityLabel() {
  qualityValue.value = `${qualityInput.value}%`;
  qualityValue.textContent = `${qualityInput.value}%`;
}

function updateSavings(originalBytes, compressedBytes) {
  const difference = originalBytes - compressedBytes;
  const percentage = originalBytes ? Math.round((difference / originalBytes) * 100) : 0;
  if (difference > 0) savings.textContent = `${percentage}% smaller · saved ${formatBytes(difference)}`;
  else if (difference < 0) savings.textContent = `${Math.abs(percentage)}% larger than the original file`;
  else savings.textContent = "Same file size as the original";
}

function compress() {
  if (!sourceImage) return;
  const canvas = document.createElement("canvas");
  canvas.width = sourceImage.naturalWidth;
  canvas.height = sourceImage.naturalHeight;
  const context = canvas.getContext("2d");
  if (!context) {
    setStatus("Your browser could not create a compression surface.", true);
    return;
  }
  if (formatInput.value === "image/jpeg") {
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.drawImage(sourceImage, 0, 0);
  const quality = Number(qualityInput.value) / 100;
  canvas.toBlob((blob) => {
    if (!blob) {
      setStatus("This browser could not create the selected image format.", true);
      return;
    }
    if (latestUrl) URL.revokeObjectURL(latestUrl);
    latestBlob = blob;
    latestUrl = URL.createObjectURL(blob);
    compressedPreview.innerHTML = "";
    const image = document.createElement("img");
    image.src = latestUrl;
    image.alt = `Compressed ${formatInput.options[formatInput.selectedIndex].text} preview`;
    compressedPreview.append(image);
    compressedSize.textContent = formatBytes(blob.size);
    updateSavings(Number(originalSize.dataset.bytes), blob.size);
    setControlsEnabled(true);
    setStatus("Compression preview updated.");
  }, formatInput.value, quality);
}

function clearImage() {
  if (sourceUrl) URL.revokeObjectURL(sourceUrl);
  if (latestUrl) URL.revokeObjectURL(latestUrl);
  sourceUrl = null;
  latestUrl = null;
  sourceImage = null;
  latestBlob = null;
  fileInput.value = "";
  originalPreview.innerHTML = '<p class="empty-state">Original preview</p>';
  compressedPreview.innerHTML = '<p class="empty-state">Compressed preview</p>';
  originalSize.textContent = "—";
  compressedSize.textContent = "—";
  originalSize.removeAttribute("data-bytes");
  dimensions.textContent = "No image loaded";
  savings.textContent = "";
  resetButton.disabled = true;
  setControlsEnabled(false);
  setStatus("No image selected yet.");
}

function loadFile(file) {
  if (!file) return;
  clearImage();
  resetButton.disabled = false;
  if (!file.type.startsWith("image/")) return setStatus("Please choose an image file.", true);
  if (file.size > MAX_FILE_SIZE) return setStatus("That image is larger than the 20 MB limit.", true);
  sourceName = file.name.replace(/\.[^.]+$/, "") || "image";
  sourceUrl = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    if (!image.naturalWidth || !image.naturalHeight) return setStatus("That image has no usable dimensions.", true);
    sourceImage = image;
    const original = document.createElement("img");
    original.src = sourceUrl;
    original.alt = "Original selected image preview";
    originalPreview.replaceChildren(original);
    originalSize.textContent = formatBytes(file.size);
    originalSize.dataset.bytes = file.size;
    dimensions.textContent = `${image.naturalWidth} × ${image.naturalHeight} px`;
    setControlsEnabled(true);
    compress();
    setStatus(`Loaded ${image.naturalWidth} × ${image.naturalHeight} pixels.`);
  };
  image.onerror = () => setStatus("That image could not be read. Try another file.", true);
  image.src = sourceUrl;
}

function download() {
  if (!latestBlob) return;
  const extension = formatInput.value.split("/")[1].replace("jpeg", "jpg");
  const url = URL.createObjectURL(latestBlob);
  const link = document.createElement("a");
  link.download = `${sourceName}-compressed.${extension}`;
  link.href = url;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  setStatus(`Downloaded compressed ${extension.toUpperCase()} image.`);
}

fileInput.addEventListener("change", () => loadFile(fileInput.files[0]));
for (const event of ["dragenter", "dragover"]) dropZone.addEventListener(event, (e) => { e.preventDefault(); dropZone.classList.add("is-dragging"); });
for (const event of ["dragleave", "drop"]) dropZone.addEventListener(event, (e) => { e.preventDefault(); dropZone.classList.remove("is-dragging"); });
dropZone.addEventListener("drop", (event) => loadFile(event.dataTransfer.files[0]));
qualityInput.addEventListener("input", () => { updateQualityLabel(); compress(); });
formatInput.addEventListener("change", compress);
downloadButton.addEventListener("click", download);
resetButton.addEventListener("click", clearImage);
updateQualityLabel();
setControlsEnabled(false);
