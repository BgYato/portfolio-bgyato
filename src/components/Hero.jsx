import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

function Hero() {
  const [lastCommit, setLastCommit] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.github.com/repos/BgYato/portfolio-bgyato/commits?per_page=5"
    )
      .then((res) => res.json())
      .then((data) => {
        const realCommit = data.find(
          (c) => !c.commit.message.toLowerCase().includes("merge")
        );

        if (realCommit) {
          setLastCommit({
            message: realCommit.commit.message,
            date: realCommit.commit.author.date,
            url: realCommit.html_url,
          });
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-8 pt-20"
    >
      {/* Imagen izquierda */}
      <div className="flex-1 flex justify-center mt-8 mb-8 md:mb-0 md:mt-0">
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full rounded-full bg-gray-700"></div>
          <img
            src="https://imgur.com/tyGkvm3.png"
            alt="Foto de perfil"
            className="absolute inset-0 w-full h-full object-cover rounded-full 
                 translate-y-[-15%] shadow-xl select-none"
          />
        </div>
      </div>

      {/* Texto derecha */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-light mb-2">Soy</h2>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-cyan-400">
          <Typewriter
            words={[
              "Andres Yate",
              "BgYato",
              "Desarrollador",
              "Programador",
              "Peaceful",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>

        {/* Subtítulo */}
        <p className="text-gray-300 text-lg md:text-xl mb-8 animate-fadeIn">
          y este es mi <span className="text-cyan-400">portafolio</span>.<br />
          ¿Quieres conocerme? <span className="italic">
            Desliza para más
          </span>{" "}
          👇
        </p>

        <div className="flex justify-center md:justify-start space-x-4">
          <a
            href="#contact"
            className="px-6 py-3 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-black transition"
          >
            Contactar
          </a>
          <a
            href="#about"
            className="px-6 py-3 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-600 transition"
          >
            Continuar
          </a>
        </div>

        {/* Última actualización */}
        {lastCommit && (
          <div className="text-sm text-gray-400 mt-4">
            <p>
              Última actualización:{" "}
              <span className="text-cyan-400">
                {new Date(lastCommit.date).toLocaleDateString()}
              </span>
            </p>

            {/* Solo desktop */}
            <p className="hidden md:block">
              Razón: <span className="italic">“{lastCommit.message}”</span>
              {" · "}
              <a
                href={lastCommit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-500 hover:text-cyan-300 underline underline-offset-2"
              >
                ver commit
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
