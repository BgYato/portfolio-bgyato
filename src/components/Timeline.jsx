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
      className="h-screen flex flex-col items-center justify-center px-4 md:px-8 relative overflow-hidden py-8 md:py-20"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="text-center mb-12 lg:mb-20">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
          Mi <span className="text-cyan-500">Trayectoria</span>
        </h2>
        <div className="h-1 w-16 bg-cyan-500/20 mx-auto mt-4 rounded-full" />
      </div>

      {/* Línea del tiempo */}
      <div className="relative w-full max-w-5xl mb-12">
        {/* Base Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800/50 -translate-y-1/2 rounded-full" />
        
        {/* Progress Line */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 -translate-y-1/2 transition-all duration-700 ease-out rounded-full shadow-[0_0_10px_rgba(6,182,212,0.3)]"
          style={{ 
            width: `${(events.indexOf(selected) / (events.length - 1)) * 100}%` 
          }}
        />

        <div className="flex justify-between w-full relative z-10">
          {events.map((e, i) => {
            const isActive = selected?.year === e.year;
            return (
              <button
                key={i}
                onClick={() => handleSelect(e)}
                className="group relative flex flex-col items-center cursor-pointer"
              >
                {/* Outer Ring */}
                <div
                  className={`w-4 h-4 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-500/20 scale-125"
                      : "bg-transparent group-hover:bg-slate-800/50"
                  }`}
                >
                  {/* Inner Dot */}
                  <div
                    className={`w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "bg-white border-cyan-500 dark:border-cyan-400 scale-110 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                        : "bg-slate-300 dark:bg-slate-700 border-slate-400 dark:border-slate-600 group-hover:border-cyan-500/50 group-hover:scale-110"
                    }`}
                  />
                </div>
                <span
                  className={`mt-2 md:mt-4 text-[9px] md:text-xs font-medium tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-cyan-600 dark:text-cyan-400"
                      : "text-slate-500 group-hover:text-slate-800 dark:text-slate-500 dark:group-hover:text-slate-300"
                  }`}
                >
                  {e.year}
                </span>
                
                {/* Year Badge on Hover */}
                {!isActive && (
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                     <span className="text-[10px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-1 px-2 rounded border border-slate-200 dark:border-slate-700 shadow-md">
                        {e.year}
                     </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel de Contenido */}
      <div
        key={selected?.year || "empty"}
        className="w-full max-w-5xl animate-fadeIn"
      >
        {selected ? (
          <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl p-5 md:p-10 shadow-2xl relative overflow-hidden group transition-colors duration-300">
            {/* Subtle Gradient Accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500 opacity-50" />
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
              {/* Carrusel de Imágenes - Oculto en móvil */}
              {selected.images && selected.images.length > 0 && (
                <div className="hidden md:block relative group/image">
                  <div className="aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/30">
                    {selected.images[imageIndex] ? (
                      <img
                        src={selected.images[imageIndex]}
                        alt={selected.year}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105 cursor-zoom-in"
                        onClick={openLightbox}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <span className="text-slate-500 italic text-sm">
                          Sin imagen disponible
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Image Navigation Dots */}
                  {selected.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                       {selected.images.map((_, idx) => (
                         <div 
                           key={idx}
                           className={`h-1.5 rounded-full transition-all duration-300 ${
                             idx === imageIndex ? "w-4 bg-cyan-400" : "w-1.5 bg-slate-600"
                           }`}
                         />
                       ))}
                    </div>
                  )}

                  {/* Nav Buttons */}
                  {selected.images.length > 1 && (
                    <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover/image:opacity-100 transition-opacity">
                      <button
                        onClick={prevImage}
                        className="bg-slate-900/60 backdrop-blur-md p-2 rounded-full text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-500/50 transition cursor-pointer"
                      >
                        <FaChevronLeft size={14} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="bg-slate-900/60 backdrop-blur-md p-2 rounded-full text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-500/50 transition cursor-pointer"
                      >
                        <FaChevronRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Texto y Detalles */}
              <div className="flex flex-col">
                <div className="flex items-center space-x-3 mb-3 md:mb-4">
                  <span className="text-[10px] md:text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase px-2 py-0.5 md:px-3 md:py-1 bg-cyan-100 dark:bg-cyan-950/30 border border-cyan-300 dark:border-cyan-500/20 rounded-full">
                    Evento
                  </span>
                  <h3 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white transition-colors duration-300">
                    {selected.year}
                  </h3>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-lg leading-relaxed mb-4 md:mb-8 transition-colors duration-300">
                  {selected.description}
                </p>

                {selected.highlights && (
                  <div className="space-y-2 md:space-y-4">
                    <h4 className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 md:mb-4">Hitos Clave</h4>
                    <ul className="grid gap-2 md:gap-3">
                      {selected.highlights.map((h, idx) => (
                        <li
                          key={idx}
                          className="flex items-start group/li"
                        >
                          <div className="mt-1.5 mr-2 md:mr-3 w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-cyan-500 shrink-0 group-hover/li:scale-125 transition-transform" />
                          <span className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-tight md:leading-snug group-hover/li:text-slate-800 dark:group-hover/li:text-slate-200 transition-colors">
                            {h}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-100 dark:bg-slate-900/20 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-20 text-center transition-colors duration-300">
            <p className="text-slate-600 dark:text-slate-500 italic">
              Explora mi viaje académico y profesional seleccionando un hito en la línea.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox / Preview */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/95 flex items-center justify-center z-[100] animate-fadeIn backdrop-blur-sm">
          <button
            onClick={closeLightbox}
            className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors cursor-pointer p-2 hover:bg-slate-800 rounded-full"
          >
            <FaTimes size={32} />
          </button>
          
          <div className="relative max-w-7xl max-h-[85vh] p-4 flex flex-col items-center">
             <img
              src={selected.images[imageIndex]}
              alt={selected.year}
              className="max-h-full max-w-full object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800"
            />
            
            <div className="mt-6 text-center">
               <p className="text-slate-400 text-sm font-medium">{selected.year} — Imagen {imageIndex + 1} de {selected.images.length}</p>
            </div>
          </div>

          {selected.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="cursor-pointer absolute top-1/2 left-8 -translate-y-1/2 bg-slate-900/80 backdrop-blur-md p-4 rounded-full text-white border border-slate-700 hover:border-cyan-500 transition shadow-xl"
              >
                <FaChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="cursor-pointer absolute top-1/2 right-8 -translate-y-1/2 bg-slate-900/80 backdrop-blur-md p-4 rounded-full text-white border border-slate-700 hover:border-cyan-500 transition shadow-xl"
              >
                <FaChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default Timeline;
