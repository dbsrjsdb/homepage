const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const nameInput = document.querySelector("#name");
const connect = document.querySelector("#connect");
const status = document.querySelector("#status");
let stars = [];
function draw() {
  const gradient = context.createRadialGradient(450, 300, 20, 450, 300, 650); gradient.addColorStop(0, "#162b3c"); gradient.addColorStop(1, "#05090f"); context.fillStyle = gradient; context.fillRect(0, 0, canvas.width, canvas.height);
  let random = 217; const next = () => { random = (Math.imul(random, 1664525) + 1013904223) >>> 0; return random / 4294967296; }; context.fillStyle = "#ffffff"; for (let i = 0; i < 170; i++) { const x = next() * canvas.width; const y = next() * canvas.height; const size = .35 + next() * 1.25; context.globalAlpha = .18 + next() * .5; context.beginPath(); context.arc(x, y, size, 0, Math.PI * 2); context.fill(); }
  context.globalAlpha = .7; if (connect && connect.checked && stars.length > 1) { context.strokeStyle = "#8cb8d088"; context.lineWidth = 1.4; context.beginPath(); stars.forEach((star, index) => { if (index === 0) context.moveTo(star.x, star.y); else context.lineTo(star.x, star.y); }); context.stroke(); }
  stars.forEach((star, index) => { context.globalAlpha = .35; context.fillStyle = "#ffe58e"; context.beginPath(); context.arc(star.x, star.y, 10, 0, Math.PI * 2); context.fill(); context.globalAlpha = 1; context.fillStyle = "#fffbe5"; context.beginPath(); context.arc(star.x, star.y, 3.5, 0, Math.PI * 2); context.fill(); context.fillStyle = "#b7d9ef"; context.font = "600 13px system-ui"; context.fillText(String(index + 1), star.x + 10, star.y - 9); });
  document.querySelector("#star-count").textContent = `${stars.length} ${stars.length === 1 ? "star" : "stars"}`; document.querySelector("#title").textContent = nameInput.value.trim() || "Untitled constellation";
}
function addStar(event) { const rect = canvas.getBoundingClientRect(); stars.push({ x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height }); draw(); status.textContent = `${stars.length} ${stars.length === 1 ? "star" : "stars"} placed. Keep drawing.`; }
canvas.addEventListener("click", addStar); nameInput.addEventListener("input", draw); connect.addEventListener("change", draw);
document.querySelector("#undo").addEventListener("click", () => { if (stars.length) stars.pop(); draw(); status.textContent = stars.length ? "Last star removed." : "The sky is clear."; });
document.querySelector("#clear").addEventListener("click", () => { stars = []; draw(); status.textContent = "The sky is clear. Click to begin again."; });
document.querySelector("#random").addEventListener("click", () => { stars = []; let random = Math.random() * 1000; const next = () => { random = (random * 9301 + 49297) % 233280; return random / 233280; }; const count = 4 + Math.floor(next() * 7); for (let i = 0; i < count; i++) stars.push({ x: 90 + next() * 720, y: 80 + next() * 460 }); draw(); status.textContent = `${count} stars scattered. Add or remove points to shape it.`; });
document.querySelector("#download").addEventListener("click", () => { const link = document.createElement("a"); link.download = `${(nameInput.value.trim() || "constellation").replace(/[^a-z0-9-_]+/gi, "-")}.png`; link.href = canvas.toDataURL("image/png"); link.click(); status.textContent = "PNG exported from the local canvas."; }); draw();
