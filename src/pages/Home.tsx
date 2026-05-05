import { Link } from "react-router-dom";
import { ArrowRight, Heart, Leaf, Zap, MapPin, Truck, Bike, Users, Mountain, Sun, ShieldCheck } from "lucide-react";
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs tracking-widest">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              KHUSUS PULAU LOMBOK • COD TERSEDIA
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-black leading-[1.05]">
              Gowes Sehat,<br />
              <span className="text-gradient">Lombok Kuat.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Sasak Bike menghadirkan sepeda berkualitas untuk membangkitkan semangat olahraga masyarakat Lombok. Lebih sehat, lebih hijau, lebih bahagia.
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

      {/* FEATURES */}
      <section className="container py-16">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Heart, title: "Tubuh Lebih Bugar", desc: "Kayuh setiap hari, jaga jantung kuat dan stamina prima sepanjang hari." },
            { icon: Leaf, title: "Lombok Tetap Asri", desc: "Tanpa asap, tanpa polusi — sepeda menjaga udara pulau kita tetap segar." },
            { icon: Zap, title: "Lincah & Hemat", desc: "Tembus macet, hemat bensin, sampai tujuan lebih cepat dan lebih sehat." },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gradient-card border border-border transition-smooth hover:border-primary hover:-translate-y-1 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT US — moved to home */}
      <section className="container py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5 animate-fade-up">
            <p className="text-xs tracking-[0.4em] text-primary">TENTANG KAMI</p>
            <h2 className="font-display text-3xl md:text-5xl font-black leading-tight">
              <span className="text-gradient">Mengembalikan</span> Semangat Bersepeda Masyarakat Lombok
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Di tengah hiruk pikuk kendaraan bermotor, Sasak Bike hadir mengajak masyarakat Lombok kembali ke gaya hidup sehat. Dari Mataram hingga Sembalun, dari pesisir Senggigi sampai lereng Rinjani — sepeda adalah cara terbaik mengenal pulau kita.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Satu kayuhan kecil bisa mengubah hidup. Mari bersama membangun budaya bersepeda yang sehat, bersih, dan membanggakan untuk Lombok.
            </p>
            <Link to="/tentang" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
              Pelajari Cerita Kami <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Heart, label: "Sehat Setiap Hari", v: "100%" },
              { icon: Leaf, label: "Bebas Polusi", v: "0 Emisi" },
              { icon: Mountain, label: "Jangkauan Layanan", v: "Sepulau Lombok" },
              { icon: ShieldCheck, label: "Dukungan Pelanggan", v: "24 Jam" },
            ].map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gradient-card border border-border text-center animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <s.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="font-display text-xl md:text-2xl font-black text-gradient">{s.v}</p>
                <p className="text-[11px] text-muted-foreground tracking-widest mt-1 uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="container py-16">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] text-primary mb-3">MISI KAMI</p>
          <h2 className="font-display text-3xl md:text-5xl font-black"><span className="text-gradient">Tiga Janji</span> Sasak Bike</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Bike, t: "Sepeda Berkualitas", d: "Unit pilihan dengan harga adil — siap menemani petualangan setiap hari." },
            { icon: Users, t: "Komunitas Sehat", d: "Membangun budaya gowes yang ramai dan menyenangkan di seluruh Lombok." },
            { icon: Leaf, t: "Lombok Lestari", d: "Mendukung pulau bebas polusi lewat transportasi ramah lingkungan." },
          ].map((m, i) => (
            <div key={i} className="p-7 rounded-2xl bg-gradient-card border border-border transition-smooth hover:border-primary animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <m.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">{m.t}</h3>
              <p className="text-sm text-muted-foreground">{m.d}</p>
            </div>
          ))}
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
