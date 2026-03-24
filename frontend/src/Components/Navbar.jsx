import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/akhada", label: "Akhada" },
  { to: "/subscription", label: "Subscription" },
  { to: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("mn_token");

  const brand = useMemo(() => "MARUTI NANDAN", []);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 90 && y > lastY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("mn_token");
    localStorage.removeItem("mn_user");
    navigate("/login");
  };

  const active = "nav-link is-active";
  const base = "nav-link";

  return (
    <header className={`main-nav ${hidden ? "nav-hidden" : ""}`}>
      <nav className="container nav-row">
        <Link to="/" className="brand-mark">
          <span className="brand-om">ॐ</span> {brand}
        </Link>

        <button className="menu-btn" onClick={() => setOpen((v) => !v)} aria-label="menu">
          <span />
          <span />
          <span />
        </button>

        <ul className="desktop-links">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => (isActive ? active : base)}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-cta-wrap">
          {token ? (
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Join Akhada
            </Link>
          )}
        </div>
      </nav>

      {open && (
        <ul className="mobile-links">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink
                onClick={() => setOpen(false)}
                to={item.to}
                className={({ isActive }) => (isActive ? "mobile-link active-mobile" : "mobile-link")}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            {token ? (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="mobile-link"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="mobile-link">
                Join Akhada
              </Link>
            )}
          </li>
        </ul>
      )}
    </header>
  );
}
