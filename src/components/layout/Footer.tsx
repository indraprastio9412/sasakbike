import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Bike } from "lucide-react";
import { STORE_MAPS_URL } from "@/lib/store-location";
import logo from "@/assets/logo.webp";

const Footer = () => (
  <footer className="mt-24 border-t border-border bg-card/40">
    <div className="container py-14 grid gap-10 md:grid-cols-4">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Sasak Bike" className="h-12 w-12 rounded-full" />
          <div>
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground">TOKO SEPEDA</p>
            <p className="font-display font-black text-gradient">SASAK BIKE</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Mendukung gaya hidup sehat masyarakat Pulau Lombok melalui sepeda berkualitas dengan layanan antar sepulau Lombok.
        </p>
      </div>

      <div>
        <h4 className="font-display font-bold mb-4 text-sm tracking-widest">JELAJAHI</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/" className="hover:text-primary transition-smooth">Beranda</Link></li>
          <li><Link to="/produk" className="hover:text-primary transition-smooth">Produk</Link></li>
          <li><Link to="/tentang" className="hover:text-primary transition-smooth">Tentang Kami</Link></li>
          <li><Link to="/kontak" className="hover:text-primary transition-smooth">Kontak</Link></li>
          <li><Link to="/lokasi" className="hover:text-primary transition-smooth">Lokasi</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display font-bold mb-4 text-sm tracking-widest">INFORMASI</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/cara-pemesanan" className="hover:text-primary transition-smooth">Cara Pemesanan & Pembayaran</Link></li>
          <li><Link to="/syarat-ketentuan" className="hover:text-primary transition-smooth">Syarat & Ketentuan</Link></li>
          <li><Link to="/kebijakan-privasi" className="hover:text-primary transition-smooth">Kebijakan Privasi & Keamanan</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display font-bold mb-4 text-sm tracking-widest">KONTAK</h4>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> <a href={STORE_MAPS_URL} target="_blank" rel="noreferrer" className="hover:text-primary transition-smooth">Lihat di Google Maps</a></li>
          <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +62 831-1228-2090</li>
          <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> sasakbike9412@gmail.com</li>
          <li className="flex items-center gap-2"><Bike className="h-4 w-4 text-primary" /> COD Sepulau Lombok</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="container py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sasak Bike — Toko Sepeda Lombok. Semua hak dilindungi.
      </div>
    </div>
  </footer>
);

export default Footer;
