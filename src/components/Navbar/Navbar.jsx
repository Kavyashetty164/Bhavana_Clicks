import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  if (location.pathname === "/about") {
    return null;
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown((current) => (current === name ? null : name));
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
    setMenuOpen(false);
  };

  const goTo = (path) => {
    navigate(path);
    closeDropdowns();
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">

        {/* LEFT SIDE */}
        <ul className="navbar__list navbar__list--left">
          <li
            className={`navbar__item navbar__item--dropdown ${activeDropdown === "portfolio" ? "navbar__item--open" : ""}`}
            onMouseEnter={() => setActiveDropdown("portfolio")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              className={`navbar__link navbar__link--button ${activeDropdown === "portfolio" ? "navbar__link--active" : ""}`}
              onClick={() => toggleDropdown("portfolio")}
            >
              PORTFOLIO
            </button>
            <ul className={`navbar__dropdown ${activeDropdown === "portfolio" ? "navbar__dropdown--open" : ""}`}>
              <li><Link to="/gallery?type=weddings" onClick={closeDropdowns}>Weddings</Link></li>
              <li><Link to="/gallery?type=couples" onClick={closeDropdowns}>Couples</Link></li>
            </ul>
          </li>
          <li
            className={`navbar__item navbar__item--dropdown ${activeDropdown === "info" ? "navbar__item--open" : ""}`}
            onMouseEnter={() => setActiveDropdown("info")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              className={`navbar__link navbar__link--button ${activeDropdown === "info" ? "navbar__link--active" : ""}`}
              onClick={() => toggleDropdown("info")}
            >
              INFO
            </button>
            <ul className={`navbar__dropdown ${activeDropdown === "info" ? "navbar__dropdown--open" : ""}`}>
              <li><Link to="/services" onClick={closeDropdowns}>Pricing</Link></li>
              <li><Link to="/services" onClick={closeDropdowns}>Elopement Guides</Link></li>
            </ul>
          </li>
        </ul>

        {/* CENTER LOGO */}
        <Link to="/" className="navbar__logo">
          Bhavana <em>Clicks</em>
        </Link>

        {/* RIGHT SIDE */}
        <ul className="navbar__list navbar__list--right">
          <li className="navbar__item">
            <Link to="/about" className="navbar__link navbar__link--button">ABOUT ME</Link>
          </li>
          <li className="navbar__item">
            <Link to="/contact" className="navbar__link navbar__link--button">CONTACT</Link>
          </li>
        </ul>

        {/* MOBILE BURGER */}
        <button
          className={`navbar__burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="navbar__mobile">
          <span onClick={() => goTo("/gallery?type=weddings")}>Weddings</span>
          <span onClick={() => goTo("/gallery?type=couples")}>Couples</span>
          <span onClick={() => goTo("/services")}>Pricing</span>
          <span onClick={() => goTo("/services")}>Elopement Guides</span>
          <span onClick={() => goTo("/about")}>About Me</span>
          <span onClick={() => goTo("/contact")}>Contact</span>
        </div>
      )}
    </nav>
  );
}