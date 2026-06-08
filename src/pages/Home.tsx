import { Link } from "react-router-dom";
import { ArrowRight, Heart, Leaf, Zap, MapPin, Truck, Bike, Users, Mountain, ShieldCheck } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import ProductCard from "@/components/ProductCard";
import ProductPlaceholder from "@/components/ProductPlaceholder";
import SEO from "@/components/SEO";
import { products, EMPTY_PRODUCT_SLOTS } from "@/data/products";
import heroVideo from "@/assets/hero-bike.mp4";

const Home = () => {
  return (
    <PageLayout>
      <SEO
        title="Sasak Bike — Sepeda Mazara R633 Rp 1.500.000, COD Lombok"
        description="Toko sepeda terpercaya di Pulau Lombok. Mazara R633 Rp 1.500.000 — COD bayar di tempat, antar sepulau Lombok."
        path="/"
      />
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6">
          <div className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 animate-fade-up order-2 lg:order-1">
            <h1 className="font-display text-2xl sm:text-3xl md:text-[2rem] lg:text-4xl xl:text-[2.75rem] font-black leading-[1.12]">
              SASAK BIKE — SEPEDA BERKUALITAS<br />
              <span className="text-gradient">HARGA MERAKYAT.</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Wujudkan gaya hidup sehat Anda bersama Sasak Bike. Dapatkan sepeda berkualitas dengan harga terjangkau. Pesan sekarang, bayar nanti saat barang sudah sampai di rumah Anda <span className="font-bold">(COD)</span>. Praktis dan terpercaya!
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link to="/produk" className="inline-flex items-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-gradient-primary text-primary-foreground font-bold text-sm sm:text-base transition-smooth hover:shadow-glow hover:scale-105">
                Lihat Koleksi <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
              <Link to="/tentang" className="inline-flex items-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl glass font-bold text-sm sm:text-base transition-smooth hover:border-primary">
                Tentang Kami
              </Link>
            </div>
          </div>

          <div className="relative w-full order-1 lg:order-2 animate-float">
            <div className="absolute inset-0 -z-10 blur-3xl opacity-45 bg-gradient-primary rounded-3xl scale-[0.98]" />
            <div className="relative w-full aspect-video overflow-hidden rounded-2xl sm:rounded-3xl border border-border/70 bg-black/40 shadow-glow">
              <video
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
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
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 max-w-7xl mx-auto">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
          {Array.from({ length: EMPTY_PRODUCT_SLOTS }).map((_, i) => (
            <ProductPlaceholder key={`placeholder-${i}`} index={products.length + i} />
          ))}
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
