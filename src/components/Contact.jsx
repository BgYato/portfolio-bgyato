import {
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

function Contact() {
  return (
    <section
      id="contact"
      className="h-screen flex flex-col items-center justify-center px-8"
    >
      <div className="text-center mb-12 lg:mb-20">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
          Mi <span className="text-cyan-500">Contacto</span>
        </h2>
        <div className="h-1 w-16 bg-cyan-500/20 mx-auto mt-4 rounded-full" />
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-center max-w-2xl mb-12 transition-colors duration-300">
        ¿Quieres ponerte en contacto conmigo? Conéctate directamente a través de
        mis redes sociales:
      </p>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl justify-center items-center">
        <a
          href="https://www.linkedin.com/in/andres-felipe-yate-munoz-a177252a9/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 px-6 py-3 
                     w-full md:w-auto bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-transparent
                     hover:bg-cyan-500 hover:text-white dark:hover:text-black hover:border-cyan-500 transition-colors duration-300 group"
        >
          <FaLinkedin className="text-2xl text-cyan-600 dark:text-cyan-400 group-hover:text-white dark:group-hover:text-black transition-colors" />
          <span className="font-medium text-slate-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-black transition-colors">LinkedIn</span>
        </a>

        <a
          href="https://github.com/BgYato"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 px-6 py-3 
                     w-full md:w-auto bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-transparent
                     hover:bg-slate-800 dark:hover:bg-cyan-500 hover:text-white dark:hover:text-black hover:border-slate-800 dark:hover:border-cyan-500 transition-colors duration-300 group"
        >
          <FaGithub className="text-2xl text-slate-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-black transition-colors" />
          <span className="font-medium text-slate-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-black transition-colors">GitHub</span>
        </a>

        <a
          href="mailto:andresfyatem@gmail.com"
          className="flex items-center justify-center space-x-3 px-6 py-3 
                     w-full md:w-auto bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-transparent
                     hover:bg-red-500 hover:text-white dark:hover:text-black hover:border-red-500 transition-colors duration-300 group"
        >
          <FaEnvelope className="text-2xl text-red-500 dark:text-red-400 group-hover:text-white dark:group-hover:text-black transition-colors" />
          <span className="font-medium text-slate-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-black transition-colors">Gmail</span>
        </a>

        <a
          href="https://www.youtube.com/@BgYato05"
          target="_blank"
          className="flex items-center justify-center space-x-3 px-6 py-3 
                     w-full md:w-auto bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-transparent
                     hover:bg-red-600 dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-red-600 dark:hover:border-white transition-colors duration-300 group"
        >
          <FaYoutube className="text-2xl text-red-500 dark:text-red-400 group-hover:text-white dark:group-hover:text-black transition-colors" />
          <span className="font-medium text-slate-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-black transition-colors">Youtube</span>
        </a>

        <a
          href="https://wa.me/573222379887"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 px-6 py-3 
                     w-full md:w-auto bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-transparent
                     hover:bg-green-500 hover:text-white dark:hover:text-black hover:border-green-500 transition-colors duration-300 group"
        >
          <FaWhatsapp className="text-2xl text-green-600 dark:text-green-400 group-hover:text-white dark:group-hover:text-black transition-colors" />
          <span className="font-medium text-slate-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-black transition-colors">WhatsApp</span>
        </a>
      </div>
    </section>
  );
}

export default Contact;
