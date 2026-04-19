import { FaEye } from "react-icons/fa";
import SiteViews from "react-siteviews";

function Footer() {
  let currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 text-center text-slate-500 dark:text-gray-500 text-sm border-t border-slate-200 dark:border-gray-800 transition-colors duration-300">
      © {currentYear} Andres Yate – Hecho con ❤️
      <div className="hidden md:inline-block mt-2 ml-1">
        {" - "}
        <a
          href="https://github.com/BgYato/portfolio-bgyato/commits/main"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-600 dark:text-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-300 underline underline-offset-2 transition-colors duration-300"
        >
          historial de versiones
        </a>
      </div>
    </footer>
  );
}
export default Footer;
