
const OPEN_HOUR = 7;    
const CLOSE_HOUR = 22;  
const STORE_KEY = "apex-arena-bookings";

const SPORTS = [
  { slug: "badminton",  name: "Badminton",  title: "Badminton Synthetic Courts", price: 15, courts: 4, maxPlayers: 4,  type: "Indoor Court", img: "Assets/images/badminton.jpg" },
  { slug: "basketball", name: "Basketball", title: "NBA Spec Basketball Arena",  price: 30, courts: 2, maxPlayers: 10, type: "Full Court",   img: "Assets/images/basketball.jpg" },
  { slug: "futsal",     name: "Futsal",     title: "FIFA Approved Futsal Turf",  price: 40, courts: 3, maxPlayers: 12, type: "5v5 Field",    img: "Assets/images/futsal.jpg" },
  { slug: "volleyball", name: "Volleyball", title: "Indoor Beach Volleyball",    price: 25, courts: 3, maxPlayers: 12, type: "Indoor Court", img: "Assets/images/volleyball.jpg" }
];

function hr12(h) {
  const h24 = h % 24;
  return (h24 % 12 || 12) + ":00 " + (h24 < 12 ? "AM" : "PM");
}

function money(n) {
  return "$" + Number(n).toLocaleString("en-US");
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function todayISO() {
  const d = new Date();
  return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
}

function prettyDate(iso) {
  return new Date(iso + "T00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function findSport(slug) {
  return SPORTS.find((s) => s.slug === slug);
}

function readBookings() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function writeBookings(list) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(list));
    return true;
  } catch (e) {
    return false;
  }
}
function sampleBooked(slug, court, date, hour) {
  const text = slug + "|" + court + "|" + date + "|" + hour;
  let x = 2166136261;
  for (let i = 0; i < text.length; i++) {
    x ^= text.charCodeAt(i);
    x = Math.imul(x, 16777619);
  }
  x ^= x >>> 13;
  x = Math.imul(x, 1274126177);
  x ^= x >>> 16;          
  return (x >>> 0) % 100 < 28;
}
function isPast(date, hour) {
  return date === todayISO() && hour <= new Date().getHours();
}
function isTaken(slug, court, date, hour) {
  if (sampleBooked(slug, court, date, hour)) return true;
  return readBookings().some((b) => b.sport === slug && b.court === court && b.date === date && b.hours.includes(hour));
}

function slotState(slug, court, date, hour) {
  if (isPast(date, hour)) return "past";
  if (isTaken(slug, court, date, hour)) return "taken";
  return "free";
}

function openStatus() {
  const h = new Date().getHours();
  return h >= OPEN_HOUR && h < CLOSE_HOUR ? "Open now" : "Closed now";
}
