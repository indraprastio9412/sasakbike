import { Link } from "react-router-dom";
import { ArrowRight, Heart, Leaf, Zap, MapPin, Truck, Bike, Users, Mountain, ShieldCheck } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import logo from "@/assets/logo.webp";

const Home = () => {
  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center py-20 md:py-28">
          <div className="space-y-7 animate-fade-up">
            <h1 className="font-display text-5xl md:text-7xl font-black leading-[1.05]">
              SEPEDA BERKUALITAS<br />
              <span className="text-gradient">HARGA MERAKYAT.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Wujudkan gaya hidup sehat Anda bersama Sasak Bike. Dapatkan sepeda berkualitas dengan harga terjangkau <span className="font-bold text-primary">Rp 1.500.000</span>. Pesan sekarang, bayar nanti saat barang sudah sampai di rumah Anda <span className="font-bold">(COD)</span>. Praktis dan terpercaya!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/produk" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-bold transition-smooth hover:shadow-glow hover:scale-105">
                Lihat Koleksi <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/tentang" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl glass font-bold transition-smooth hover:border-primary">
                Tentang Kami
              </Link>
            </div>
          </div>

          <div className="relative animate-float">
            <div className="absolute inset-0 -z-10 blur-3xl opacity-60 bg-gradient-primary rounded-full" />
            <img src={logo} alt="Sasak Bike Hero" className="relative w-full max-w-md mx-auto rounded-full shadow-glow animate-pulse-glow" />
          </div>
        </div>
      </section>

      {/* PRODUCTS PREVIEW */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-xs tracking-[0.4em] text-primary mb-3">KOLEKSI EKSKLUSIF</p>
            <h2 className="font-display text-3xl md:text-5xl font-black"><span className="text-gradient">Pilih Sepeda</span> Idamanmu</h2>
          </div>
          <Link to="/produk" className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1">
            Lihat Semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="relative rounded-3xl overflow-hidden glass p-10 md:p-16 text-center glow-border">
          <div className="absolute inset-0 -z-10 opacity-50" style={{ background: "radial-gradient(circle at center, hsl(142 90% 40% / 0.3), transparent 70%)" }} />
          <Truck className="h-12 w-12 text-primary mx-auto mb-5" />
          <h2 className="font-display text-3xl md:text-5xl font-black mb-4">
            <span className="text-gradient">Antar Sepulau Lombok</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-7">
            Dari Mataram, Senggigi, Praya, sampai Sembalun — kami antar sepedamu langsung ke depan rumah dengan sistem COD.
          </p>
          <Link to="/lokasi" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-bold transition-smooth hover:shadow-glow hover:scale-105">
            <MapPin className="h-4 w-4" /> Lihat Area Layanan
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
