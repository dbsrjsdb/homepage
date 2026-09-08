const pairs = {
  foreground: { picker: document.querySelector("#foreground"), text: document.querySelector("#foreground-hex") },
  background: { picker: document.querySelector("#background"), text: document.querySelector("#background-hex") }
};
const ratioOutput = document.querySelector("#ratio");
const ratioNote = document.querySelector("#ratio-note");
const preview = document.querySelector("#preview");
const status = document.querySelector("#status");
const grades = { normalAA: document.querySelector("#normal-aa"), normalAAA: document.querySelector("#normal-aaa"), largeAA: document.querySelector("#large-aa"), largeAAA: document.querySelector("#large-aaa") };
const validHex = value => /^#[0-9a-f]{6}$/i.test(value.trim());

function luminance(hex) {
  const channels = [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255).map(value => value <= .03928 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
function ratio(foreground, background) { const light = Math.max(luminance(foreground), luminance(background)); const dark = Math.min(luminance(foreground), luminance(background)); return (light + .05) / (dark + .05); }
function setGrade(element, pass) { element.textContent = pass ? "Pass" : "Fail"; element.className = `grade ${pass ? "pass" : "fail"}`; }
function render() {
  const foreground = pairs.foreground.text.value.trim().toLowerCase();
  const background = pairs.background.text.value.trim().toLowerCase();
  if (!validHex(foreground) || !validHex(background)) {
    ratioOutput.textContent = "—"; ratioNote.textContent = "Use two valid six-digit hex colors to calculate a ratio."; status.textContent = "One or both colors need a valid value such as #1b2a24."; status.className = "status error";
    Object.values(grades).forEach(grade => { grade.textContent = "—"; grade.className = "grade"; }); return;
  }
  const value = ratio(foreground, background); ratioOutput.textContent = value.toFixed(2); ratioNote.textContent = value >= 7 ? "Excellent: this pair passes every listed target." : value >= 4.5 ? "Strong contrast: passes normal AA and both large-text targets." : value >= 3 ? "Good for large text, but normal text needs more contrast." : "Needs more contrast for the listed WCAG targets."; status.textContent = "Contrast updated locally."; status.className = "status";
  preview.style.backgroundColor = background; preview.style.color = foreground; setGrade(grades.normalAA, value >= 4.5); setGrade(grades.normalAAA, value >= 7); setGrade(grades.largeAA, value >= 3); setGrade(grades.largeAAA, value >= 4.5);
}
Object.entries(pairs).forEach(([, pair]) => { pair.picker.addEventListener("input", () => { pair.text.value = pair.picker.value; render(); }); pair.text.addEventListener("input", render); });
document.querySelector("#swap").addEventListener("click", () => { const foreground = pairs.foreground.text.value; pairs.foreground.text.value = pairs.background.text.value; pairs.background.text.value = foreground; pairs.foreground.picker.value = validHex(pairs.foreground.text.value) ? pairs.foreground.text.value : "#000000"; pairs.background.picker.value = validHex(pairs.background.text.value) ? pairs.background.text.value : "#ffffff"; render(); });
document.querySelector("#reset").addEventListener("click", () => { pairs.foreground.text.value = "#17231e"; pairs.background.text.value = "#d8f3e5"; pairs.foreground.picker.value = "#17231e"; pairs.background.picker.value = "#d8f3e5"; render(); });
render();
