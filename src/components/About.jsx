function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center px-8 text-center"
    >
      {" "}
      <h2 className="text-3xl font-bold mb-6 text-cyan-400">Sobre mí</h2>{" "}
      <p className="max-w-2xl text-lg text-gray-300 leading-relaxed">
        {" "}
        Soy un apasionado por la tecnología y el desarrollo de software. Me
        gusta crear soluciones minimalistas y eficientes, aprender nuevas
        herramientas y compartir conocimiento. 🚀{" "}
      </p>{" "}
    </section>
  );
}
export default About;
