
const MAX_HOURS = 3;
const PHONE_RULE = /^(\+92|0092|92|0)3\d{2}[- ]?\d{7}$/;
const EMAIL_RULE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const pick = { sport: "", court: 1, hours: [] };
const el = (id) => document.getElementById(id);
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function drawSports(mode) {
  const list = SPORTS.slice();
  if (mode === "asc") list.sort((a, b) => a.price - b.price);
  if (mode === "desc") list.sort((a, b) => b.price - a.price);
  if (mode === "name") list.sort((a, b) => a.name.localeCompare(b.name));

  el("sport-pick").innerHTML = list.map((s) => `
    <button type="button" class="pick-card${s.slug === pick.sport ? " selected" : ""}" data-slug="${s.slug}" aria-pressed="${s.slug === pick.sport}">
      <img class="pick-img" src="${s.img}" alt="${s.name} court">
      <span class="pick-body">
        <span class="pick-name">${s.name}</span>
        <span class="pick-price">${money(s.price)} / hr</span>
        <span class="pick-meta">${s.courts} courts, up to ${s.maxPlayers} players</span>
      </span>
    </button>`).join("");

  el("sport-pick").querySelectorAll(".pick-card").forEach((card) => {
    card.addEventListener("click", () => choose(card.dataset.slug));
  });
}

function choose(slug) {
  pick.sport = slug;
  pick.court = 1;
  pick.hours = [];
  showError("sport", "");
  drawSports(el("sort").value);
  drawCourts();
  drawSlots();
  const sport = findSport(slug);
  el("players").max = sport.maxPlayers;
  el("players-hint").textContent = "Up to " + sport.maxPlayers + " players on one court.";
  if (Number(el("players").value) > sport.maxPlayers) el("players").value = sport.maxPlayers;
}

function drawCourts() {
  const box = el("court-pick");
  const sport = findSport(pick.sport);
  if (!sport) { box.innerHTML = '<span class="hint">Choose a sport first.</span>'; return; }
  let html = "";
  for (let c = 1; c <= sport.courts; c++) {
    html += `<button type="button" class="court-btn${c === pick.court ? " selected" : ""}" data-court="${c}" aria-pressed="${c === pick.court}">Court ${c}</button>`;
  }
  box.innerHTML = html;
  box.querySelectorAll(".court-btn").forEach((b) => {
    b.addEventListener("click", () => {
      pick.court = Number(b.dataset.court);
      pick.hours = [];
      drawCourts();
      drawSlots();
    });
  });
}

function drawSlots() {
  const grid = el("slot-grid");
  const sport = findSport(pick.sport);
  const date = el("date").value;

  if (!sport || !date) {
    grid.innerHTML = "";
    el("slot-hint").textContent = !sport ? "Choose a sport first." : "Pick a date to see the free hours.";
    refreshSummary();
    return;
  }
  pick.hours = pick.hours.filter((h) => slotState(sport.slug, pick.court, date, h) === "free");

  let free = 0;
  let html = "";
  for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
    const state = slotState(sport.slug, pick.court, date, h);
    if (state === "free") free++;
    const on = pick.hours.includes(h);
    const cls = "slot-btn" + (on ? " selected" : "") + (state === "taken" ? " taken" : "") + (state === "past" ? " past" : "");
    html += `<button type="button" class="${cls}" data-hour="${h}" aria-pressed="${on}"${state !== "free" ? " disabled" : ""} title="${state === "taken" ? "Already booked" : state === "past" ? "This hour has passed" : "Free"}">${hr12(h)} - ${hr12(h + 1)}</button>`;
  }
  grid.innerHTML = html;
  grid.querySelectorAll(".slot-btn").forEach((b) => b.addEventListener("click", () => toggleHour(Number(b.dataset.hour))));

  el("slot-hint").textContent = free
    ? free + " of " + (CLOSE_HOUR - OPEN_HOUR) + " hours are free on Court " + pick.court + ". Pick one hour or up to " + MAX_HOURS + " hours in a row."
    : "Every hour on this court is taken for this date. Try another court or day.";
  refreshSummary();
}

function toggleHour(h) {
  const i = pick.hours.indexOf(h);
  if (i > -1) {
    pick.hours.splice(i, 1);
  } else {
    if (pick.hours.length >= MAX_HOURS) {
      showError("slots", "You can book up to " + MAX_HOURS + " hours at a time.");
      return;
    }
    const nextHours = pick.hours.concat(h).sort((a, b) => a - b);
    if (!inARow(nextHours)) {
      showError("slots", "Choose consecutive hours. Remove the gap before adding this hour.");
      return;
    }
    pick.hours = nextHours;
  }
  showError("slots", "");
  el("slot-grid").querySelectorAll(".slot-btn").forEach((b) => {
    const on = pick.hours.includes(Number(b.dataset.hour));
    b.classList.toggle("selected", on);
    b.setAttribute("aria-pressed", on);
  });
  refreshSummary();
}

function inARow(hours) {
  return hours.every((h, i) => i === 0 || h === hours[i - 1] + 1);
}

function timeRange(hours) {
  return hr12(hours[0]) + " - " + hr12(hours[hours.length - 1] + 1);
}

function refreshSummary() {
  const sport = findSport(pick.sport);
  const date = el("date").value;
  el("s-sport").textContent = sport ? sport.name : "Not chosen";
  el("s-court").textContent = sport ? "Court " + pick.court : "-";
  el("s-date").textContent = date ? prettyDate(date) : "-";
  el("s-time").textContent = !pick.hours.length ? "No hours selected" : inARow(pick.hours) ? timeRange(pick.hours) : "Hours are not in a row";
  el("s-rate").textContent = sport ? money(sport.price) + " per hour" : "-";
  el("s-hours").textContent = pick.hours.length;

  const total = el("s-total");
  const before = total.textContent;
  total.textContent = money(sport ? sport.price * pick.hours.length : 0);
  if (before !== total.textContent) {
    total.classList.add("pop");
    setTimeout(() => total.classList.remove("pop"), 200);
  }
}

function showError(key, message) {
  const span = el("e-" + key);
  if (span) span.textContent = message;
  const input = el(key);
  if (input && input.classList) {
    input.classList.toggle("bad", message !== "");
    input.setAttribute("aria-invalid", message !== "");
  }
}

function validate() {
  const sport = findSport(pick.sport);
  const date = el("date").value;
  const phone = el("phone").value.trim().replace(/\s+/g, " ");
  const players = Number(el("players").value);
  const problems = [];

  if (!sport) problems.push(["sport", "Choose a sport."]);
  if (!date) problems.push(["date", "Choose a date."]);
  else if (date < todayISO()) problems.push(["date", "That date has passed. Choose today or a later date."]);
  if (!pick.hours.length) problems.push(["slots", "Select at least one free hour."]);
  else if (!inARow(pick.hours)) problems.push(["slots", "Choose hours that follow each other, with no gaps."]);
  if (el("name").value.trim().length < 3) problems.push(["name", "Enter your full name (at least 3 letters)."]);
  else if (/\d/.test(el("name").value)) problems.push(["name", "Names cannot contain numbers."]);
  if (!phone) problems.push(["phone", "Enter your mobile number."]);
  else if (!PHONE_RULE.test(phone)) problems.push(["phone", "Use a Pakistani mobile number, like 0300 1234567 or +92 300 1234567."]);
  if (!el("email").value.trim()) problems.push(["email", "Enter your email address."]);
  else if (!EMAIL_RULE.test(el("email").value.trim())) problems.push(["email", "Enter a valid email, like name@example.com."]);
  const max = sport ? sport.maxPlayers : 30;
  if (!Number.isInteger(players) || players < 1 || players > max) problems.push(["players", "Enter a number of players from 1 to " + max + "."]);

  ["sport", "date", "slots", "name", "phone", "email", "players"].forEach((k) => showError(k, ""));
  problems.forEach(([k, m]) => showError(k, m));

  if (problems.length) {
    const first = problems[0][0];
    const target = el(first) || el("slot-grid") || el("sport-pick");
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    if (target.focus) target.focus({ preventScroll: true });
  }
  return problems.length === 0;
}

function newId() {
  return "APX-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).toUpperCase().slice(2, 6);
}

el("book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validate()) return;

  const sport = findSport(pick.sport);
  const date = el("date").value;
  if (pick.hours.some((h) => slotState(sport.slug, pick.court, date, h) !== "free")) {
    showError("slots", "One of those hours was just taken. Please pick another.");
    drawSlots();
    return;
  }

  const booking = {
    id: newId(), sport: sport.slug, court: pick.court, date: date, hours: pick.hours.slice(),
    name: el("name").value.trim(), phone: el("phone").value.trim(), email: el("email").value.trim(),
    players: Number(el("players").value), notes: el("notes").value.trim(),
    total: sport.price * pick.hours.length, created: Date.now()
  };

  const all = readBookings();
  all.push(booking);
  if (!writeBookings(all)) {
    toast("This browser blocked saving. Please allow site storage and try again.");
    return;
  }
  showPass(booking);
  drawMine();
});

function showPass(b) {
  const sport = findSport(b.sport);
  el("form-area").innerHTML = `
    <div class="pass" id="pass" tabindex="-1">
      <div class="pass-tick" aria-hidden="true">✓</div>
      <h2 class="pass-title">You are booked, ${escapeHTML(b.name.split(" ")[0])}</h2>
      <p class="pass-text">Show this booking ID at the front desk. Payment is taken on site. A copy is saved in this browser.</p>
      <div class="pass-id">${escapeHTML(b.id)}</div>
      <div class="pass-rows">
        <div class="sum-row"><span class="sum-label">Sport</span><span class="sum-value">${escapeHTML(sport.name)}</span></div>
        <div class="sum-row"><span class="sum-label">Court</span><span class="sum-value">Court ${escapeHTML(b.court)}</span></div>
        <div class="sum-row"><span class="sum-label">Date</span><span class="sum-value">${escapeHTML(prettyDate(b.date))}</span></div>
        <div class="sum-row"><span class="sum-label">Time</span><span class="sum-value">${escapeHTML(timeRange(b.hours))}</span></div>
        <div class="sum-row"><span class="sum-label">Players</span><span class="sum-value">${escapeHTML(b.players)}</span></div>
        <div class="sum-row"><span class="sum-label">Total to pay</span><span class="sum-value">${escapeHTML(money(b.total))}</span></div>
      </div>
      <div class="btn-row" style="justify-content:center">
        <button class="btn-main" type="button" onclick="window.print()">Print booking pass</button>
        <a class="btn-line" href="booking.html">Book another court</a>
      </div>
    </div>`;
  el("summary").hidden = true;
  el("pass").focus();
  el("pass").scrollIntoView({ behavior: "smooth", block: "center" });
  toast("Booking confirmed: " + b.id);
}

function drawMine() {
  const all = readBookings().sort((a, b) => b.created - a.created);
  el("my-section").hidden = all.length === 0;
  el("my-list").innerHTML = "";
  all.forEach((b) => {
    const sport = findSport(b.sport);
    if (!sport || !Array.isArray(b.hours) || !b.hours.length) return;
    const card = document.createElement("article");
    card.className = "my-card";
    card.innerHTML = `<h3 class="my-name">${escapeHTML(sport.name)} · Court ${escapeHTML(b.court)}</h3><p class="my-text">${escapeHTML(b.id)}<br>${escapeHTML(prettyDate(b.date))}<br>${escapeHTML(timeRange(b.hours))} · ${escapeHTML(money(b.total))}</p><button class="my-cancel" type="button">Cancel booking</button>`;
    card.querySelector(".my-cancel").addEventListener("click", () => {
      if (!confirm("Cancel booking " + b.id + "?")) return;
      writeBookings(readBookings().filter((x) => x.id !== b.id));
      drawMine();
      drawSlots();
      toast("Booking cancelled");
    });
    el("my-list").appendChild(card);
  });
}

const dateInput = el("date");
dateInput.min = todayISO();
const last = new Date();
last.setDate(last.getDate() + 30);
dateInput.max = last.getFullYear() + "-" + pad2(last.getMonth() + 1) + "-" + pad2(last.getDate());
dateInput.value = todayISO();

el("sort").addEventListener("change", () => drawSports(el("sort").value));
dateInput.addEventListener("change", () => {
  pick.hours = [];
  showError("date", dateInput.value && dateInput.value < todayISO() ? "That date has passed. Choose today or a later date." : "");
  drawSlots();
});
["name", "phone", "email", "players"].forEach((k) => {
  el(k).addEventListener("input", () => { if (el(k).getAttribute("aria-invalid") === "true") validate(); });
});

drawSports("default");
drawCourts();
drawSlots();
drawMine();
const wanted = new URLSearchParams(location.search).get("sport");
if (findSport(wanted)) choose(wanted);
