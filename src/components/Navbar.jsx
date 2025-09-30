function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-center py-4 bg-black/20 backdrop-blur-md z-50">
      {" "}
      <ul className="flex space-x-8 text-lg font-medium">
        {" "}
        <li>
          <a href="#home" className="hover:text-cyan-400">
            Inicio
          </a>
        </li>{" "}
        <li>
          <a href="#about" className="hover:text-cyan-400">
            Sobre mí
          </a>
        </li>{" "}
        <li>
          <a href="#skills" className="hover:text-cyan-400">
            Skills
          </a>
        </li>{" "}
        <li>
          <a href="#projects" className="hover:text-cyan-400">
            Proyectos
          </a>
        </li>{" "}
        <li>
          <a href="#timeline" className="hover:text-cyan-400">
            Historia
          </a>
        </li>{" "}
        <li>
          <a href="#cv" className="hover:text-cyan-400">
            CV
          </a>
        </li>{" "}
        <li>
          <a href="#contact" className="hover:text-cyan-400">
            Contacto
          </a>
        </li>{" "}
      </ul>{" "}
    </nav>
  );
}
export default Navbar;
