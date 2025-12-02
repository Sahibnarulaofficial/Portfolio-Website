/* ===== Navbar Hamburger ===== */
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("show");
}

// ===== Fade-in on Scroll for Sections =====
const fadeElems = document.querySelectorAll('.fade-in');

const observerOptions = {
  threshold: 0.15, // triggers when 15% of element is visible
};

const fadeInOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // triggers once
    }
  });
}, observerOptions);

fadeElems.forEach(elem => fadeInOnScroll.observe(elem));

// ===== Hero Animated Text =====
const heroText = document.querySelector(".animated-text");
const phrases = [
  "I build modern websites.",
  "I automate business systems.",
  "I grow brands with marketing.",
];

let phraseIndex = 0;
let letterIndex = 0;
let currentPhrase = "";
let isDeleting = false;

function typeAnimation() {
  currentPhrase = phrases[phraseIndex];
  const displayText = isDeleting
    ? currentPhrase.substring(0, letterIndex--)
    : currentPhrase.substring(0, letterIndex++);

  heroText.textContent = displayText;

  let typingSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && letterIndex === currentPhrase.length) {
    typingSpeed = 1500; // pause before deleting
    isDeleting = true;
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(typeAnimation, typingSpeed);
}

typeAnimation();



/* ===== Portfolio Modal ===== */
const projects = [
    {
        title: "NovaAI",
        images: [
            "Images/Portfolio/Portfolio 1/Laptop 1.png",
            "Images/Portfolio/Portfolio 1/Laptop 2.png",
            "Images/Portfolio/Portfolio 1/Laptop 3.png",
            "Images/Portfolio/Portfolio 1/Mobile 1.png",
            "Images/Portfolio/Portfolio 1/Mobile 2.png",
            "Images/Portfolio/Portfolio 1/Mobile 3.png",
            "Images/Portfolio/Portfolio 1/Mobile 4.png"
        ],
        description: "A sleek and responsive corporate website designed for professional service businesses. Includes custom layouts, call-to-action elements, and integrated contact form.",
        description1: "⚡ Loads in 2.1 seconds 📱 100% Mobile Responsive 🔍 SEO Score: 100/100",
        link: "Web Templates/Template 1/template.html"
    },
    {
        title: "E-Commerce Store",
        images: [
            "Images/Portfolio/Portfolio 2/Laptop.png",
            "Images/Portfolio/Portfolio 2/Laptop 1.png",
            "Images/Portfolio/Portfolio 2/Laptop 2.png",
            "Images/Portfolio/Portfolio 2/Mobile 1.png",
            "Images/Portfolio/Portfolio 2/Mobile 2.png",
            "Images/Portfolio/Portfolio 2/Mobile 3.png",
            "Images/Portfolio/Portfolio 2/Mobile 4.png",
            "Images/Portfolio/Portfolio 2/Mobile 5.png"
        ],
        description: "An interactive online store built with user-friendly navigation, product filtering, and secure checkout process — optimized for both desktop and mobile.",
        link: "Web Templates/Template 2/template.html"
    },
    {
        title: "Portfolio Gallery",
        images: [
            "Images/Portfolio/Portfolio 3/Laptop 1.png",
            "Images/Portfolio/Portfolio 3/Laptop 2.png"
        ],
        description: "A minimalist portfolio website for showcasing creative work. Features image gallery, category filters, and smooth animations.",
        link: "Web Templates/Template 3/template.html"
    }
];

let currentProject = 0;
let currentSlide = 0;

function openModal(index) {
    currentProject = index;
    currentSlide = 0;

    const modal = document.getElementById("portfolioModal");
    const slidesContainer = document.getElementById("slidesContainer");
    const modalDescription = document.getElementById("modalDescription");

    slidesContainer.innerHTML = projects[index].images
        .map((src, i) => `<img src="${src}" class="${i === 0 ? 'active' : ''}">`)
        .join("");

    modalDescription.innerHTML = `<h3>${projects[index].title}</h3><p>${projects[index].description}</p> <br> <p>${projects[index].description1}</p> <a href="${projects[index].link}" target="_blank" class="view-template-btn">View Live Website ↗</a>`;
    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("portfolioModal").style.display = "none";
}

function changeSlide(direction) {
    const slides = document.querySelectorAll("#slidesContainer img");
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
}

// Close modal when clicking outside
window.addEventListener("click", function(e) {
    const modal = document.getElementById("portfolioModal");
    if (e.target === modal) closeModal();
});

// Auto-hide scrollbar: show while scrolling or on mouse move, hide after idle
(function () {
  const SHOW_CLASS = 'show-scrollbar';
  const IDLE_DELAY = 900; // milliseconds to wait before hiding

  let timeoutId = null;

  function showScrollbarTemporarily() {
    document.body.classList.add(SHOW_CLASS);
    // clear any previous hide timeout
    if (timeoutId) clearTimeout(timeoutId);
    // hide after IDLE_DELAY ms of no scroll/mousemove
    timeoutId = setTimeout(() => {
      document.body.classList.remove(SHOW_CLASS);
      timeoutId = null;
    }, IDLE_DELAY);
  }

  // events that indicate user activity
  window.addEventListener('scroll', showScrollbarTemporarily, { passive: true });
  window.addEventListener('mousemove', showScrollbarTemporarily);
  window.addEventListener('touchstart', showScrollbarTemporarily, { passive: true });
  window.addEventListener('keydown', showScrollbarTemporarily);

  // optional: show briefly on page load
  window.addEventListener('load', () => {
    showScrollbarTemporarily();
  });
})();


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

// ========= Active Section Highlight on Scroll =========
const sections = document.querySelectorAll('section[id]');
const navLinksArr = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinksArr.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// ===== Shrinking Header on Scroll =====
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.innerWidth <= 900) return; // Only apply on wider screens
  if (window.scrollY > 60) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

// ===== Smooth Scroll + Fade Transition When Clicking Hamburger Links =====
navItems.forEach(link => {
  link.addEventListener('click', (e) => {
    // prevent default jump
    e.preventDefault();

    // close the menu
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      hamburger.classList.remove('active');
      document.body.classList.remove('menu-open');
    }

    // find the target section
    const targetId = link.getAttribute('href').split('#')[1];
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // temporarily hide the section for fade-in
      targetSection.classList.remove('visible');
      targetSection.classList.add('pre-fade'); // hidden state

      // wait a bit for menu to close, then scroll
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 250);

      // fade in after scrolling finishes
      setTimeout(() => {
        targetSection.classList.remove('pre-fade');
        targetSection.classList.add('visible');
      }, 700); // adjust timing for smoother look
    }
  });
});

// ===== Newsletter Subscribe Logic =====
const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const newsletterResponse = document.querySelector(".newsletter-response");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = newsletterEmail.value.trim();
    newsletterResponse.textContent = "Subscribing...";

    const res = await fetch("/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    newsletterResponse.textContent = data.message;
    newsletterEmail.value = "";
  });
}
