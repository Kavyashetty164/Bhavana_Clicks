import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Gallery from "./pages/Gallery/Gallery";
import Services from "./pages/Services/Services";
import "./styles/global.css";
import "./styles/animations.css";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ margin: 0, padding: 0, width: "100%", overflowX: "hidden" }}>
        <Navbar />
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/gallery"  element={<Gallery />} />
          <Route path="/services" element={<Services />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}