import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/PageHeader";
import { FileText } from "lucide-react";

const sections = [
  {
    title: "1. Ketentuan Umum",
    items: [
      "Pelanggan wajib mengisi data pemesanan dengan benar dan lengkap.",
      "SASAK BIKE berhak melakukan verifikasi sebelum pesanan diproses.",
      "Dengan melakukan pemesanan, pelanggan dianggap menyetujui seluruh ketentuan pada halaman ini.",
    ],
  },
  {
    title: "2. Area Layanan dan Pengiriman",
    items: [
      "Layanan COD difokuskan untuk wilayah Pulau Lombok.",
      "Area layanan utama: Kota Mataram, Lombok Barat, Lombok Tengah, Lombok Timur, dan Lombok Utara.",
      "Ketersediaan jadwal antar menyesuaikan rute, cuaca, dan antrean pesanan.",
    ],
  },
  {
    title: "3. Harga dan Ketersediaan Stok",
    items: [
      "Harga normal saat ini: Rp1.400.000 per unit (dapat berubah sesuai kebijakan toko).",
      "Stok ditentukan berdasarkan ketersediaan varian saat pesanan masuk.",
      "Konfirmasi akhir stok dilakukan oleh admin melalui WhatsApp.",
    ],
  },
  {
    title: "4. Pembatalan dan Penyesuaian Pesanan",
    items: [
      "Pembatalan dapat dilakukan sebelum pesanan masuk jadwal pengantaran.",
      "Perubahan varian/alamat wajib diinformasikan secepatnya ke admin.",
      "Pesanan dengan data tidak valid dapat ditunda atau dibatalkan demi keamanan transaksi.",
    ],
  },
  {
    title: "5. Komplain dan Penanganan Kendala",
    items: [
      "Keluhan mengenai unit yang diterima dapat diajukan maksimal 1x24 jam setelah barang diterima.",
      "Pelanggan diminta menyertakan foto/video pendukung saat mengajukan komplain.",
      "Tim SASAK BIKE akan memberikan solusi terbaik sesuai hasil verifikasi.",
    ],
  },
  {
    title: "6. Perubahan Ketentuan",
    items: [
      "SASAK BIKE dapat memperbarui isi syarat dan ketentuan sewaktu-waktu untuk meningkatkan kualitas layanan. Versi terbaru pada halaman ini berlaku sebagai acuan resmi.",
    ],
  },
];

const Terms = () => (
  <PageLayout>
    <PageHeader
      eyebrow="LEGAL"
      title="Syarat dan Ketentuan Layanan"
      description="Dokumen ini mengatur ketentuan pemesanan, pembayaran, pengiriman, dan penggunaan layanan di SASAK BIKE."
    />
    <section className="container py-14 max-w-4xl">
      <div className="flex items-center gap-3 mb-8 p-4 rounded-xl glass">
        <FileText className="h-5 w-5 text-primary" />
        <p className="text-sm text-muted-foreground">Berlaku efektif sejak tanggal publikasi.</p>
      </div>
      <div className="space-y-5">
        {sections.map((s, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-gradient-card border border-border transition-smooth hover:border-primary animate-fade-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <h3 className="font-display font-bold text-lg mb-3 text-gradient">{s.title}</h3>
            <ul className="space-y-2">
              {s.items.map((item, j) => (
                <li key={j} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default Terms;
