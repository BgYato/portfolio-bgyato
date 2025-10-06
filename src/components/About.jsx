import { FaReact, FaJava, FaNodeJs, FaPython } from "react-icons/fa";
import { SiSpringboot, SiMysql } from "react-icons/si";

function About() {
  return (
    <section id="about" className="about-section">
      <h2 className="about-title">Sobre mí</h2>

      {/* Íconos flotantes */}
      <div className="floating-icons">
        <FaReact className="icon react" />
        <FaJava className="icon java" />
        <FaNodeJs className="icon node" />
        <FaPython className="icon python" />
        <SiSpringboot className="icon spring" />
        <SiMysql className="icon mysql" />
      </div>

      {/* Contenido */}
      <div className="about-content">
        <p>
          Soy un desarrollador apasionado por crear software eficiente, modular
          y con propósito. Disfruto trabajar con entornos donde la lógica se
          mezcla con la creatividad, y cada línea de código tiene intención. 🚀
        </p>
        <p>
          Trabajo principalmente con{" "}
          <span className="highlight">Java (Spring Boot)</span>,{" "}
          <span className="highlight">React</span> y{" "}
          <span className="highlight">Node.js</span>, buscando siempre la
          simplicidad y el impacto real en cada proyecto.
        </p>

        <blockquote className="hidden md:block about-quote">
          “Programs must be written for people to read, and only incidentally
          for machines to execute.”
          <a href="https://es.wikipedia.org/wiki/Hal_Abelson" target="_blank"><span>– Harold Abelson</span></a>
        </blockquote>
      </div>
    </section>
  );
}

export default About;
