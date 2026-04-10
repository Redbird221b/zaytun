window.addEventListener("load", () => {
  document.body.classList.add("is-ready");

  const year = document.getElementById("year");
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (header && navToggle && siteNav) {
    const mobileMenu = window.matchMedia("(max-width: 720px)");

    const setMenuState = (isOpen) => {
      header.classList.toggle("menu-open", isOpen);
      document.body.classList.toggle("menu-open", isOpen && mobileMenu.matches);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
    };

    navToggle.addEventListener("click", () => {
      setMenuState(!header.classList.contains("menu-open"));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileMenu.matches) {
          setMenuState(false);
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (!mobileMenu.matches || !header.classList.contains("menu-open")) {
        return;
      }

      if (!header.contains(event.target)) {
        setMenuState(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenuState(false);
      }
    });

    mobileMenu.addEventListener("change", (event) => {
      if (!event.matches) {
        setMenuState(false);
      }
    });
  }

  const carousels = Array.from(document.querySelectorAll("[data-carousel]"));

  carousels.forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));

    if (!track || !slides.length) {
      return;
    }

    let activeIndex = 0;
    let scrollFrame = 0;

    const updateControls = (index) => {
      activeIndex = index;

      if (prevButton) {
        prevButton.disabled = index === 0;
      }

      if (nextButton) {
        nextButton.disabled = index === slides.length - 1;
      }

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === index;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });
    };

    const scrollToSlide = (index, behavior = reduceMotion.matches ? "auto" : "smooth") => {
      const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
      const left = slides[nextIndex].offsetLeft - track.offsetLeft;

      track.scrollTo({ left, behavior });
      updateControls(nextIndex);
    };

    const syncActiveSlide = () => {
      scrollFrame = 0;

      const currentLeft = track.scrollLeft;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.offsetLeft - track.offsetLeft - currentLeft);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) {
        updateControls(closestIndex);
      }
    };

    track.addEventListener(
      "scroll",
      () => {
        if (!scrollFrame) {
          scrollFrame = window.requestAnimationFrame(syncActiveSlide);
        }
      },
      { passive: true }
    );

    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToSlide(activeIndex + 1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToSlide(activeIndex - 1);
      }
    });

    prevButton?.addEventListener("click", () => {
      scrollToSlide(activeIndex - 1);
    });

    nextButton?.addEventListener("click", () => {
      scrollToSlide(activeIndex + 1);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        scrollToSlide(index);
      });
    });

    window.addEventListener("resize", () => {
      scrollToSlide(activeIndex, "auto");
    });

    updateControls(0);
  });

  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("in-view"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18
      }
    );

    items.forEach((item) => {
      if (item.dataset.reveal !== "hero") {
        observer.observe(item);
      }
    });
  }

  const parallaxItems = Array.from(document.querySelectorAll("[data-parallax]"));

  if (!reduceMotion.matches && parallaxItems.length) {
    let ticking = false;

    const updateParallax = () => {
      const viewportCenter = window.innerHeight / 2;

      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallax || 8);
        const rect = item.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = elementCenter - viewportCenter;
        const shift = (distance / window.innerHeight) * -speed;

        item.style.setProperty("--parallax-shift", `${shift.toFixed(2)}px`);
      });

      ticking = false;
    };

    const requestParallax = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);
  }
});
