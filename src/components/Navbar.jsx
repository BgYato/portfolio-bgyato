import { useState } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

function Navbar({ isDarkMode, toggleTheme }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#home", label: "Inicio" },
    { href: "#about", label: "Sobre mí" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Proyectos" },
    { href: "#timeline", label: "Historia" },
    { href: "#cv", label: "CV" },
    { href: "#contact", label: "Contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-black/30 backdrop-blur-md z-50 transition-colors duration-300 border-b border-gray-200 dark:border-transparent">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-4">
        <div className="text-cyan-600 dark:text-cyan-400 font-bold text-xl relative z-50">
          BgYato - Portafolio
        </div>

        {/* Enlaces de Navegación */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8 text-lg font-medium">
            {links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="text-slate-700 hover:text-cyan-600 dark:text-gray-200 dark:hover:text-cyan-400 transition"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          <button
            onClick={toggleTheme}
            className="cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <FaSun className="text-yellow-400 text-xl" /> : <FaMoon className="text-slate-600 text-xl" />}
          </button>
        </div>

        {/* Controles para Móvil */}
        <div className="md:hidden flex items-center space-x-4 relative z-50">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition text-xl"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-slate-600" />}
          </button>
          
          <button
            className="text-2xl text-slate-800 dark:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      {open && (
        <div className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center space-y-6 text-2xl transition-colors duration-300">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-slate-800 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition font-medium"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
