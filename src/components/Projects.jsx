import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { projects } from "../utils/projectsData";

function Projects() {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    const { current } = carouselRef;
    if (current) {
      const scrollAmount = 400;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col items-center justify-center px-8 w-full"
    >
      <h2 className="text-3xl font-bold mb-10 text-cyan-400">Proyectos</h2>

      <div className="relative w-full max-w-6xl">
        {/* Scroll contenedor */}
        <div
          ref={carouselRef}
          className="flex space-x-6 overflow-x-auto scroll-smooth no-scrollbar px-2 select-none py-12"
        >
          {projects.map((project, i) => (
            <div
              key={i}
              className="min-w-[300px] md:min-w-[380px] bg-gray-800 rounded-lg 
                         shadow-lg hover:shadow-cyan-400/30 
                         hover:scale-105 hover:-translate-y-2
                         transition-transform duration-300 
                         flex flex-col min-h-full select-none"
            >
              {/* Imagen */}
              <div className="w-full h-48 overflow-hidden rounded-t-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Contenido */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white select-none">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 select-none">
                    {project.description}
                  </p>
                </div>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, j) => (
                    <span
                      key={j}
                      className="px-2 py-1 text-xs bg-black/40 text-cyan-400 rounded select-none"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  {project.github && ( <a
                    href={project.github}
                    className="px-4 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-400 transition select-none"
                    target="_blank"
                  >
                    GitHub
                  </a> )}   
                  {project.demo && ( <a
                    href={project.demo}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition select-none"
                    target="_blank"
                  >
                    Demo
                  </a> )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 -translate-y-1/2 left-[-60px] 
                     bg-gray-900 p-3 rounded-full text-white 
                     hover:bg-cyan-500 transition hidden md:block cursor-pointer"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 -translate-y-1/2 right-[-60px] 
                     bg-gray-900 p-3 rounded-full text-white 
                     hover:bg-cyan-500 transition hidden md:block cursor-pointer"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

export default Projects;
