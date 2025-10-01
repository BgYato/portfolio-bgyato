import { FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from "react-icons/fa";

function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <h2 className="text-3xl font-bold mb-10 text-cyan-400">Contacto</h2>

      <p className="text-gray-300 text-center max-w-2xl mb-10">
        ¿Quieres ponerte en contacto conmigo? Conéctate directamente a través de
        mis redes sociales:
      </p>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl justify-center items-center">
        <a
          href="https://www.linkedin.com/in/andres-felipe-yate-munoz-a177252a9/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 px-6 py-3 
                     w-full md:w-auto bg-gray-800 rounded-full 
                     hover:bg-cyan-500 hover:text-black transition"
        >
          <FaLinkedin className="text-2xl text-cyan-400" />
          <span className="font-medium">LinkedIn</span>
        </a>

        <a
          href="https://github.com/BgYato"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 px-6 py-3 
                     w-full md:w-auto bg-gray-800 rounded-full 
                     hover:bg-cyan-500 hover:text-black transition"
        >
          <FaGithub className="text-2xl text-gray-300" />
          <span className="font-medium">GitHub</span>
        </a>

        <a
          href="https://wa.me/573222379887"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 px-6 py-3 
                     w-full md:w-auto bg-gray-800 rounded-full 
                     hover:bg-green-500 hover:text-black transition"
        >
          <FaWhatsapp className="text-2xl text-green-400" />
          <span className="font-medium">WhatsApp</span>
        </a>

        <a
          href="mailto:andresfyatem@gmail.com"
          className="flex items-center justify-center space-x-3 px-6 py-3 
                     w-full md:w-auto bg-gray-800 rounded-full 
                     hover:bg-red-500 hover:text-black transition"
        >
          <FaEnvelope className="text-2xl text-red-400" />
          <span className="font-medium">Gmail</span>
        </a>
      </div>
    </section>
  );
}

export default Contact;
