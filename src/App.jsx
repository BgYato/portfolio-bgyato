import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import ScrollButtons from "./components/ScrollButtons";
import { useState, lazy, Suspense, useEffect } from "react";

const Projects = lazy(() => import("./components/Projects"));
const Timeline = lazy(() => import("./components/Timeline"));
const CV = lazy(() => import("./components/CV"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const [isClickable, setIsClickable] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check initial preference
    if (localStorage.theme === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark'); // Default to dark for current users
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-800 dark:text-white min-h-screen">
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} /> 
      <Hero /> 
      <About /> 
      <Skills />
      
      <Suspense fallback={<div className="h-40 flex items-center justify-center">Cargando...</div>}>
        <Projects />
        <Timeline isClickable={isClickable} setIsClickable={setIsClickable} />
        <CV />
        <Contact />
        <Footer />
      </Suspense>

      <ScrollButtons isClickable={isClickable} />
    </div>
  );
}
export default App;
