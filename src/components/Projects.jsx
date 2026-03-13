import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "../utils/projectsData";

function Projects() {
  const carouselRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const scroll = (direction) => {
    const { current } = carouselRef;
    if (current) {
      const scrollAmount = current.offsetWidth * 0.8;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const openDetails = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeDetails();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="projects"
      className="h-screen flex flex-col items-center justify-center px-6 md:px-8 bg-transparent overflow-hidden"
    >
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-100 tracking-tight">
          Mis <span className="text-cyan-500">Proyectos</span>
        </h2>
        <div className="h-1 w-16 bg-cyan-500/20 mx-auto mt-4 rounded-full" />
      </div>

      <p className="text-slate-400 text-center max-w-2xl mb-12 hidden md:block">
        Una selección de mis trabajos más recientes, enfocados en
        <span className="text-cyan-500"> escalabilidad</span> y
        <span className="text-cyan-500"> diseño intuitivo</span>.
      </p>

      <div className="relative w-full max-w-6xl">
        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex space-x-6 overflow-x-auto scroll-smooth no-scrollbar px-2 py-8 snap-x snap-mandatory select-none"
        >
          {projects.map((project, i) => (
            <div
              key={i}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] bg-gray-800/40 backdrop-blur-md border border-white/10 rounded-xl 
             shadow-lg hover:shadow-cyan-400/10 
             hover:scale-[1.02] transition-all duration-300 
             flex flex-col snap-center h-[460px]"
            >
              {/* Image Section */}
              <div className="w-full h-44 overflow-hidden rounded-t-xl group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Card Content - SIMPLIFIED */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-white line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  {/* Key Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((t, j) => (
                      <span
                        key={j}
                        className="px-2 py-0.5 text-[10px] bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/20"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[10px] text-gray-500">+{project.tech.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Actions Layout requested by user */}
                <div className="flex flex-col space-y-3 mt-auto">
                  <button
                    onClick={() => openDetails(project)}
                    className="w-full px-4 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition text-sm cursor-pointer"
                  >
                    Ver detalles
                  </button>
                  
                  <div className="flex space-x-2">
                    {project.github && (
                      <a
                        href={project.github}
                        className="flex-1 px-4 py-2 bg-gray-700/50 text-white font-semibold rounded-lg hover:bg-gray-600 transition text-center text-xs flex items-center justify-center gap-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub /> GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        className="flex-1 px-4 py-2 bg-gray-700/50 text-white font-semibold rounded-lg hover:bg-gray-600 transition text-center text-xs flex items-center justify-center gap-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt size={12}/> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 -translate-y-1/2 left-[-40px] xl:left-[-60px]
                     bg-gray-900 border border-white/10 p-4 rounded-full text-white 
                     hover:bg-cyan-500 hover:text-black transition hidden lg:block cursor-pointer"
          aria-label="Anterior"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 -translate-y-1/2 right-[-40px] xl:right-[-60px]
                     bg-gray-900 border border-white/10 p-4 rounded-full text-white 
                     hover:bg-cyan-500 hover:text-black transition hidden lg:block cursor-pointer"
          aria-label="Siguiente"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="flex lg:hidden justify-center mt-4">
        <span className="text-gray-500 text-2xl animate-pulse">⇆</span>
      </div>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={closeDetails}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeDetails}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-cyan-500 hover:text-black transition cursor-pointer"
            >
              <FaTimes size={20} />
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {selectedProject.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((t, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="prose prose-invert prose-sm max-w-none mb-8">
                <p className="text-gray-300 leading-relaxed text-base">
                  {selectedProject.description}
                </p>
              </div>

              <div className="mt-auto flex flex-col sm:flex-row gap-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    className="flex-1 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-cyan-400 transition-all text-center flex items-center justify-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={20} /> Ir a GitHub
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    className="flex-1 px-8 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition border border-white/10 text-center flex items-center justify-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt size={18} /> Ver Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
