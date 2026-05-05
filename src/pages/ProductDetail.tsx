import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import PageLayout from "@/components/layout/PageLayout";
import { products, formatRupiah } from "@/data/products";
import { Check, MapPin, Loader2, ShieldCheck, Truck, ArrowLeft, MessageCircle, PackageCheck, BadgeCheck, Wallet } from "lucide-react";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "6283112282090";

const schema = z.object({
  name: z.string().trim().min(3, "Nama minimal 3 karakter").max(100, "Nama maksimal 100 karakter"),
  phone: z.string().trim().regex(/^(\+62|62|0)8[0-9]{8,12}$/, "Nomor HP tidak valid (contoh: 08123456789)"),
  address: z.string().trim().min(10, "Alamat minimal 10 karakter").max(500, "Alamat terlalu panjang"),
});

const SPECS: { label: string; value: string }[] = [
  { label: "Status", value: "READY STOK" },
  { label: "Kondisi", value: "Barang Baru" },
  { label: "Keaslian", value: "Original 100%" },
  { label: "Merk", value: "MAZARA" },
  { label: "Tipe", value: "6633" },
  { label: "Frame", value: "Steel Frame" },
  { label: "Fork", value: "Steel Fork" },
  { label: "FD", value: "3 Speed" },
  { label: "RD", value: "7 Speed" },
  { label: "Rem", value: "Rem Cakram" },
  { label: "Velg", value: "Alloy" },
  { label: "Beban Maksimal", value: "60 Kg" },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [size, setSize] = useState<"24" | "26">("26");
  const [showForm, setShowForm] = useState(false);
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
📏 *Ukuran:* ${size} inch
💰 *Harga:* ${formatRupiah(product.price)}

👤 *Nama:* ${form.name}
📱 *No. HP:* ${form.phone}
📍 *Alamat:* ${form.address}
🗺️ *Lokasi GPS:* ${mapsLink}

💵 *Pembayaran:* COD (Cash On Delivery)
🚚 *Pengiriman:* GRATIS ONGKIR Sepulau Lombok

Mohon konfirmasi pesanan saya. Terima kasih!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    toast.success("Mengarahkan ke WhatsApp...");
    setTimeout(() => window.open(url, "_blank"), 600);
  };

  const orangeBtn = "transition-smooth hover:bg-none hover:!bg-orange-500 hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] active:!bg-orange-600";

  return (
    <PageLayout>
      <section className="container py-10">
        <Link to="/produk" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Produk
        </Link>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* LEFT — Image */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-card border border-border animate-fade-up self-start lg:sticky lg:top-24 aspect-square">
            <div className="absolute inset-0 -z-10 opacity-40" style={{ background: `radial-gradient(circle at center, ${product.color}55, transparent 70%)` }} />
            <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
          </div>

          {/* RIGHT — Description */}
          <div className="space-y-6 animate-fade-up">
            <div>
              <p className="text-xs tracking-[0.4em] text-primary mb-2">{product.tagline}</p>
              <h1 className="font-display text-3xl md:text-5xl font-black mb-3">{product.name}</h1>
              <p className="text-3xl font-black text-gradient">{formatRupiah(product.price)}</p>
            </div>

            {/* Size selector */}
            <div className="p-5 rounded-2xl bg-gradient-card border border-border">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground mb-3">PILIH UKURAN</p>
              <div className="grid grid-cols-2 gap-3">
                {(["24", "26"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`py-4 rounded-xl font-bold transition-smooth border-2 ${
                      size === s
                        ? "border-primary bg-primary/10 text-primary shadow-glow"
                        : "border-border bg-secondary/40 hover:border-primary/50"
                    }`}
                  >
                    {s} Inch
                  </button>
                ))}
              </div>
            </div>

            {/* Description Table */}
            <div className="rounded-2xl overflow-hidden border border-border bg-gradient-card">
              <div className="px-5 py-3 bg-primary/10 border-b border-border">
                <h2 className="font-display font-bold text-lg flex items-center gap-2">
                  <PackageCheck className="h-5 w-5 text-primary" /> Deskripsi Produk
                </h2>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {SPECS.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-background/30" : ""}>
                      <td className="px-5 py-3 font-semibold text-muted-foreground w-2/5 border-b border-border/50">{row.label}</td>
                      <td className="px-5 py-3 font-bold border-b border-border/50">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl glass flex gap-3">
                <Truck className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-bold text-sm">Gratis Ongkir</p>
                  <p className="text-xs text-muted-foreground">Pengantaran COD ke seluruh Pulau Lombok</p>
                </div>
              </div>
              <div className="p-4 rounded-xl glass flex gap-3">
                <Wallet className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-bold text-sm">Bayar di Tempat (COD)</p>
                  <p className="text-xs text-muted-foreground">Pembayaran saat barang diterima — aman & praktis</p>
                </div>
              </div>
            </div>

            {/* Quick features */}
            <ul className="grid grid-cols-2 gap-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" /> {f}
                </li>
              ))}
            </ul>

            {/* Beli Sekarang */}
            {!showForm ? (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className={`w-full inline-flex items-center justify-center gap-2 py-5 rounded-2xl bg-gradient-primary text-primary-foreground font-black text-lg hover:scale-[1.02] hover:shadow-glow ${orangeBtn}`}
              >
                <WhatsAppIcon className="h-6 w-6" /> Beli Sekarang
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-2xl bg-gradient-card border border-border">
                <h3 className="font-display font-bold text-lg flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" /> Form Data Pembeli
                </h3>

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
                  className={`w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-bold hover:scale-[1.02] hover:shadow-glow ${orangeBtn}`}
                >
                  <MessageCircle className="h-5 w-5" /> Kirim Pesanan via WhatsApp
                </button>

                <p className="text-center text-[11px] font-bold text-primary tracking-wider">
                  👉 GRATIS ONGKIR SEPULAU LOMBOK
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProductDetail;
