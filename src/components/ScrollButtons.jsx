import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function ScrollButtons({ isClickable }) {
  const sections = [
    "home",
    "about",
    "skills",
    "projects",
    "timeline",
    "cv",
    "contact",
  ];

  const [current, setCurrent] = useState("home");
  const [scrolling, setScrolling] = useState(false);
  const scrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const setScrollingState = (val) => {
    scrollingRef.current = val;
    setScrolling(val);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      },
      { threshold: 0.55 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const getClosestSectionIndex = () => {
    let closest = 0;
    let minDist = Infinity;
    const viewportCenter = window.innerHeight / 2;

    sections.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const dist = Math.abs(elementCenter - viewportCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = idx;
      }
    });

    return closest;
  };

  const scrollToSection = (index) => {
    if (index < 0 || index >= sections.length) return;
    setScrollingState(true);

    const el = document.getElementById(sections[index]);
    if (!el) {
      scrollTimeoutRef.current = setTimeout(
        () => setScrollingState(false),
        400
      );
      return;
    }

    // calcular posición exacta de la sección
    const top = el.offsetTop;
    window.scrollTo({ top, behavior: "smooth" });

    setCurrent(sections[index]);

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => setScrollingState(false), 500);
  };

  // WHEEL
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isClickable || scrollingRef.current) return;
      e.preventDefault();
      const idx = getClosestSectionIndex();
      if (e.deltaY > 0) scrollToSection(idx + 1);
      else if (e.deltaY < 0) scrollToSection(idx - 1);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isClickable]);

  // KEYS
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isClickable || scrollingRef.current) return;

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const idx = getClosestSectionIndex();
        if (e.key === "ArrowDown") scrollToSection(idx + 1);
        else scrollToSection(idx - 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isClickable]);

  // TOUCH (móvil): swipe mejorado
  useEffect(() => {
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches?.[0]?.clientY ?? 0;
      touchStartTime = Date.now();
    };

    const handleTouchEnd = (e) => {
      if (!isClickable || scrollingRef.current) return;
      const touchEndY = e.changedTouches?.[0]?.clientY ?? 0;
      const diff = touchStartY - touchEndY;
      const time = Date.now() - touchStartTime;

      const idx = getClosestSectionIndex();
      const velocity = Math.abs(diff / time); // velocidad del swipe

      if (diff > 50 || (velocity > 0.5 && diff > 30)) {
        scrollToSection(idx + 1);
      } else if (diff < -50 || (velocity > 0.5 && diff < -30)) {
        scrollToSection(idx - 1);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isClickable]);

  const scrollTo = (direction) => {
    const idx = getClosestSectionIndex();
    scrollToSection(direction === "down" ? idx + 1 : idx - 1);
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-6 z-30">
      {current !== "home" && (
        <>
          <button
            onClick={() => scrollTo("up")}
            className={`p-3 bg-black/40 cursor-pointer text-white rounded-full hover:bg-cyan-500 transition animate-pulse ${
              !isClickable ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <FiChevronUp size={26} />
          </button>

          {current !== "contact" && (
            <button
              onClick={() => scrollTo("down")}
              className={`p-3 bg-black/40 cursor-pointer text-white rounded-full hover:bg-cyan-500 transition animate-pulse ${
                !isClickable ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <FiChevronDown size={26} />
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default ScrollButtons;
