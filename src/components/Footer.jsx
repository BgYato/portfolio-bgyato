function Footer() {
  return (
    <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-800">
      © 2025 Andres Yate – Hecho con ❤️
      <div className="hidden md:inline-block mt-2">
        {" - "}
        <a
          href="https://github.com/BgYato/portfolio-bgyato/commits/main"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-500 hover:text-cyan-300 underline underline-offset-2"
        >
          historial de versiones
        </a>
      </div>
    </footer>
  );
}
export default Footer;
