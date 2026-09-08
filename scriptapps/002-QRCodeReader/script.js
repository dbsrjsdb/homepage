const fileInput = document.querySelector("#file-input");
const dropZone = document.querySelector("#drop-zone");
const preview = document.querySelector("#preview");
const status = document.querySelector("#status");
const resetButton = document.querySelector("#reset-button");
const decodedResult = document.querySelector("#decoded-result");
const decodedText = document.querySelector("#decoded-text");
const copyButton = document.querySelector("#copy-button");
const openLink = document.querySelector("#open-link");
let currentObjectUrl = null;
let currentText = "";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function setStatus(message, isError = false) {
  status.className = isError ? "status error" : "status";
  status.textContent = message;
}

function clearResult() {
  preview.innerHTML = '<p class="empty-state">Your image preview will appear here.</p>';
  decodedResult.hidden = true;
  decodedText.textContent = "";
  openLink.hidden = true;
  openLink.removeAttribute("href");
  currentText = "";
}

function reset() {
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
  }
  fileInput.value = "";
  clearResult();
  resetButton.disabled = true;
  dropZone.classList.remove("is-dragging");
  setStatus("No image selected yet.");
}

function showDecodedText(text) {
  currentText = text;
  decodedText.textContent = text;
  decodedResult.hidden = false;
  try {
    const url = new URL(text);
    if (["http:", "https:"].includes(url.protocol)) {
      openLink.href = url.href;
      openLink.textContent = "Open link";
      openLink.hidden = false;
    }
  } catch {
    // Plain decoded text is valid and does not need an open action.
  }
}

function decodeFile(file) {
  if (!file) return;
  resetButton.disabled = false;
  clearResult();

  if (!file.type.startsWith("image/")) {
    setStatus("Please choose an image file.", true);
    return;
  }
  if (file.size > MAX_FILE_SIZE) {
    setStatus("That image is larger than the 10 MB limit.", true);
    return;
  }
  if (typeof jsQR !== "function") {
    setStatus("The QR decoder could not be loaded. Check your connection and try again.", true);
    return;
  }

  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  currentObjectUrl = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    const scale = Math.min(1, 2000 / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(image, 0, 0, width, height);

    const previewImage = document.createElement("img");
    previewImage.src = currentObjectUrl;
    previewImage.alt = "Selected image for QR code decoding";
    preview.replaceChildren(previewImage);

    const imageData = context.getImageData(0, 0, width, height);
    const code = jsQR(imageData.data, width, height, { inversionAttempts: "attemptBoth" });
    if (code) {
      showDecodedText(code.data);
      setStatus("QR code decoded successfully.");
    } else {
      setStatus("No QR code was found in this image.", true);
    }
  };
  image.onerror = () => setStatus("That image could not be read. Try another file.", true);
  image.src = currentObjectUrl;
}

fileInput.addEventListener("change", () => decodeFile(fileInput.files[0]));
dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("is-dragging");
});
dropZone.addEventListener("dragleave", () => dropZone.classList.remove("is-dragging"));
dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("is-dragging");
  decodeFile(event.dataTransfer.files[0]);
});
resetButton.addEventListener("click", reset);
copyButton.addEventListener("click", async () => {
  if (!currentText) return;
  try {
    await navigator.clipboard.writeText(currentText);
    copyButton.textContent = "Copied";
    window.setTimeout(() => { copyButton.textContent = "Copy text"; }, 1400);
  } catch {
    setStatus("Copy was unavailable. Select the decoded text manually.", true);
  }
});
