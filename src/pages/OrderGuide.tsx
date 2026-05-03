import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/PageHeader";
import { ShoppingCart, MessageCircle, ClipboardList, MapPin, Send, CheckCircle2, Wallet, Lightbulb, Check } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  { icon: ShoppingCart, title: "Pilih Varian Sepeda", desc: "Pilih varian sepeda yang diinginkan pada halaman produk." },
  { icon: Send, title: "Klik Beli Sekarang", desc: "Tekan tombol Beli Sekarang pada halaman detail produk." },
  { icon: ClipboardList, title: "Isi Form Pemesanan", desc: "Lengkapi nama, nomor WhatsApp aktif, alamat detail, dan titik lokasi." },
  { icon: MapPin, title: "Validasi Lokasi", desc: "Pastikan link Google Maps valid agar pengantaran lebih tepat." },
  { icon: MessageCircle, title: "Kirim ke WhatsApp", desc: "Kirim form, lalu Anda akan diarahkan ke WhatsApp admin secara otomatis." },
  { icon: CheckCircle2, title: "Konfirmasi Admin", desc: "Tunggu konfirmasi stok, jadwal antar, dan finalisasi pesanan dari admin." },
];

const tips = [
  "Gunakan nomor WhatsApp aktif dan mudah dihubungi.",
  "Isi alamat lengkap: jalan, nomor rumah, RT/RW, dan patokan terdekat.",
  "Pastikan varian warna dan jumlah unit sudah benar sebelum kirim form.",
  "Balas chat admin secepatnya saat verifikasi dilakukan.",
];

const OrderGuide = () => (
  <PageLayout>
    <PageHeader
      eyebrow="PANDUAN BELANJA"
      title="Cara Pemesanan dan Pembayaran"
      description="Ikuti langkah berikut agar pemesanan sepeda di SASAK BIKE berjalan cepat, aman, dan akurat."
    />
    <section className="container py-14">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-black mb-6 text-gradient">Langkah Pemesanan</h2>
        <div className="relative space-y-5">
          {steps.map((s, i) => (
            <div
              key={i}
              className="relative flex gap-5 p-6 rounded-2xl bg-gradient-card border border-border transition-smooth hover:border-primary animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
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

        <div className="mt-12 p-7 rounded-2xl glass">
          <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" /> Metode Pembayaran
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><Check className="h-4 w-4 text-primary mt-0.5" /> Metode utama: COD (Cash On Delivery).</li>
            <li className="flex gap-2"><Check className="h-4 w-4 text-primary mt-0.5" /> Pembayaran dilakukan saat barang diterima pelanggan.</li>
            <li className="flex gap-2"><Check className="h-4 w-4 text-primary mt-0.5" /> COD berlaku untuk area layanan Pulau Lombok sesuai cakupan rute pengantaran.</li>
          </ul>
        </div>

        <div className="mt-8 p-7 rounded-2xl bg-gradient-card border border-border">
          <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" /> Tips Agar Pesanan Cepat Diproses
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {tips.map((t, i) => (
              <li key={i} className="flex gap-2"><Check className="h-4 w-4 text-primary mt-0.5" /> {t}</li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-10">
          <Link to="/produk" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-bold transition-smooth hover:shadow-glow">
            Mulai Pesan Sekarang
          </Link>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default OrderGuide;
