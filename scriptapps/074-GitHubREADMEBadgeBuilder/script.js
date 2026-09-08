const fields = {
  label: document.querySelector("#label"),
  message: document.querySelector("#message"),
  labelColor: document.querySelector("#label-color"),
  messageColor: document.querySelector("#message-color"),
  style: document.querySelector("#style"),
  logo: document.querySelector("#logo"),
  repo: document.querySelector("#repo")
};
const image = document.querySelector("#badge-image");
const markdown = document.querySelector("#markdown");
const status = document.querySelector("#status");
const statusBadge = document.querySelector("#status-badge");

const encode = value => encodeURIComponent(String(value).trim()).replace(/%20/g, "_");
const cleanUrl = value => /^https?:\/\//i.test(value.trim()) ? value.trim() : "";

function render() {
  const label = fields.label.value.trim() || "label";
  const message = fields.message.value.trim() || "message";
  const labelColor = fields.labelColor.value.trim() || "555";
  const messageColor = fields.messageColor.value.trim() || "blue";
  const params = new URLSearchParams({ style: fields.style.value, labelColor });
  const logo = fields.logo.value.trim();
  if (logo) params.set("logo", logo);
  const imageUrl = `https://img.shields.io/badge/${encode(label)}-${encode(message)}-${encode(messageColor)}?${params.toString()}`;
  const target = cleanUrl(fields.repo.value);
  const imageMarkdown = `![${label}: ${message}](${imageUrl})`;
  markdown.textContent = target ? `[${imageMarkdown}](${target})` : imageMarkdown;
  image.src = imageUrl;
  image.alt = `${label}: ${message}`;
  status.textContent = "Preview loaded from Shields.io using your badge text and settings.";
  status.className = "status";
  statusBadge.textContent = "Preview updated";
}

document.querySelectorAll("input, select").forEach(input => {
  input.addEventListener("input", render);
  input.addEventListener("change", render);
});
document.querySelectorAll(".swatch").forEach(button => button.addEventListener("click", () => {
  fields.messageColor.value = button.dataset.color;
  render();
}));
document.querySelector("#copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(markdown.textContent);
    status.textContent = "Markdown copied to the clipboard.";
    status.className = "status good";
  } catch {
    status.textContent = "Clipboard access is unavailable; focus the Markdown and copy it manually.";
  }
});
document.querySelector("#reset").addEventListener("click", () => {
  fields.label.value = "build";
  fields.message.value = "passing";
  fields.labelColor.value = "555";
  fields.messageColor.value = "brightgreen";
  fields.style.value = "flat";
  fields.logo.value = "";
  fields.repo.value = "";
  render();
  status.textContent = "Badge builder reset.";
});
render();
