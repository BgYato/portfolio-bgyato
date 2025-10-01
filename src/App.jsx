import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollButtons from "./components/ScrollButtons";
import CV from "./components/CV";
import { use, useState } from "react";
function App() {
  const [isClickable, setIsClickable] = useState(true);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navbar /> <Hero /> <About /> <Skills /> <Projects />
      <Timeline
        isClickable={isClickable}
        setIsClickable={setIsClickable}
      />
      <CV /> <ScrollButtons isClickable={isClickable} />
      <Contact /> <Footer />
    </div>
  );
}
export default App;
