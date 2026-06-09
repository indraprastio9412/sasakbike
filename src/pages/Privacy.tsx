import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import { formatWhatsAppDisplay } from "@/lib/whatsapp-config";
import { ShieldCheck, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";

const waDisplay = formatWhatsAppDisplay();

const items = [
  { icon: Database, title: "Data yang Kami Kumpulkan", body: "Nama lengkap, nomor HP/WhatsApp, alamat pengiriman, dan koordinat GPS (opsional, hanya jika Anda mengizinkan) — semata-mata untuk kebutuhan pengantaran sepeda." },
  { icon: Eye, title: "Penggunaan Data", body: "Data Anda hanya digunakan untuk memproses pesanan, koordinasi pengantaran, dan komunikasi terkait pembelian. Kami tidak menjual atau membagikan data Anda kepada pihak ketiga manapun." },
  { icon: Lock, title: "Keamanan Data", body: "Kami menerapkan praktik keamanan terbaik. Data percakapan dikirim langsung melalui WhatsApp resmi dengan enkripsi end-to-end. Tidak ada data sensitif yang disimpan di server publik." },
  { icon: UserCheck, title: "Hak Anda", body: "Anda berhak meminta penghapusan data pribadi Anda kapan saja dengan menghubungi kami via WhatsApp resmi. Permintaan akan diproses maksimal 7 hari kerja." },
  { icon: ShieldCheck, title: "Lokasi GPS", body: "Fitur deteksi lokasi bersifat opsional dan memerlukan izin eksplisit dari browser Anda. Lokasi hanya dipakai untuk membantu kurir menemukan alamat pengantaran secara akurat." },
  { icon: Mail, title: "Kontak Privasi", body: `Untuk pertanyaan terkait privasi, silakan hubungi ${waDisplay} atau halo@sasakbike.id.` },
];

const Privacy = () => (
  <PageLayout>
    <SEO
      title="Kebijakan Privasi & Keamanan — Sasak Bike"
      description="Bagaimana Sasak Bike mengumpulkan, menggunakan, dan melindungi data pribadi pelanggan."
      path="/kebijakan-privasi"
    />
    <PageHeader eyebrow="KEAMANAN" title="Kebijakan Privasi & Keamanan" description="Privasi Anda adalah prioritas kami. Berikut cara kami melindungi data Anda." />
    <section className="container py-14 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((it, i) => (
          <div key={i} className="p-6 rounded-2xl bg-gradient-card border border-border transition-smooth hover:border-primary hover:-translate-y-1 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <it.icon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display font-bold text-lg mb-2">{it.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{it.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 p-7 rounded-2xl glass text-center">
        <ShieldCheck className="h-10 w-10 text-primary mx-auto mb-3" />
        <p className="font-display font-bold text-lg mb-1">Komitmen Kami</p>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Sasak Bike berkomitmen menjaga kepercayaan pelanggan dengan menjunjung tinggi etika perlindungan data sesuai standar keamanan informasi.
        </p>
      </div>
    </section>
  </PageLayout>
);

export default Privacy;
