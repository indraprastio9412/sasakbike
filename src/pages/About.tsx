import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Bike, Heart, Leaf, Users, Mountain, Sun } from "lucide-react";

const About = () => (
  <PageLayout>
    <PageHeader eyebrow="TENTANG KAMI" title="Cerita Sasak Bike" description="Lahir dari kecintaan terhadap Pulau Lombok dan kesehatan masyarakatnya." />

    <section className="container py-14 grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-5 animate-fade-up">
        <h2 className="font-display text-3xl font-black"><span className="text-gradient">Mengembalikan</span> Semangat Bersepeda</h2>
        <p className="text-muted-foreground leading-relaxed">
          Di tengah perkembangan zaman, semakin banyak masyarakat yang bergantung pada kendaraan bermotor dan melupakan pentingnya berolahraga. Sasak Bike hadir sebagai jawaban — mengajak masyarakat Lombok kembali ke jalur sehat dengan bersepeda.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Kami percaya, satu kayuhan kecil bisa mengubah gaya hidup. Dari Mataram hingga Sembalun, dari pesisir Senggigi hingga lereng Rinjani — sepeda adalah cara terbaik untuk mengenal Lombok lebih dekat.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: Heart, label: "Sehat", v: "100%" },
          { icon: Leaf, label: "Hijau", v: "0 Emisi" },
          { icon: Mountain, label: "Lombok", v: "Sepulau" },
          { icon: Sun, label: "Setiap Hari", v: "24/7" },
        ].map((s, i) => (
          <div key={i} className="p-6 rounded-2xl bg-gradient-card border border-border text-center animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <s.icon className="h-8 w-8 text-primary mx-auto mb-3" />
            <p className="font-display text-2xl font-black text-gradient">{s.v}</p>
            <p className="text-xs text-muted-foreground tracking-widest mt-1">{s.label.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="container py-14">
      <h2 className="font-display text-3xl font-black text-center mb-10"><span className="text-gradient">Misi</span> Kami</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { icon: Bike, t: "Sepeda Berkualitas", d: "Menyediakan sepeda terbaik dengan harga adil untuk semua kalangan." },
          { icon: Users, t: "Komunitas Sehat", d: "Membangun budaya bersepeda yang kuat di seluruh Pulau Lombok." },
          { icon: Leaf, t: "Lombok Lestari", d: "Mendukung lingkungan bebas polusi melalui transportasi ramah alam." },
        ].map((m, i) => (
          <div key={i} className="p-7 rounded-2xl bg-gradient-card border border-border transition-smooth hover:border-primary animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
            <m.icon className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-display font-bold text-lg mb-2">{m.t}</h3>
            <p className="text-sm text-muted-foreground">{m.d}</p>
          </div>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default About;
