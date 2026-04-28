import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.webp";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/produk", label: "Produk" },
  { to: "/tentang", label: "Tentang Kami" },
  { to: "/kontak", label: "Kontak" },
  { to: "/lokasi", label: "Lokasi" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Sasak Bike Logo" className="h-12 w-12 rounded-full object-cover transition-smooth group-hover:scale-110" />
          <div className="leading-tight">
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground">TOKO SEPEDA</p>
            <p className="font-display text-lg font-black text-gradient">SASAK BIKE</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-smooth hover:text-primary relative py-1",
                  isActive ? "text-primary" : "text-foreground/80"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-primary rounded-full" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border animate-fade-in">
          <div className="container flex flex-col py-4 gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "py-2 px-3 rounded-md text-sm font-medium transition-smooth",
                    isActive ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-secondary"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
