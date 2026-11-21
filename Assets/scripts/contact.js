
document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.getElementById("contact-form");
  const fields = { name: "c-name", email: "c-email", msg: "c-msg" };

  function setError(key, message) {
    const input = document.getElementById(fields[key]);
    document.getElementById("e-" + key).textContent = message;
    input.classList.toggle("bad", message !== "");
    input.setAttribute("aria-invalid", message !== "");
    return message === "";
  }

  function check() {
    const name = document.getElementById("c-name").value.trim();
    const email = document.getElementById("c-email").value.trim();
    const msg = document.getElementById("c-msg").value.trim();

    const a = setError("name", name.length < 2 ? "Enter your name (at least 2 letters)." : "");
    const b = setError("email", email === "" ? "Enter your email address." : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "Enter a valid email, like name@example.com." : "");
    const c = setError("msg", msg.length < 10 ? "Write at least 10 characters so we can help you properly." : "");
    return a && b && c;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!check()) {
      form.querySelector("[aria-invalid=true]").focus();
      return;
    }
    try {
      const all = JSON.parse(localStorage.getItem("apex-arena-messages") || "[]");
      all.push({ name: document.getElementById("c-name").value.trim(), email: document.getElementById("c-email").value.trim(), topic: document.getElementById("c-topic").value, message: document.getElementById("c-msg").value.trim(), sent: new Date().toISOString() });
      localStorage.setItem("apex-arena-messages", JSON.stringify(all));
    } catch (err) {
      const ok = document.getElementById("c-success");
      ok.hidden = false;
      ok.textContent = "Your browser could not save this message. Please enable site storage and try again.";
      ok.setAttribute("role", "alert");
      return;
    }

    const first = document.getElementById("c-name").value.trim().split(" ")[0];
    const ok = document.getElementById("c-success");
    ok.hidden = false;
    ok.setAttribute("role", "status");
    ok.textContent = "Thank you, " + first + ". Your message has been saved in this browser. This form does not send email.";
    form.reset();
    toast("Message received");
  });

  form.querySelectorAll(".input").forEach((input) => {
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") check();
    });
  });
});
