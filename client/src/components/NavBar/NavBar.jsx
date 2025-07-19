import { NavLink } from "react-router-dom";
import { useState } from "react";
import './navBar.css';

export default function NavBar({ className = "" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "[HOME]", end: true },
    { to: "/about", label: "[ABOUT]" },
    { to: "/projects", label: "[PROJECTS]" },
    { to: "/services", label: "[SERVICE]" },
    { to: "/contact", label: "[CONTACT]" }
  ];

  return (
    <>
      {/* Desktop NavBar */}
      <nav className={`nav-bar ${className}`} aria-label="Primary navigation">
        <ul>
          {links.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile MENU button */}
      <div className="nav-bar-mobile">
        <button className="menu-toggle" onClick={() => setIsMenuOpen(true)}>
          [MENU]
        </button>
      </div>

      {/* Slide-in Mobile Menu */}
      <div className={`slide-menu ${isMenuOpen ? "open" : ""}`}>
        <button className="close-button" onClick={() => setIsMenuOpen(false)}>
          [CLOSE]
        </button>
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </>
  );
}
