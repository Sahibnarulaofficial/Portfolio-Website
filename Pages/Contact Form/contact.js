/* ===== Navbar Hamburger ===== */
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("show");
}

// ========= Mobile Menu Toggle =========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

navItems.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      hamburger.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
});


// ===== Contact Form Submit =====
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const responseEl = document.getElementById("responseMsg");
  responseEl.className = "response-message";

  const formData = {
    name: e.target.name.value.trim(),
    email: e.target.email.value.trim(),
    message: e.target.message.value.trim()
  };

  try {
    const res = await fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (data.success) {
      responseEl.textContent = data.message || "Message sent successfully!";
      responseEl.classList.add("success");
      e.target.reset();
    } else {
      responseEl.textContent = data.error || "Please fill in all fields.";
      responseEl.classList.add("error");
    }
  } catch (error) {
    responseEl.textContent = "Server error. Please try again later.";
    responseEl.classList.add("error");
  }
});

// ===== Scroll + Autofill on Pricing Selection =====
const pricingCards = document.querySelectorAll(".pricing-card");
const contactSection = document.querySelector("#contact");
const messageBox = document.querySelector('#contactForm textarea');

pricingCards.forEach(card => {
  const button = card.querySelector(".select-btn");
  button.addEventListener("click", (e) => {
    e.preventDefault();

    // Get message from data attribute
    const message = card.getAttribute("data-message");

    // Smooth scroll to contact section
    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });

    // Autofill message after small delay (to allow scroll)
    setTimeout(() => {
      messageBox.value = message;
      messageBox.focus();
    }, 700);
  });
});
// ===== Fade-in Animation for Pricing Cards on Scroll =====
const cards = document.querySelectorAll(".pricing-card");

const cardObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => cardObserver.observe(card));
