import { NavLink } from "react-router-dom";
import './navBar.css'

/**
 * Appears inside Terminal (before or after LockBar depending on page)
 * Uses NavLink so a CSS class ".active" is applied on the current route
 */

export default function NavBar({ className = "" }) {
  const links = [
    { to: "/", label: "[HOME]", end: true  }, // `end` so only exact "/" matches
    { to: "/about",label: "[ABOUT]"},
    { to: "/projects", label: "[PROJECTS]"},
    { to: "/services", label: "[SERVICE]"},
    { to: "/contact",  label: "[CONTACT]"},
  ];

  return (
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
  );
}

