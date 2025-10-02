import { useState, useEffect } from "react";

function About() {
  const images = [
    { src: "https://imgur.com/G4BqFbP.png", alt: "Apenado" },
    { src: "https://imgur.com/I37LsiK.png", alt: "Modo gracioso" },
    { src: "https://imgur.com/8kRpJDa.png", alt: "Serio" },
  ];

  const [frontIndex, setFrontIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrontIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const positions = [
    { top: 0, left: 0, scale: 1, z: 20 }, // frente
    { top: 8, left: 12, scale: 0.95, z: 10 }, // medio
    { top: 16, left: 24, scale: 0.9, z: 0 }, // atrás
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-12"
    >
      <h2 className="text-3xl font-bold mb-10 text-cyan-400 text-center">
        Sobre mí
      </h2>

      {/* Contenedor principal: dos columnas */}
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl items-center">
        <div className="flex flex-col space-y-4 text-center md:text-left">
          <p className="text-gray-300 text-lg leading-relaxed">
            Soy un apasionado por la tecnología y el desarrollo de software. Me
            gusta crear soluciones minimalistas y eficientes, aprender nuevas
            herramientas y compartir conocimiento. 🚀
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Actualmente me enfoco en proyectos fullstack, diseño de interfaces
            limpias y escribir código mantenible. Siempre buscando crecer y
            aportar valor.
          </p>
        </div>

        {/* Columna derecha: collage tipo escalera */}
        <div className="hidden relative w-full h-64 md:h-80 ml-24 md:flex justify-center">
          {images.map((img, index) => {
            const offset = (index - frontIndex + images.length) % images.length;
            const pos = positions[offset];

            return (
              <img
                key={index}
                src={img.src}
                alt={img.alt}
                className="absolute rounded-xl ml-12 shadow-lg transition-all duration-500 ease-in-out w60 h-60 md:w-60 md:h-82 object-cover hover:scale-105 "
                style={{
                  top: "50%",
                  left: `${pos.left}px`,
                  zIndex: pos.z,
                  transform: `translateY(-50%) scale(${pos.scale})`,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default About;
