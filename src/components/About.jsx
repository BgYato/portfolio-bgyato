import { FaReact, FaJava, FaNodeJs, FaPython } from "react-icons/fa";
import { SiSpringboot, SiMysql } from "react-icons/si";

function About() {
  return (
    <section id="about" className="relative transition-colors duration-300 h-screen flex flex-col items-center justify-center p-8 md:p-16 overflow-hidden">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
          Sobre <span className="text-cyan-500">mí</span>
        </h2>
        <div className="h-1 w-16 bg-cyan-500/20 mx-auto mt-4 rounded-full" />
      </div>
      {/* Íconos flotantes */}
      <div className="floating-icons">
        <FaReact className="icon react text-cyan-600 dark:text-cyan-400" />
        <FaJava className="icon java text-cyan-600 dark:text-cyan-400" />
        <FaNodeJs className="icon node text-cyan-600 dark:text-cyan-400" />
        <FaPython className="icon python text-cyan-600 dark:text-cyan-400" />
        <SiSpringboot className="icon spring text-cyan-600 dark:text-cyan-400" />
        <SiMysql className="icon mysql text-cyan-600 dark:text-cyan-400" />
      </div>

      {/* Contenido */}
      <div className="z-10 max-w-[800px] bg-white/70 dark:bg-slate-800/60 border border-cyan-500/20 backdrop-blur-md rounded-2xl p-8 md:p-10 text-center text-slate-700 dark:text-gray-300 shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-colors duration-300">
        <p className="text-lg leading-relaxed mb-6">
          Soy un desarrollador apasionado por crear software eficiente, modular
          y con propósito. Disfruto trabajar con entornos donde la lógica se
          mezcla con la creatividad, y cada línea de código tiene intención. 🚀
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Trabajo principalmente con{" "}
          <span className="text-cyan-600 dark:text-cyan-500 font-bold">Java (Spring Boot)</span>,{" "}
          <span className="text-cyan-600 dark:text-cyan-500 font-bold">React</span> y{" "}
          <span className="text-cyan-600 dark:text-cyan-500 font-bold">Node.js</span>, buscando siempre la
          simplicidad y el impacto real en cada proyecto.
        </p>

        <blockquote className="hidden md:block mt-8 italic text-cyan-800 dark:text-blue-300 border-l-4 border-cyan-400 pl-4 text-left">
          “Programs must be written for people to read, and only incidentally
          for machines to execute.”
          <a href="https://es.wikipedia.org/wiki/Hal_Abelson" target="_blank" className="block mt-2 text-cyan-600 dark:text-sky-400 text-sm font-medium hover:underline"><span>– Harold Abelson</span></a>
        </blockquote>
      </div>
    </section>
  );
}

export default About;
