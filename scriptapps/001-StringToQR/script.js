const form = document.querySelector("#qr-form");
const textInput = document.querySelector("#text-input");
const sizeInput = document.querySelector("#size-input");
const formatInput = document.querySelector("#format-input");
const levelInput = document.querySelector("#level-input");
const preview = document.querySelector("#qr-preview");
const status = document.querySelector("#status");
const optionSummary = document.querySelector("#option-summary");
const downloadButton = document.querySelector("#download-button");
let latestCanvas = null;

const allowedOptions = {
  sizes: new Set(["128", "256", "384", "512"]),
  formats: new Set(["png", "jpeg"]),
  levels: new Set(["L", "M", "Q", "H"]),
};

function updateSummary() {
  optionSummary.textContent = `${sizeInput.value} px · ${formatInput.value.toUpperCase()} · ${levelInput.value}`;
}

function showError(message) {
  status.className = "status error";
  status.textContent = message;
  downloadButton.disabled = true;
}

function getOptions() {
  const size = allowedOptions.sizes.has(sizeInput.value) ? sizeInput.value : "256";
  const format = allowedOptions.formats.has(formatInput.value) ? formatInput.value : "png";
  const level = allowedOptions.levels.has(levelInput.value) ? levelInput.value : "M";

  sizeInput.value = size;
  formatInput.value = format;
  levelInput.value = level;
  return { size: Number(size), format, level };
}

function generate() {
  const text = textInput.value.trim();
  const { size, level } = getOptions();
  updateSummary();

  if (!text) {
    preview.innerHTML = '<p class="empty-state">Your QR code will appear here.</p>';
    status.className = "status";
    status.textContent = "Enter text to generate a QR code.";
    latestCanvas = null;
    downloadButton.disabled = true;
    return;
  }

  if (typeof QRCode === "undefined") {
    showError("The QR generator could not be loaded. Check your connection and try again.");
    return;
  }

  preview.replaceChildren();
  try {
    new QRCode(preview, {
      text,
      width: size,
      height: size,
      correctLevel: QRCode.CorrectLevel[level],
      colorDark: "#000000",
      colorLight: "#ffffff",
    });
    latestCanvas = preview.querySelector("canvas");
    const generatedImage = preview.querySelector("img");
    const accessibleOutput = latestCanvas || generatedImage;
    if (accessibleOutput) {
      accessibleOutput.setAttribute("role", "img");
      accessibleOutput.setAttribute("aria-label", `QR code for ${text}`);
    }
    status.className = "status";
    status.textContent = "QR code updated.";
    downloadButton.disabled = !accessibleOutput;
  } catch (error) {
    latestCanvas = null;
    preview.innerHTML = '<p class="empty-state">This text is too long for the selected error-correction level.</p>';
    showError("Could not generate a QR code with these options.");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  generate();
});

for (const control of [sizeInput, formatInput, levelInput]) {
  control.addEventListener("change", generate);
}

downloadButton.addEventListener("click", () => {
  const image = preview.querySelector("img");
  const { format } = getOptions();
  const canvas = latestCanvas || image;
  if (!canvas) return;

  const triggerDownload = (href) => {
    const link = document.createElement("a");
    link.download = `string-to-qr.${format}`;
    link.href = href;
    link.style.display = "none";
    document.body.append(link);
    link.click();
    link.remove();
    if (href.startsWith("blob:")) {
      window.setTimeout(() => URL.revokeObjectURL(href), 1000);
    }
  };

  if (canvas instanceof HTMLImageElement && format === "png") {
    triggerDownload(canvas.src);
    return;
  }

  const downloadCanvas = canvas instanceof HTMLCanvasElement
    ? canvas
    : Object.assign(document.createElement("canvas"), { width: canvas.naturalWidth, height: canvas.naturalHeight });
  if (downloadCanvas !== canvas) {
    const context = downloadCanvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, downloadCanvas.width, downloadCanvas.height);
    context.drawImage(canvas, 0, 0);
  }
  downloadCanvas.toBlob((blob) => {
    if (!blob) return;
    triggerDownload(URL.createObjectURL(blob));
  }, `image/${format}`);
});

updateSummary();
