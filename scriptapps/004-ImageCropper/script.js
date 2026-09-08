const fileInput = document.querySelector("#file-input");
const dropZone = document.querySelector("#drop-zone");
const status = document.querySelector("#status");
const resetButton = document.querySelector("#reset-button");
const aspectInput = document.querySelector("#aspect-input");
const formatInput = document.querySelector("#format-input");
const cropButton = document.querySelector("#crop-button");
const stage = document.querySelector("#stage");
const cropSummary = document.querySelector("#crop-summary");
const resultPreview = document.querySelector("#result-preview");
const resultSummary = document.querySelector("#result-summary");

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MIN_CROP_SIZE = 30;
let sourceImage = null;
let sourceUrl = null;
let sourceName = "image";
let crop = null;
let interaction = null;

function setStatus(message, isError = false) {
  status.className = isError ? "status error" : "status";
  status.textContent = message;
}

function getAspect() {
  return aspectInput.value === "free" ? null : Number(aspectInput.value);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function setControlsEnabled(enabled) {
  aspectInput.disabled = !enabled;
  formatInput.disabled = !enabled;
  cropButton.disabled = !enabled;
}

function fitStage() {
  if (!sourceImage) return;
  const maxWidth = Math.min(680, stage.parentElement.clientWidth - 56);
  const scale = Math.min(1, maxWidth / sourceImage.naturalWidth);
  const width = Math.max(1, Math.round(sourceImage.naturalWidth * scale));
  const height = Math.max(1, Math.round(sourceImage.naturalHeight * scale));
  const image = stage.querySelector(".stage-image");
  stage.style.minHeight = "0px";
  stage.style.width = `${width}px`;
  stage.style.height = `${height}px`;
  image.style.width = `${width}px`;
  image.style.height = `${height}px`;
}

function initialCrop() {
  const aspect = getAspect();
  const maxWidth = stage.clientWidth * 0.78;
  const maxHeight = stage.clientHeight * 0.78;
  let width = maxWidth;
  let height = maxHeight;
  if (aspect) {
    width = Math.min(maxWidth, maxHeight * aspect);
    height = width / aspect;
  }
  crop = { x: (stage.clientWidth - width) / 2, y: (stage.clientHeight - height) / 2, width, height };
}

function updateSummary() {
  if (!crop || !sourceImage) return;
  const scaleX = sourceImage.naturalWidth / stage.clientWidth;
  const scaleY = sourceImage.naturalHeight / stage.clientHeight;
  cropSummary.textContent = `${Math.round(crop.width * scaleX)} × ${Math.round(crop.height * scaleY)} px`;
}

function renderCropBox() {
  if (!crop) return;
  let box = stage.querySelector(".crop-box");
  if (!box) {
    box = document.createElement("div");
    box.className = "crop-box";
    box.tabIndex = 0;
    box.setAttribute("role", "slider");
    box.setAttribute("aria-label", "Crop selection. Drag to move or use the corner handles to resize.");
    for (const handle of ["nw", "ne", "sw", "se"]) {
      const node = document.createElement("span");
      node.className = "handle";
      node.dataset.handle = handle;
      node.setAttribute("aria-hidden", "true");
      box.append(node);
    }
    stage.append(box);
  }
  box.style.left = `${crop.x}px`;
  box.style.top = `${crop.y}px`;
  box.style.width = `${crop.width}px`;
  box.style.height = `${crop.height}px`;
  box.setAttribute("aria-valuetext", `${Math.round(crop.width)} by ${Math.round(crop.height)} display pixels`);
  updateSummary();
}

function constrainCrop() {
  if (!crop) return;
  crop.width = clamp(crop.width, MIN_CROP_SIZE, stage.clientWidth);
  crop.height = clamp(crop.height, MIN_CROP_SIZE, stage.clientHeight);
  crop.x = clamp(crop.x, 0, stage.clientWidth - crop.width);
  crop.y = clamp(crop.y, 0, stage.clientHeight - crop.height);
}

function applyAspect() {
  if (!sourceImage) return;
  initialCrop();
  renderCropBox();
}

function moveCrop(dx, dy) {
  crop.x = clamp(crop.x + dx, 0, stage.clientWidth - crop.width);
  crop.y = clamp(crop.y + dy, 0, stage.clientHeight - crop.height);
}

function resizeCrop(handle, dx, dy) {
  const aspect = getAspect();
  const original = interaction.startCrop;
  let left = original.x;
  let top = original.y;
  let right = original.x + original.width;
  let bottom = original.y + original.height;
  if (handle.includes("w")) left += dx;
  if (handle.includes("e")) right += dx;
  if (handle.includes("n")) top += dy;
  if (handle.includes("s")) bottom += dy;

  if (aspect) {
    const anchorX = handle.includes("w") ? right : left;
    const anchorY = handle.includes("n") ? bottom : top;
    let width = Math.max(MIN_CROP_SIZE, Math.abs(right - left));
    let height = width / aspect;
    if (Math.abs(dy) > Math.abs(dx)) {
      height = Math.max(MIN_CROP_SIZE, Math.abs(bottom - top));
      width = height * aspect;
    }
    if (handle.includes("w")) left = anchorX - width; else right = anchorX + width;
    if (handle.includes("n")) top = anchorY - height; else bottom = anchorY + height;
  }

  if (right - left < MIN_CROP_SIZE) { if (handle.includes("w")) left = right - MIN_CROP_SIZE; else right = left + MIN_CROP_SIZE; }
  if (bottom - top < MIN_CROP_SIZE) { if (handle.includes("n")) top = bottom - MIN_CROP_SIZE; else bottom = top + MIN_CROP_SIZE; }
  if (left < 0) { right -= left; left = 0; }
  if (top < 0) { bottom -= top; top = 0; }
  if (right > stage.clientWidth) { left -= right - stage.clientWidth; right = stage.clientWidth; }
  if (bottom > stage.clientHeight) { top -= bottom - stage.clientHeight; bottom = stage.clientHeight; }
  crop = { x: left, y: top, width: right - left, height: bottom - top };
  constrainCrop();
}

function handlePointerDown(event) {
  if (!crop) return;
  event.preventDefault();
  const handle = event.target.closest(".handle")?.dataset.handle || "move";
  interaction = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, startCrop: { ...crop }, handle };
  event.currentTarget.setPointerCapture(event.pointerId);
}

function handlePointerMove(event) {
  if (!interaction || event.pointerId !== interaction.pointerId) return;
  const dx = event.clientX - interaction.startX;
  const dy = event.clientY - interaction.startY;
  crop = { ...interaction.startCrop };
  if (interaction.handle === "move") moveCrop(dx, dy);
  else resizeCrop(interaction.handle, dx, dy);
  renderCropBox();
}

function handlePointerUp(event) {
  if (interaction?.pointerId === event.pointerId) interaction = null;
}

function showEditor() {
  stage.replaceChildren();
  const image = document.createElement("img");
  image.className = "stage-image";
  image.alt = "Selected image being cropped";
  image.src = sourceUrl;
  stage.append(image);
  fitStage();
  initialCrop();
  renderCropBox();
  const box = stage.querySelector(".crop-box");
  box.addEventListener("pointerdown", handlePointerDown);
  box.addEventListener("pointermove", handlePointerMove);
  box.addEventListener("pointerup", handlePointerUp);
  box.addEventListener("pointercancel", handlePointerUp);
}

function clearImage() {
  if (sourceUrl) URL.revokeObjectURL(sourceUrl);
  sourceUrl = null;
  sourceImage = null;
  crop = null;
  interaction = null;
  stage.style.width = "";
  stage.style.height = "";
  stage.style.minHeight = "";
  stage.innerHTML = '<p class="empty-state">Your image and crop box will appear here.</p>';
  resultPreview.innerHTML = '<p class="empty-state">Your cropped image will appear here.</p>';
  cropSummary.textContent = "No image loaded";
  resultSummary.textContent = "Nothing cropped yet";
  fileInput.value = "";
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
    setControlsEnabled(true);
    showEditor();
    setStatus(`Loaded ${image.naturalWidth} × ${image.naturalHeight} pixels.`);
  };
  image.onerror = () => setStatus("That image could not be read. Try another file.", true);
  image.src = sourceUrl;
}

function cropAndDownload() {
  if (!sourceImage || !crop) return;
  const scaleX = sourceImage.naturalWidth / stage.clientWidth;
  const scaleY = sourceImage.naturalHeight / stage.clientHeight;
  const sourceX = Math.round(crop.x * scaleX);
  const sourceY = Math.round(crop.y * scaleY);
  const width = Math.max(1, Math.round(crop.width * scaleX));
  const height = Math.max(1, Math.round(crop.height * scaleY));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return setStatus("Your browser could not create a crop surface.", true);
  context.drawImage(sourceImage, sourceX, sourceY, width, height, 0, 0, width, height);
  resultPreview.replaceChildren(canvas);
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", `Cropped image preview, ${width} by ${height} pixels`);
  resultSummary.textContent = `${width} × ${height} px`;
  const format = formatInput.value;
  const extension = format.split("/")[1].replace("jpeg", "jpg");
  canvas.toBlob((blob) => {
    if (!blob) return setStatus("The cropped image could not be exported.", true);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${sourceName}-cropped.${extension}`;
    link.href = url;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(`Downloaded ${width} × ${height} ${extension.toUpperCase()} image.`);
  }, format, format === "image/jpeg" ? 0.92 : undefined);
}

fileInput.addEventListener("change", () => loadFile(fileInput.files[0]));
for (const event of ["dragenter", "dragover"]) dropZone.addEventListener(event, (e) => { e.preventDefault(); dropZone.classList.add("is-dragging"); });
for (const event of ["dragleave", "drop"]) dropZone.addEventListener(event, (e) => { e.preventDefault(); dropZone.classList.remove("is-dragging"); });
dropZone.addEventListener("drop", (event) => loadFile(event.dataTransfer.files[0]));
aspectInput.addEventListener("change", applyAspect);
cropButton.addEventListener("click", cropAndDownload);
resetButton.addEventListener("click", clearImage);
window.addEventListener("resize", () => { if (sourceImage) { fitStage(); initialCrop(); renderCropBox(); } });
setControlsEnabled(false);
