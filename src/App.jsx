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
function App() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {" "}
      <Navbar /> <Hero /> <About /> <Skills /> <Projects /> <Timeline /> <CV />{" "}
      <ScrollButtons />
      <Contact /> <Footer />{" "}
    </div>
  );
}
export default App;
