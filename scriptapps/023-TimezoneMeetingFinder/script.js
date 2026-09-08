const zones = [
  { name: "New York", zone: "America/New_York" },
  { name: "London", zone: "Europe/London" },
  { name: "Tokyo", zone: "Asia/Tokyo" }
];
const defaults = ["09:00", "17:00"];
const people = document.querySelector("#people");
const timeline = document.querySelector("#timeline");
const overlap = document.querySelector("#overlap");
const status = document.querySelector("#status");
const dateInput = document.querySelector("#date-input");
const timezoneLabel = document.querySelector("#timezone-label");

const pad = value => String(value).padStart(2, "0");
const dateKey = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const dateParts = date => {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "UTC", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date);
  return Object.fromEntries(parts.filter(part => part.type !== "literal").map(part => [part.type, Number(part.value)]));
};
const zonedToUtc = (date, time, zone) => {
  const [hour, minute] = time.split(":").map(Number);
  const naive = Date.UTC(Number(date.slice(0, 4)), Number(date.slice(5, 7)) - 1, Number(date.slice(8, 10)), hour, minute);
  const local = new Intl.DateTimeFormat("en-US", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date(naive));
  const values = Object.fromEntries(local.filter(part => part.type !== "literal").map(part => [part.type, Number(part.value)]));
  return naive - (Date.UTC(values.year, values.month - 1, values.day, values.hour, values.minute) - naive);
};
const formatUtc = ms => new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "short", hour: "numeric", minute: "2-digit", hour12: false }).format(new Date(ms)).replace(",", "");
const formatLocal = (ms, zone) => new Intl.DateTimeFormat("en-US", { timeZone: zone, weekday: "short", hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(new Date(ms));

function renderPeople() {
  people.innerHTML = zones.map((person, index) => `<div class="person" data-index="${index}">
    <div class="person-name"><b>${person.name}</b><small>${person.zone}</small></div>
    <label>Time zone<select class="zone-select" aria-label="${person.name} time zone">${Intl.supportedValuesOf("timeZone").map(zone => `<option value="${zone}" ${zone === person.zone ? "selected" : ""}>${zone}</option>`).join("")}</select></label>
    <label>Workday starts<input class="start-time" type="time" value="${defaults[0]}" aria-label="${person.name} workday starts"></label>
    <label>Workday ends<input class="end-time" type="time" value="${defaults[1]}" aria-label="${person.name} workday ends"></label>
  </div>`).join("");
  people.querySelectorAll("input, select").forEach(control => control.addEventListener("input", update));
}
function readPeople() { return [...people.querySelectorAll(".person")].map(row => ({ name: row.querySelector(".person-name b").textContent, zone: row.querySelector(".zone-select").value, start: row.querySelector(".start-time").value, end: row.querySelector(".end-time").value })); }
function update() {
  if (!dateInput.value) { status.textContent = "Choose a date to compare."; status.className = "status error"; return; }
  const entries = readPeople();
  const windows = entries.map(entry => ({ ...entry, startMs: zonedToUtc(dateInput.value, entry.start, entry.zone), endMs: zonedToUtc(dateInput.value, entry.end, entry.zone) }));
  if (windows.some(window => !window.start || !window.end || window.endMs <= window.startMs)) { status.textContent = "Each workday must have a valid start before its end."; status.className = "status error"; timeline.innerHTML = ""; overlap.innerHTML = ""; return; }
  status.className = "status";
  const start = Math.min(...windows.map(window => window.startMs));
  const end = Math.max(...windows.map(window => window.endMs));
  const commonStart = Math.max(...windows.map(window => window.startMs));
  const commonEnd = Math.min(...windows.map(window => window.endMs));
  const span = 24 * 60 * 60 * 1000;
  timeline.innerHTML = `<div class="time-axis"><span></span><div class="axis-labels">${Array.from({ length: 13 }, (_, hour) => `<span>${pad(hour * 2)}:00</span>`).join("")}</div></div>` + windows.map(window => `<div class="timeline-row"><div class="row-name"><b>${window.name}</b>${window.zone}</div><div class="availability-grid"><div class="availability" style="left:${((window.startMs - start) / span) * 100}%;width:${((window.endMs - window.startMs) / span) * 100}%"><span>${formatUtc(window.startMs)} – ${formatUtc(window.endMs)}</span></div></div></div>`).join("");
  if (commonEnd > commonStart) { status.textContent = `A shared ${Math.round((commonEnd - commonStart) / 3600000 * 10) / 10}-hour window is available.`; overlap.innerHTML = `<strong>Best shared window</strong><p>${formatUtc(commonStart)} – ${formatUtc(commonEnd)} UTC<br>${entries.map(entry => `${entry.name}: ${formatLocal(commonStart, entry.zone)} → ${formatLocal(commonEnd, entry.zone)}`).join("<br>")}</p>`; }
  else { status.textContent = "No shared working-hours overlap on this date."; overlap.innerHTML = "<strong>Try another day or widen a workday.</strong><p>The colored rows show each participant's available window in UTC.</p>"; }
}
function reset() { dateInput.value = dateKey(new Date()); zones.splice(0, zones.length, { name: "New York", zone: "America/New_York" }, { name: "London", zone: "Europe/London" }, { name: "Tokyo", zone: "Asia/Tokyo" }); renderPeople(); update(); }
dateInput.value = dateKey(new Date());
timezoneLabel.textContent = `Your zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
renderPeople(); update();
document.querySelector("#today-button").addEventListener("click", () => { dateInput.value = dateKey(new Date()); update(); });
document.querySelector("#reset-button").addEventListener("click", reset);
dateInput.addEventListener("input", update);
