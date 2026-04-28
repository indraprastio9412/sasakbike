import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import PageLayout from "@/components/layout/PageLayout";
import { products, formatRupiah } from "@/data/products";
import { Check, MapPin, Loader2, ShieldCheck, Truck, ArrowLeft, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "6283112282090";

const schema = z.object({
  name: z.string().trim().min(3, "Nama minimal 3 karakter").max(100, "Nama maksimal 100 karakter"),
  phone: z.string().trim().regex(/^(\+62|62|0)8[0-9]{8,12}$/, "Nomor HP tidak valid (contoh: 08123456789)"),
  address: z.string().trim().min(10, "Alamat minimal 10 karakter").max(500, "Alamat terlalu panjang"),
});

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!product) return <Navigate to="/produk" replace />;

  const detectLocation = () => {
    if (!navigator.geolocation) return toast.error("GPS tidak didukung browser ini");
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
        toast.success("Lokasi berhasil dideteksi!");
      },
      () => {
        setLocating(false);
        toast.error("Izin lokasi ditolak. Silakan aktifkan GPS.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});

    const mapsLink = coords ? `https://maps.google.com/?q=${coords.lat},${coords.lng}` : "(belum dilampirkan)";
    const message =
`*PEMESANAN SASAK BIKE*

🚲 *Produk:* ${product.name}
💰 *Harga:* ${formatRupiah(product.price)}

👤 *Nama:* ${form.name}
📱 *No. HP:* ${form.phone}
📍 *Alamat:* ${form.address}
🗺️ *Lokasi GPS:* ${mapsLink}

💵 *Pembayaran:* COD (Cash On Delivery)
🚚 *Pengiriman:* Sepulau Lombok

Mohon konfirmasi pesanan saya. Terima kasih!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    toast.success("Mengarahkan ke WhatsApp...");
    setTimeout(() => window.open(url, "_blank"), 600);
  };

  return (
    <PageLayout>
      <section className="container py-10">
        <Link to="/produk" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Produk
        </Link>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-card border border-border p-6 animate-fade-up">
            <div className="absolute inset-0 -z-10 opacity-40" style={{ background: `radial-gradient(circle at center, ${product.color}55, transparent 70%)` }} />
            <img src={product.image} alt={product.name} className="w-full h-full object-contain animate-float" />
          </div>

          {/* Info */}
          <div className="space-y-6 animate-fade-up">
            <div>
              <p className="text-xs tracking-[0.4em] text-primary mb-2">{product.tagline}</p>
              <h1 className="font-display text-3xl md:text-5xl font-black mb-3">{product.name}</h1>
              <p className="text-3xl font-black text-gradient">{formatRupiah(product.price)}</p>
            </div>

            <ul className="grid grid-cols-2 gap-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" /> {f}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: Truck, label: "Antar Sepulau Lombok" },
                { icon: ShieldCheck, label: "COD Aman" },
                { icon: MapPin, label: "GPS Tracking" },
              ].map((b, i) => (
                <div key={i} className="p-3 rounded-xl glass">
                  <b.icon className="h-5 w-5 text-primary mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground leading-tight">{b.label}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-2xl bg-gradient-card border border-border">
              <h3 className="font-display font-bold text-lg">Form Data Pembeli</h3>

              <div>
                <label className="text-xs font-semibold tracking-wider text-muted-foreground">NAMA LENGKAP</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:outline-none transition-smooth"
                  placeholder="Contoh: Lalu Ahmad"
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold tracking-wider text-muted-foreground">NOMOR HP / WHATSAPP</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:outline-none transition-smooth"
                  placeholder="08123456789"
                />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold tracking-wider text-muted-foreground">ALAMAT LENGKAP</label>
                <textarea
                  rows={3}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="mt-1 w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:outline-none transition-smooth resize-none"
                  placeholder="Dusun, Desa, Kecamatan, Kabupaten — Lombok"
                />
                {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
              </div>

              <button
                type="button"
                onClick={detectLocation}
                disabled={locating}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg glass font-semibold text-sm hover:border-primary transition-smooth"
              >
                {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4 text-primary" />}
                {coords ? `Lokasi terdeteksi (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})` : "Deteksi Lokasi GPS Saya"}
              </button>

              <p className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                Data Anda hanya dipakai untuk proses pengiriman. Lihat <Link to="/kebijakan-privasi" className="text-primary underline">Kebijakan Privasi</Link>.
              </p>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-bold transition-smooth hover:shadow-glow hover:scale-[1.02]"
              >
                <MessageCircle className="h-5 w-5" /> Beli Sekarang via WhatsApp
              </button>

              <p className="text-center text-[11px] font-bold text-primary tracking-wider">
                👉 MENDUKUNG PENGANTARAN SEPULAU LOMBOK
              </p>
            </form>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProductDetail;
