import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
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
    <nav className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-md z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo o Nombre */}
        <div className="text-cyan-400 font-bold text-xl">BgYato - Portafolio</div>

        {/* Links Desktop */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          {links.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                className="hover:text-cyan-400 transition"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón Hamburguesa */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menú Móvil */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-md absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center space-y-6 text-2xl">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-gray-200 hover:text-cyan-400 transition"
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
