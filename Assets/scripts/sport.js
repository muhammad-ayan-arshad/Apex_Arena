
document.addEventListener("DOMContentLoaded", () => {
  const sport = findSport(document.body.dataset.sport);

  const list = document.getElementById("today-list");
  if (sport && list) {
    const today = todayISO();
    let html = "";
    for (let court = 1; court <= sport.courts; court++) {
      let free = 0;
      let cells = "";
      for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
        const state = slotState(sport.slug, court, today, h);
        if (state === "free") free++;
        const cls = state === "free" ? "cell" : state === "taken" ? "cell cell-taken" : "cell cell-past";
        cells += `<div class="${cls}" title="${hr12(h)}: ${state}"></div>`;
      }
      html += `<div class="court-row"><div class="court-top"><span class="court-name">Court ${court}</span><span class="court-free">${free} free</span></div><div class="cells">${cells}</div></div>`;
    }
    list.innerHTML = html;
  }

  const tiles = Array.from(document.querySelectorAll(".shot-btn"));
  let current = 0;
  let box = null;
  let opener = null;

  function show(i) {
    current = (i + tiles.length) % tiles.length;
    const tile = tiles[current];
    const img = tile.querySelector("img");
    box.querySelector(".lightbox-box-img").innerHTML = `<img class="${img.className}" src="${img.src}" alt="${img.alt}">`;
    box.querySelector(".lightbox-cap").textContent = tile.dataset.caption;
  }

  function close() {
    document.removeEventListener("keydown", onKey);
    box.remove();
    box = null;
    if (opener) opener.focus();
  }

  function onKey(e) {
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "ArrowLeft") show(current - 1);
  }

  tiles.forEach((tile, i) => {
    tile.addEventListener("click", () => {
      opener = tile;
      box = document.createElement("div");
      box.className = "lightbox";
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-modal", "true");
      box.setAttribute("aria-label", "Photo viewer");
      box.innerHTML = `<div class="lightbox-box"><div class="lightbox-box-img" style="width:100%;height:100%"></div><p class="lightbox-cap"></p><button class="lightbox-btn lightbox-close" aria-label="Close photo">×</button><button class="lightbox-btn lightbox-prev" aria-label="Previous photo">‹</button><button class="lightbox-btn lightbox-next" aria-label="Next photo">›</button></div>`;
      document.body.appendChild(box);
      show(i);
      box.querySelector(".lightbox-close").focus();
      box.querySelector(".lightbox-close").addEventListener("click", close);
      box.querySelector(".lightbox-prev").addEventListener("click", () => show(current - 1));
      box.querySelector(".lightbox-next").addEventListener("click", () => show(current + 1));
      box.addEventListener("click", (e) => { if (e.target === box) close(); });
      document.addEventListener("keydown", onKey);
    });
  });
});
