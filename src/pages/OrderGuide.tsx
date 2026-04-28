import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Search, MessageCircle, ClipboardList, Truck, Wallet, Check } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  { icon: Search, title: "Pilih Sepeda", desc: "Jelajahi koleksi Sasak Bike dan pilih warna favoritmu." },
  { icon: ClipboardList, title: "Isi Form Pembeli", desc: "Lengkapi nama, nomor HP, alamat, dan deteksi lokasi GPS." },
  { icon: MessageCircle, title: "Kirim ke WhatsApp", desc: "Klik Beli Sekarang — pesananmu otomatis terkirim ke admin via WhatsApp." },
  { icon: Truck, title: "Pengantaran", desc: "Tim kami akan mengantar sepeda langsung ke alamatmu sepulau Lombok." },
  { icon: Wallet, title: "Bayar COD", desc: "Bayar tunai saat sepeda tiba di tempatmu. Aman, mudah, terpercaya." },
];

const OrderGuide = () => (
  <PageLayout>
    <PageHeader eyebrow="PANDUAN" title="Cara Pemesanan & Pembayaran" description="Lima langkah mudah membawa sepeda impianmu pulang." />
    <section className="container py-14">
      <div className="relative max-w-3xl mx-auto space-y-5">
        {steps.map((s, i) => (
          <div key={i} className="relative flex gap-5 p-6 rounded-2xl bg-gradient-card border border-border transition-smooth hover:border-primary animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <s.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              {i < steps.length - 1 && <div className="flex-1 w-0.5 bg-border my-2" />}
            </div>
            <div className="flex-1 pb-4">
              <p className="text-xs tracking-widest text-primary mb-1">LANGKAH {i + 1}</p>
              <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto mt-12 p-7 rounded-2xl glass">
        <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2"><Wallet className="h-5 w-5 text-primary" /> Metode Pembayaran</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><Check className="h-4 w-4 text-primary mt-0.5" /> COD (Cash On Delivery) — Khusus wilayah Pulau Lombok.</li>
          <li className="flex gap-2"><Check className="h-4 w-4 text-primary mt-0.5" /> Pembayaran dilakukan saat sepeda diterima.</li>
          <li className="flex gap-2"><Check className="h-4 w-4 text-primary mt-0.5" /> Mohon siapkan uang pas untuk mempermudah kurir.</li>
        </ul>
        <Link to="/produk" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-bold transition-smooth hover:shadow-glow">
          Mulai Pesan Sekarang
        </Link>
      </div>
    </section>
  </PageLayout>
);

export default OrderGuide;
