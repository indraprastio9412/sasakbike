import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/PageHeader";
import { FileText } from "lucide-react";

const sections = [
  { title: "1. Definisi Layanan", body: "Sasak Bike adalah toko sepeda online yang melayani penjualan sepeda khusus untuk wilayah Pulau Lombok dengan sistem pembayaran COD (Cash On Delivery)." },
  { title: "2. Pemesanan", body: "Setiap pemesanan dilakukan melalui form di website kami dan dikonfirmasi via WhatsApp ke nomor resmi +62 831-1228-2090. Pesanan dianggap sah setelah konfirmasi balasan dari admin." },
  { title: "3. Harga & Pembayaran", body: "Harga yang tertera sudah final dalam Rupiah. Pembayaran dilakukan secara COD saat barang diterima. Pembeli wajib menyiapkan dana sesuai total tagihan." },
  { title: "4. Pengiriman", body: "Pengantaran tersedia di seluruh wilayah Pulau Lombok. Estimasi waktu pengantaran 1–3 hari kerja tergantung lokasi tujuan." },
  { title: "5. Pembatalan", body: "Pembatalan pesanan hanya dapat dilakukan sebelum sepeda dikirim. Setelah kurir berangkat, pembatalan dapat dikenakan biaya operasional." },
  { title: "6. Garansi & Klaim", body: "Sepeda dilengkapi garansi resmi dari produsen. Klaim garansi wajib disertai bukti pembelian dan dilakukan via WhatsApp resmi kami." },
  { title: "7. Tanggung Jawab", body: "Sasak Bike tidak bertanggung jawab atas penyalahgunaan produk di luar fungsi normalnya. Kerusakan akibat kelalaian pengguna tidak termasuk garansi." },
  { title: "8. Perubahan Ketentuan", body: "Sasak Bike berhak memperbarui Syarat & Ketentuan ini sewaktu-waktu. Perubahan akan dipublikasikan di halaman ini." },
];

const Terms = () => (
  <PageLayout>
    <PageHeader eyebrow="LEGAL" title="Syarat & Ketentuan" description="Mohon baca dengan saksama sebelum melakukan pemesanan." />
    <section className="container py-14 max-w-4xl">
      <div className="flex items-center gap-3 mb-8 p-4 rounded-xl glass">
        <FileText className="h-5 w-5 text-primary" />
        <p className="text-sm text-muted-foreground">Berlaku efektif sejak tanggal publikasi.</p>
      </div>
      <div className="space-y-5">
        {sections.map((s, i) => (
          <div key={i} className="p-6 rounded-2xl bg-gradient-card border border-border transition-smooth hover:border-primary animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <h3 className="font-display font-bold text-lg mb-2 text-gradient">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default Terms;
