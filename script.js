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

  if (siteNav) {
    const currentFile = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

    siteNav.querySelectorAll("a[href]").forEach((link) => {
      const rawHref = link.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("http")) {
        return;
      }

      const href = rawHref.split("#")[0].toLowerCase();
      if (href === currentFile || (currentFile === "" && href === "index.html")) {
        link.classList.add("is-current");
      }
    });
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
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15
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
        const speed = Number(item.dataset.parallax || 6);
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
