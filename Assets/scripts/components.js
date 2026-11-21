

const ICON = "https://img.icons8.com/fluency/96/";

const navbarHTML = `
  <nav class="nav">
    <a href="index.html" class="logo">
      <div class="logo-box"><img src="Assets/images/logo.jpeg" alt="Apex Arena logo"></div>
      APEX <span>ARENA</span>
    </a>

    
    <button class="menu-btn" id="menu-btn" aria-label="Toggle Navigation">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <ul class="links" id="menu">
      <li><a href="index.html">Home</a></li>

      
      <li class="drop">
        <a href="index.html#games">Sports Courts <img class="drop-arrow" src="https://img.icons8.com/ios-filled/50/94a3b8/sort-down.png" alt=""></a>
        <ul class="drop-list">
          <li><a class="drop-link" href="badminton.html">Badminton Synthetic Courts</a></li>
          <li><a class="drop-link" href="basketball.html">NBA Spec Basketball Arena</a></li>
          <li><a class="drop-link" href="futsal.html">FIFA Approved Futsal Turf</a></li>
          <li><a class="drop-link" href="volleyball.html">Indoor Beach Volleyball</a></li>
        </ul>
      </li>

      <li><a href="about_us.html">About Us</a></li>
      <li><a href="contact_us.html">Contact</a></li>
      <li><a href="booking.html" class="nav-book">Book Now</a></li>
    </ul>
  </nav>
`;

const footerHTML = `
  <div class="footer-grid">
    <div class="col brand">
      <div class="foot-brand">
        <div class="logo-box"><img src="Assets/images/logo.jpeg" alt="Apex Arena logo"></div>
        <div class="brand-name">
          <span>APEX</span>
          <span>ARENA</span>
        </div>
      </div>
      <p class="foot-text">
        Next-gen sports facility booking portal. Instant slot selection, transparent onsite payment passes, and direct communication with arena management.
      </p>
      <div class="socials">
        <a href="contact_us.html" class="social" aria-label="Contact Apex Arena">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 5h16v14H4z"></path><path d="m4 7 8 6 8-6"></path></svg>
        </a>
      </div>
    </div>

    <div class="col">
      <h4 class="foot-title">QUICK NAVIGATION</h4>
      <ul class="foot-links">
        <li><a href="index.html">Home Overview</a></li>
        <li><a href="about_us.html">About Our Complex</a></li>
        <li><a href="booking.html">Book a Court</a></li>
        <li><a href="contact_us.html">Contact Arena Manager</a></li>
        <li><a href="about_us.html#rules">Arena Rules & Guidelines</a></li>
      </ul>
    </div>

    <div class="col">
      <h4 class="foot-title">SPORTS COURTS</h4>
      <ul class="foot-links">
        <li><a class="drop-link" href="badminton.html">Badminton Synthetic Courts</a></li>
        <li><a class="drop-link" href="basketball.html">NBA Spec Basketball Arena</a></li>
        <li><a class="drop-link" href="futsal.html">FIFA Approved Futsal Turf</a></li>
        <li><a class="drop-link" href="volleyball.html">Indoor Beach Volleyball</a></li>
      </ul>
    </div>

    <div class="col">
      <h4 class="foot-title">FACILITY LOCATION & HOURS</h4>
      <ul class="foot-info">
        <li><span class="foot-icon"><img src="${ICON}marker.png" alt="Location"></span><span> Cyber Sports Complex, Karachi, Pakistan</span></li>
        <li><span class="foot-icon"><img src="${ICON}clock.png" alt="Opening hours"></span><span>Mon - Sun: 07:00 - 10:00</span></li>
        
      </ul>
    </div>
  </div>
`;

document.addEventListener("DOMContentLoaded", () => {
  const navPlaceholder = document.getElementById("nav-box");
  if (navPlaceholder) {
    navPlaceholder.outerHTML = `<header class="header">${navbarHTML}</header>`;
  }

  const footerPlaceholder = document.getElementById("footer-box");
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = `<footer class="footer">${footerHTML}</footer>`;
  }

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".links a").forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
  const sportPages = ["badminton.html", "basketball.html", "futsal.html", "volleyball.html"];
  const dropLink = document.querySelector(".drop > a");
  if (dropLink && sportPages.includes(currentPath)) {
    dropLink.classList.add("active");
  }
  if (dropLink) {
    dropLink.addEventListener("click", (event) => {
      if (window.innerWidth <= 768) {
        event.preventDefault();
        dropLink.parentElement.classList.toggle("open-drop");
      }
    });
  }

  document.querySelectorAll(".qa").forEach((item) => {
    const button = item.querySelector(".ask");
    const answer = item.querySelector(".answer");
    if (!button || !answer) return;
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", () => {
      const wasOpen = item.classList.contains("active");
      document.querySelectorAll(".qa").forEach((other) => {
        other.classList.remove("active");
        const otherButton = other.querySelector(".ask");
        const otherAnswer = other.querySelector(".answer");
        if (otherButton) otherButton.setAttribute("aria-expanded", "false");
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });
      if (!wasOpen) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  const menuToggle = document.getElementById("menu-btn");
  const navMenu = document.getElementById("menu");

  if (menuToggle && navMenu) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-controls", "menu");
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768 && !link.closest(".drop-list")) {
          navMenu.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }
});