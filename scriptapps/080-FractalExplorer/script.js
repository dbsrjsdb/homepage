const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const mode = document.querySelector("#mode");
const palette = document.querySelector("#palette");
const iterations = document.querySelector("#iterations");
const real = document.querySelector("#real");
const imag = document.querySelector("#imag");
const status = document.querySelector("#status");
const view = { centerX: -.5, centerY: 0, scale: 3.1 };
const palettes = { ocean: [190, 260], ember: [15, 55], violet: [270, 55], mono: [0, 0] };
function color(value) { const [hue, spread] = palettes[palette.value]; if (palette.value === "mono") { const light = 8 + value * 88; return `hsl(0 0% ${light}%)`; } return `hsl(${hue + value * spread} 78% ${18 + value * 48}%)`; }
function render() {
  const image = context.createImageData(canvas.width, canvas.height); const data = image.data; const max = Number(iterations.value); const juliaReal = Number(real.value) / 100; const juliaImag = Number(imag.value) / 100; const aspect = canvas.width / canvas.height;
  for (let y = 0; y < canvas.height; y++) for (let x = 0; x < canvas.width; x++) { let zx = view.centerX + (x / canvas.width - .5) * view.scale * aspect; let zy = view.centerY + (y / canvas.height - .5) * view.scale; const cx = mode.value === "julia" ? juliaReal : zx; const cy = mode.value === "julia" ? juliaImag : zy; let count = 0; while (zx * zx + zy * zy <= 4 && count < max) { const nextX = zx * zx - zy * zy + cx; zy = 2 * zx * zy + cy; zx = nextX; count++; } const offset = (y * canvas.width + x) * 4; const smooth = count === max ? 0 : Math.min(1, count / max + 5 / max); data[offset] = 10; data[offset + 1] = 15; data[offset + 2] = 14; data[offset + 3] = 255; if (count < max) { const fill = color(smooth); const match = fill.match(/hsl\(([-\d.]+) ([\d.]+)% ([\d.]+)%\)/); if (match) { const h = Number(match[1]) / 60; const s = Number(match[2]) / 100; const l = Number(match[3]) / 100; const c = (1 - Math.abs(2 * l - 1)) * s; const xx = c * (1 - Math.abs(h % 2 - 1)); const m = l - c / 2; const rgb = h < 1 ? [c, xx, 0] : h < 2 ? [xx, c, 0] : h < 3 ? [0, c, xx] : h < 4 ? [0, xx, c] : h < 5 ? [xx, 0, c] : [c, 0, xx]; data[offset] = (rgb[0] + m) * 255; data[offset + 1] = (rgb[1] + m) * 255; data[offset + 2] = (rgb[2] + m) * 255; } } }
  context.putImageData(image, 0, 0); document.querySelector("#zoom-label").textContent = `Zoom ${(3.1 / view.scale).toFixed(1)}×`; status.textContent = `${mode.value === "mandelbrot" ? "Mandelbrot" : "Julia"} rendered locally at ${iterations.value} iterations.`;
}
function updateLabels() { document.querySelector("#iterations-value").textContent = iterations.value; document.querySelector("#real-value").textContent = (Number(real.value) / 100).toFixed(2); document.querySelector("#imag-value").textContent = (Number(imag.value) / 100).toFixed(2); }
canvas.addEventListener("click", event => { const rect = canvas.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width; const y = (event.clientY - rect.top) / rect.height; view.centerX += (x - .5) * view.scale * (canvas.width / canvas.height); view.centerY += (y - .5) * view.scale; view.scale *= .5; render(); });
canvas.addEventListener("dblclick", event => { event.preventDefault(); view.scale = Math.min(3.1, view.scale * 2); render(); });
function resetView() { view.centerX = mode.value === "mandelbrot" ? -.5 : 0; view.centerY = 0; view.scale = 3.1; render(); }
mode.addEventListener("change", () => { document.querySelector("#julia-control").hidden = mode.value !== "julia"; resetView(); }); palette.addEventListener("change", render); iterations.addEventListener("input", () => { updateLabels(); render(); }); [real, imag].forEach(input => input.addEventListener("input", () => { updateLabels(); render(); })); document.querySelector("#reset").addEventListener("click", resetView); document.querySelector("#download").addEventListener("click", () => { const link = document.createElement("a"); link.download = `${mode.value}-fractal.png`; link.href = canvas.toDataURL("image/png"); link.click(); status.textContent = "PNG saved from the local canvas."; }); updateLabels(); render();
