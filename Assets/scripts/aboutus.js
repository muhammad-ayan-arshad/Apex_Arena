
document.addEventListener("DOMContentLoaded", () => {
  const badge = document.getElementById("open-status");
  if (badge) {
    const status = openStatus(); 
    badge.textContent = status + " (7:00 AM - 10:00 PM daily)";
    badge.classList.toggle("closed", status === "Closed now");
  }
  const numbers = document.querySelectorAll("[data-count]");

  function count(el) {
    const end = Number(el.dataset.count);
    const plus = el.dataset.plus === "yes" ? "+" : "";
    const start = performance.now();
    const length = 1600; 

    function step(now) {
      const t = Math.min((now - start) / length, 1);
      const eased = 1 - Math.pow(1 - t, 3); 
      el.textContent = Math.round(end * eased).toLocaleString("en-US") + (t === 1 ? plus : "");
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const watcher = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        count(entry.target);
        watcher.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.2 });

  numbers.forEach((n) => watcher.observe(n));
});