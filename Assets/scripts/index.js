
const loaderStart = Date.now();

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  const wait = Math.max(0, 1800 - (Date.now() - loaderStart));
  setTimeout(() => {
    loader.classList.add("hide");
    setTimeout(() => loader.remove(), 700);
  }, wait);
});

