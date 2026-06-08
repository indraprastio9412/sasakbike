import { Link } from "react-router-dom";
import { ArrowRight, Heart, Leaf, Zap, Bike, Users } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";

const About = () => (
  <PageLayout>
    <SEO
      title="Tentang Kami — Sasak Bike Lombok"
      description="Cerita & misi Sasak Bike: mengembalikan semangat bersepeda masyarakat Lombok lewat sepeda berkualitas dan terjangkau."
      path="/tentang"
    />
    <PageHeader eyebrow="TENTANG KAMI" title="Cerita Sasak Bike" description="Lahir dari kecintaan terhadap Pulau Lombok dan kesehatan masyarakatnya." />

    <section className="container py-16">
      <div className="max-w-4xl mx-auto text-center space-y-5 animate-fade-up">
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
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5 mt-12">
        {[
          { icon: Heart, title: "Tubuh Lebih Bugar", desc: "Bersama Sasak Bike, kayuh setiap hari menjaga jantung kuat dan stamina prima sepanjang hari." },
          { icon: Leaf, title: "Lombok Tetap Asri", desc: "Setiap sepeda Sasak Bike adalah langkah nyata menjaga udara pulau kita tetap segar tanpa polusi." },
          { icon: Zap, title: "Lincah & Hemat", desc: "Tembus macet, hemat bensin, sampai tujuan lebih cepat — gaya hidup praktis ala Sasak Bike." },
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

    <section className="container pb-16">
      <h2 className="font-display text-3xl font-black text-center mb-10"><span className="text-gradient">Misi</span> Kami</h2>
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

      <div className="text-center mt-10">
        <Link to="/produk" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-bold transition-smooth hover:shadow-glow hover:scale-105">
          Lihat Koleksi Sepeda <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  </PageLayout>
);

export default About;
