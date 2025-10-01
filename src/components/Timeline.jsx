import { useState, useEffect } from "react";
import { events } from "../utils/eventsData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Timeline() {
  const [selected, setSelected] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  // efecto de slider automático
  useEffect(() => {
    if (selected?.images?.length > 1) {
      const interval = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % selected.images.length);
      }, 4000); // cada 4s cambia
      return () => clearInterval(interval);
    }
  }, [selected]);

  const prevImage = () => {
    if (selected?.images?.length > 1) {
      setImageIndex((prev) =>
        prev === 0 ? selected.images.length - 1 : prev - 1
      );
    }
  };

  const nextImage = () => {
    if (selected?.images?.length > 1) {
      setImageIndex((prev) => (prev + 1) % selected.images.length);
    }
  };

  return (
    <section
      id="timeline"
      className="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <h2 className="text-3xl font-bold mb-10 text-cyan-400">Biografía</h2>

      {/* Línea */}
      <div className="relative w-full max-w-5xl h-20 flex items-center">
        <div className="absolute top-1/2 left-0 right-0 border-t-2 border-gray-600"></div>
        <div className="flex justify-between w-full relative">
          {events.map((e, i) => (
            <button
              key={i}
              onClick={() => {
                setSelected(e);
                setImageIndex(0); // reset slider
              }}
              className="relative flex flex-col items-center cursor-pointer transition"
            >
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  selected?.year === e.year
                    ? "bg-cyan-500 border-cyan-500 scale-110"
                    : "bg-gray-800 border-gray-500 hover:border-cyan-400"
                } transition-transform`}
              ></div>
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
            {/* Imagen / Slider */}
            {selected.images && selected.images.length > 0 && (
              <div className="relative flex justify-center">
                <img
                  src={selected.images[imageIndex]}
                  alt={selected.year}
                  className="rounded-lg shadow-md max-h-72 object-contain w-full"
                />
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
                <ul className="text-gray-400 mb-6 space-y-2">
                  {selected.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="text-cyan-400">✔</span>
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
    </section>
  );
}

export default Timeline;
