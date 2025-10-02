import { useState, useEffect, useRef } from "react";
import { events } from "../utils/eventsData";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

function Timeline({ isClickable, setIsClickable }) {
  const [selected, setSelected] = useState(events[0]);
  const [imageIndex, setImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const intervalRef = useRef(null);

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startInterval = () => {
    stopInterval();
    if (!isOpen && selected?.images?.length > 1) {
      intervalRef.current = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % selected.images.length);
      }, 6000);
    }
  };

  const resetInterval = () => {
    stopInterval();
    startInterval();
  };

  const handleSelect = (event) => {
    setSelected(event);
    setImageIndex(0);
    startInterval();
  };

  const prevImage = () => {
    if (selected?.images?.length > 1) {
      setImageIndex((prev) =>
        prev === 0 ? selected.images.length - 1 : prev - 1
      );
      resetInterval();
    }
  };

  const nextImage = () => {
    if (selected?.images?.length > 1) {
      setImageIndex((prev) => (prev + 1) % selected.images.length);
      resetInterval();
    }
  };

  const openLightbox = () => {
    setIsOpen(true);
    setIsClickable(false);
    stopInterval();
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setIsClickable(true);
    startInterval();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    startInterval();
    return () => stopInterval();
  }, [selected]);

  return (
    <section
      id="timeline"
      className="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <h2 className="text-3xl font-bold mb-10 text-cyan-400">Biografía</h2>

      {/* Línea del tiempo */}
      <div className="relative w-full max-w-5xl h-20 flex items-center">
        <div className="absolute top-1/2 left-0 right-0 border-t-2 border-gray-600"></div>
        <div className="flex justify-between w-full relative">
          {events.map((e, i) => (
            <button
              key={i}
              onClick={() => handleSelect(e)}
              className="relative flex flex-col items-center cursor-pointer transition"
            >
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  selected?.year === e.year
                    ? "bg-cyan-500 border-cyan-500 scale-110"
                    : "bg-gray-800 border-gray-500 hover:border-cyan-400"
                } transition-transform`}
              />
              <span
                className={`mt-2 text-sm ${
                  selected?.year === e.year
                    ? "text-cyan-400 font-semibold"
                    : "text-gray-400"
                }`}
              >
                {e.year}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Panel */}
      <div
        key={selected?.year || "empty"}
        className="mt-10 w-full max-w-5xl animate-fadeIn"
      >
        {selected ? (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {selected.images && selected.images.length > 0 && (
              <div className="hidden relative md:flex justify-center">
                {selected.images[imageIndex] ? (
                  <img
                    src={selected.images[imageIndex]}
                    alt={selected.year}
                    className="rounded-lg shadow-md max-h-72 object-contain w-full cursor-zoom-in transform transition-all duration-300 hover:scale-105"
                    onClick={openLightbox}
                  />
                ) : (
                  <div className="flex items-center justify-center h-72 w-full bg-gray-800 rounded-lg shadow-md">
                    <span className="text-gray-500 italic">
                      Imagen no disponible
                    </span>
                  </div>
                )}
                {selected.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-cyan-500 transition cursor-pointer"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-cyan-500 transition cursor-pointer"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Texto */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
                {selected.year}
              </h3>
              <p className="text-gray-300 mb-4">{selected.description}</p>
              {selected.highlights && (
                <ul className="text-gray-400 mb-6 space-y-2 min-h-48">
                  {selected.highlights.map((h, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-xs md:text-normal space-x-2"
                    >
                      <FaChevronRight className="text-cyan-400" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic text-center">
            Selecciona un año para ver detalles :D
          </p>
        )}
      </div>

      {/* Previsualización */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-2xl hover:text-cyan-400 cursor-pointer"
          >
            <FaTimes />
          </button>
          <img
            src={selected.images[imageIndex]}
            alt={selected.year}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg transform transition-all duration-300 scale-95 hover:scale-100"
          />
          {/* Prev/Next dentro de la imagen */}
          {selected.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="cursor-pointer absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-cyan-500 transition"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextImage}
                className="cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-cyan-500 transition"
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default Timeline;
