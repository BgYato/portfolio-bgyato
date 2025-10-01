import { useEffect, useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

function ScrollButtons() {
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrent(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (direction) => {
    const index = sections.findIndex((id) => id === current);
    let newIndex = direction === "down" ? index + 1 : index - 1;

    if (newIndex >= 0 && newIndex < sections.length) {
      document.getElementById(sections[newIndex]).scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-6 z-50">
      {/* Botón UP */}
      <button
        onClick={() => scrollTo("up")}
        className="p-3 bg-black/40 cursor-pointer text-white rounded-full hover:bg-cyan-500 transition animate-pulse"
      >
        <FiChevronUp size={26} />
      </button>

      {/* Botón DOWN */}
      <button
        onClick={() => scrollTo("down")}
        className="p-3 bg-black/40 cursor-pointer text-white rounded-full hover:bg-cyan-500 transition animate-pulse"
      >
        <FiChevronDown size={26} />
      </button>
    </div>
  );
}

export default ScrollButtons;
