// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Testimonials Slider
class TestimonialsSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".testimonial-card");
    this.totalSlides = this.slides.length;
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");

    this.init();
  }

  init() {
    this.showSlide(0);
    this.bindEvents();
    this.autoPlay();
  }

  bindEvents() {
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());
  }

  showSlide(index) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.slides[index].classList.add("active");
    this.currentSlide = index;
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.showSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.showSlide(prevIndex);
  }

  autoPlay() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
}

// Initialize testimonials slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TestimonialsSlider();
});

// Counter Animation for Stats
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ""));
        const suffix = counter.textContent.replace(/[\d]/g, "");

        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.floor(current) + suffix;
        }, 20);

        observer.unobserve(counter);
      }
    });
  });

  counters.forEach((counter) => observer.observe(counter));
};

// Scroll Animation for Elements
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".feature-card, .service-card, .esg-card, .stat-item"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
};

// Enhanced Contact Form Handling
const handleEnhancedContactForm = () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Validate required fields
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "service",
        "message",
      ];
      let isValid = true;

      requiredFields.forEach((field) => {
        const input = contactForm.querySelector(`[name="${field}"]`);
        if (!data[field] || data[field].trim() === "") {
          input.style.borderColor = "#dc2626";
          isValid = false;
        } else {
          input.style.borderColor = "#d1d5db";
        }
      });

      if (!isValid) {
        alert("Please fill in all required fields.");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        const emailInput = contactForm.querySelector('[name="email"]');
        emailInput.style.borderColor = "#dc2626";
        alert("Please enter a valid email address.");
        return;
      }

      // Validate phone format (Indian mobile number)
      const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
      if (!phoneRegex.test(data.phone.replace(/\s+/g, ""))) {
        const phoneInput = contactForm.querySelector('[name="phone"]');
        phoneInput.style.borderColor = "#dc2626";
        alert("Please enter a valid Indian mobile number.");
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector(".btn-primary");
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Create WhatsApp message
        const whatsappMessage = `Hello Bajrang Logistics,

I'm interested in your services. Here are my details:

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
${data.company ? `Company: ${data.company}` : ""}Service Required: ${
          data.service
        }
${data.budget ? `Budget: ${data.budget}` : ""}

Message: ${data.message}

${data.newsletter ? "I would like to subscribe to your newsletter." : ""}

Please get in touch with me.

Thank you!`;

        const whatsappUrl = `https://wa.me/919997583413?text=${encodeURIComponent(
          whatsappMessage
        )}`;

        // Show success message
        alert(
          "Thank you for your message! We will get back to you soon. You will now be redirected to WhatsApp for direct communication."
        );

        // Reset form
        contactForm.reset();

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Open WhatsApp
        window.open(whatsappUrl, "_blank");
      }, 2000);
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", (e) => {
        if (e.target.hasAttribute("required") && !e.target.value.trim()) {
          e.target.style.borderColor = "#dc2626";
        } else {
          e.target.style.borderColor = "#d1d5db";
        }
      });
    });
  }
};

// Parallax Effect for Hero Section
const parallaxEffect = () => {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(
      ".hero-bg, .rotating-element"
    );

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
};

// Loading Animation
const showLoadingAnimation = () => {
  const elements = document.querySelectorAll(".hero-text, .hero-animation");

  elements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(50px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 200 + 500);
  });
};

// Typing Effect for Hero Title
const typingEffect = () => {
  const titleMain = document.querySelector(".title-main");
  const text = titleMain.textContent;
  titleMain.textContent = "";

  let i = 0;
  const timer = setInterval(() => {
    titleMain.textContent += text.charAt(i);
    i++;
    if (i > text.length - 1) {
      clearInterval(timer);
    }
  }, 100);
};

// Service Cards Hover Effect
const serviceCardsEffect = () => {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.05)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
};

// Lazy Loading for Images
const lazyLoadImages = () => {
  const images = document.querySelectorAll("img");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = "0";
        img.style.transition = "opacity 0.5s ease";

        img.onload = () => {
          img.style.opacity = "1";
        };

        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
};

// Page-specific animations
const addPageAnimations = () => {
  // Animate page header on load
  const pageHeader = document.querySelector(".page-header");
  if (pageHeader) {
    pageHeader.style.opacity = "0";
    pageHeader.style.transform = "translateY(50px)";

    setTimeout(() => {
      pageHeader.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      pageHeader.style.opacity = "1";
      pageHeader.style.transform = "translateY(0)";
    }, 200);
  }

  // Animate cards with staggered effect
  const animateCards = (selector, delay = 100) => {
    const cards = document.querySelectorAll(selector);
    cards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";

      setTimeout(() => {
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, delay * (index + 1));
    });
  };

  // Apply animations to different card types
  animateCards(".contact-card");
  animateCards(".mv-card");
  animateCards(".value-item", 80);
  animateCards(".service-card-detailed", 150);
  animateCards(".additional-card", 60);
  animateCards(".industry-card", 50);
};

// Enhanced scroll to top functionality
const addScrollToTop = () => {
  // Create scroll to top button
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  scrollBtn.className = "scroll-to-top";
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #1e40af;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(30, 64, 175, 0.3);
    `;

  document.body.appendChild(scrollBtn);

  // Show/hide scroll button
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.visibility = "visible";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.visibility = "hidden";
    }
  });

  // Scroll to top on click
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Hover effect
  scrollBtn.addEventListener("mouseenter", () => {
    scrollBtn.style.transform = "scale(1.1)";
    scrollBtn.style.background = "#1e3a8a";
  });

  scrollBtn.addEventListener("mouseleave", () => {
    scrollBtn.style.transform = "scale(1)";
    scrollBtn.style.background = "#1e40af";
  });
};

// Loading screen
const addLoadingScreen = () => {
  const loadingScreen = document.createElement("div");
  loadingScreen.className = "loading-screen";
  loadingScreen.innerHTML = `
        <div class="loading-content">
            <img src="images/Bajrang Logistic Service Logo.jpeg" alt="Loading..." style="width: 80px; height: 80px; border-radius: 50%; object-fit: contain; background: white; padding: 10px;">
            <div class="loading-spinner"></div>
            <p>Loading Bajrang Logistics...</p>
        </div>
    `;
  loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
        text-align: center;
    `;

  const style = document.createElement("style");
  style.textContent = `
        .loading-content p {
            margin-top: 20px;
            font-size: 1.1rem;
            opacity: 0.9;
        }
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(style);

  document.body.prepend(loadingScreen);

  // Remove loading screen after page loads
  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        if (loadingScreen.parentNode) {
          loadingScreen.remove();
        }
      }, 500);
    }, 1000);
  });
};

// Initialize all enhanced functions
document.addEventListener("DOMContentLoaded", () => {
  showLoadingAnimation();
  setTimeout(typingEffect, 1000);
  animateCounters();
  animateOnScroll();
  handleContactForm();
  parallaxEffect();
  serviceCardsEffect();
  lazyLoadImages();
  addLoadingScreen();
  handleEnhancedContactForm();
  addPageAnimations();
  addScrollToTop();
});

// Window load event for final animations
window.addEventListener("load", () => {
  // Add any final loading animations here
  document.body.style.opacity = "1";
});

// Utility Functions
const utils = {
  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle: (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
};

// Optimize scroll events with throttling
window.addEventListener(
  "scroll",
  utils.throttle(() => {
    // Any additional scroll-based animations can go here
  }, 16)
); // ~60fps

// Add custom cursor effect (optional)
const customCursor = () => {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: #fbbf24;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - 10 + "px";
    cursor.style.top = e.clientY - 10 + "px";
    cursor.style.opacity = "0.7";
  });

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "scale(0.8)";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "scale(1)";
  });
};

// Initialize custom cursor (uncomment if desired)
// customCursor();

// Error handling for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", function () {
    this.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBMMTMwIDEzMEg3MEwxMDAgNzBaIiBmaWxsPSIjOUM5Qzk3Ii8+Cjwvc3ZnPgo=";
  });
});

console.log("Bajrang Logistics website loaded successfully!");
