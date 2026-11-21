
function toast(message) {
  let box = document.getElementById("toast");
  if (!box) {
    box = document.createElement("div");
    box.id = "toast";
    box.className = "toast";
    box.setAttribute("role", "status");
    document.body.appendChild(box);
  }
  box.textContent = message;
  box.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => box.classList.remove("show"), 3200);
}

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll("[data-reveal]");
  const watcher = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        setTimeout(() => { entry.target.style.transitionDelay = ""; }, 1000);
        watcher.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item, i) => {
    item.classList.add("reveal");
    item.style.transitionDelay = (i % 4) * 90 + "ms";
    watcher.observe(item);
  });
});
