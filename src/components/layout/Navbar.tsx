import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import logo from "@/assets/logo.webp";
import { cn } from "@/lib/utils";
import ProductSearchBar from "@/components/ProductSearchBar";
import { useCart } from "@/context/CartContext";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/produk", label: "Produk" },
  { to: "/tentang", label: "Tentang Kami" },
  { to: "/kontak", label: "Kontak" },
  { to: "/lokasi", label: "Lokasi" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const goToSearch = () => {
    const q = searchQuery.trim();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    navigate(`/produk${params.toString() ? `?${params.toString()}` : ""}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container flex h-20 items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img src={logo} alt="Sasak Bike Logo" className="h-12 w-12 rounded-full object-cover transition-smooth group-hover:scale-110" />
          <div className="leading-tight hidden sm:block">
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground">TOKO SEPEDA</p>
            <p className="font-display text-lg font-black text-gradient">SASAK BIKE</p>
          </div>
        </Link>

        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <ProductSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={goToSearch}
            size="compact"
          />
        </div>

        <nav className="hidden md:flex items-center gap-6 xl:gap-8">
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

          <Link
            to="/keranjang"
            className="relative p-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-primary/10 transition-smooth"
            aria-label={`Keranjang belanja${totalItems > 0 ? `, ${totalItems} item` : ""}`}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[1.125rem] h-[1.125rem] px-1 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold tabular-nums">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/keranjang"
            className="relative p-2 rounded-lg text-foreground hover:text-primary"
            aria-label={`Keranjang belanja${totalItems > 0 ? `, ${totalItems} item` : ""}`}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[1.125rem] h-[1.125rem] px-1 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold tabular-nums">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
          <button
            className="p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border animate-fade-in">
          <div className="container flex flex-col py-4 gap-3">
            <ProductSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={goToSearch}
              size="compact"
            />
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
