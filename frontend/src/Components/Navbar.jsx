import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/goals", label: "Goals" },
  { to: "/services", label: "Services" },
  { to: "/schedule", label: "Schedule" },
  { to: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const active = "text-yellow-300";
  const base = "hover:text-yellow-300 transition";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 md:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-extrabold tracking-wider text-2xl text-yellow-400">
          BORCELLE
        </Link>

        <button className="md:hidden" onClick={() => setOpen(v => !v)} aria-label="menu">
          <svg width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
        </button>

        <ul className="hidden md:flex items-center gap-10 text-sm">
          {nav.map(i => (
            <li key={i.to}>
              <NavLink to={i.to} className={({isActive}) => (isActive? active: base)}>{i.label}</NavLink>
            </li>
          ))}
        </ul>

        <Link to="/services" className="hidden md:inline-block rounded-full bg-yellow-400 text-black px-4 py-2 font-semibold">
          Free Trial
        </Link>
      </nav>

      {open && (
        <ul className="md:hidden px-4 pb-4 space-y-2 text-sm">
          {nav.map(i => (
            <li key={i.to}>
              <NavLink onClick={()=>setOpen(false)} to={i.to} className={({isActive}) => `block px-2 py-2 rounded ${isActive? "bg-white/10 text-yellow-300":"hover:bg-white/10"}`}>{i.label}</NavLink>
            </li>
          ))}
          <li>
            <Link to="/services" onClick={()=>setOpen(false)} className="block text-center rounded bg-yellow-400 text-black px-4 py-2 font-semibold">Free Trial</Link>
          </li>
        </ul>
      )}
    </header>
  );
}
