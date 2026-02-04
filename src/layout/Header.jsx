import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { href: "/", label: "ראשי" },
  { href: "/courses", label: "קורסים" },
  { href: "/instructors", label: "מדריכים" },
  { href: "/schools", label: "בתי ספר" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        {/* Desktop Actions */}
        <div className="actions-desktop">
          <Link to="/auth" className="btn btn-ghost">
            התחברות
          </Link>
          <Link to="/auth?mode=signup" className="btn btn-water">
            הרשמה
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="nav-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={
                location.pathname === link.href ? "nav-link active" : "nav-link"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <Link to="/" className="logo">
          {/* <div className="logo-icon">🌊</div> */}
          <span className="logo-text">SWIMMY </span>
        </Link>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="nav-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={
                location.pathname === link.href
                  ? "nav-link-mobile active"
                  : "nav-link-mobile"
              }
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mobile-actions">
            <Link
              to="/auth"
              className="btn btn-outline"
              onClick={() => setIsOpen(false)}
            >
              התחברות
            </Link>
            <Link
              to="/auth?mode=signup"
              className="btn btn-water"
              onClick={() => setIsOpen(false)}
            >
              הרשמה
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
