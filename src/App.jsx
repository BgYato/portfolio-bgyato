import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import ScrollButtons from "./components/ScrollButtons";
import { useState, lazy, Suspense } from "react";

const Projects = lazy(() => import("./components/Projects"));
const Timeline = lazy(() => import("./components/Timeline"));
const CV = lazy(() => import("./components/CV"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const [isClickable, setIsClickable] = useState(true);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navbar /> 
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
