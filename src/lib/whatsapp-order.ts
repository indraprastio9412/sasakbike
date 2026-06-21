import { buildWhatsAppUrl } from "@/lib/whatsapp-config";
import type { CartLine } from "@/context/CartContext";

/** URL absolut untuk aset gambar (hasil import Vite) */
export function getAbsoluteImageUrl(imageSrc: string) {
  if (imageSrc.startsWith("http")) return imageSrc;
  const origin = window.location.origin;
  if (imageSrc.startsWith("/")) return `${origin}${imageSrc}`;
  return new URL(imageSrc, origin).href;
}

export type OrderMessageInput = {
  productName?: string;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
  size?: string;
  buyerName: string;
  buyerPhone: string;
  fullAddress: string;
  mapsLink?: string | null;
};

export type CartOrderMessageInput = {
  lines: CartLine[];
  buyerName: string;
  buyerPhone: string;
  fullAddress: string;
  mapsLink?: string | null;
};

/** Format harga seperti Rp1.500.000 (tanpa spasi setelah Rp). */
export function formatRupiahWa(amount: number): string {
  return `Rp${amount.toLocaleString("id-ID")}`;
}

/** Susun pesan WhatsApp sesuai format admin Sasak Bike. */
export function buildOrderWhatsAppMessage(input: OrderMessageInput): string {
  const lines = [
    "Halo Admin SASAK BIKE, saya ingin pesan sepeda.",
    "",
    "Detail Pesanan",
  ];

  if (input.productName) {
    lines.push(`- Produk: ${input.productName}`);
  }

  lines.push(`- Varian: ${input.variantLabel}`);

  if (input.size) {
    lines.push(`- Ukuran: ${input.size} inch`);
  }

  lines.push(
    `- Harga: ${formatRupiahWa(input.unitPrice)}`,
    `- Jumlah: ${input.quantity} unit`,
    `- Subtotal: ${formatRupiahWa(input.unitPrice * input.quantity)}`,
    `- Pembayaran: COD (Pulau Lombok)`,
    "",
    "Data Pembeli",
    `- Nama: ${input.buyerName}`,
    `- no hp: ${input.buyerPhone}`,
    "",
    "Alamat pengiriman:",
    input.fullAddress,
  );

  if (input.mapsLink) {
    lines.push("", `🗺️ Google Maps: ${input.mapsLink}`);
  }

  lines.push("", "", "Mohon konfirmasi stok dan jadwal pengantaran. Terima kasih!");

  return lines.join("\n");
}

/** Susun pesan WhatsApp untuk checkout keranjang (multi-item). */
export function buildCartWhatsAppMessage(input: CartOrderMessageInput): string {
  const total = input.lines.reduce((sum, line) => sum + line.lineTotal, 0);

  const lines = [
    "Halo Admin SASAK BIKE, saya ingin pesan sepeda dari keranjang belanja.",
    "",
    "Detail Pesanan",
  ];

  input.lines.forEach((line, index) => {
    lines.push(
      "",
      `${index + 1}. ${line.product.name}`,
      `   - Varian: ${line.variantLabel}`,
    );
    if (line.size) {
      lines.push(`   - Ukuran: ${line.size} inch`);
    }
    lines.push(
      `   - Harga: ${formatRupiahWa(line.unitPrice)}`,
      `   - Jumlah: ${line.quantity} unit`,
      `   - Subtotal: ${formatRupiahWa(line.lineTotal)}`,
    );
  });

  lines.push(
    "",
    `Total Pesanan: ${formatRupiahWa(total)}`,
    `- Pembayaran: COD (Pulau Lombok)`,
    "",
    "Data Pembeli",
    `- Nama: ${input.buyerName}`,
    `- no hp: ${input.buyerPhone}`,
    "",
    "Alamat pengiriman:",
    input.fullAddress,
  );

  if (input.mapsLink) {
    lines.push("", `🗺️ Google Maps: ${input.mapsLink}`);
  }

  lines.push("", "", "Mohon konfirmasi stok dan jadwal pengantaran. Terima kasih!");

  return lines.join("\n");
}

/**
 * Arahkan pengguna ke WhatsApp dengan pesan pesanan yang sudah disusun.
 *
 * Catatan perbaikan: sebelumnya fungsi ini mencoba window.open(...,"noopener")
 * lalu fallback ke redirect bila gagal. Masalahnya, window.open dengan opsi
 * "noopener" SELALU mengembalikan null (sesuai spesifikasi browser), jadi
 * deteksi "berhasil/gagal"-nya tidak pernah akurat — di beberapa browser/HP
 * tombol "Beli Sekarang" jadi terasa tidak mengarahkan ke WhatsApp sama sekali
 * (pop-up diblokir & fallback-nya tidak konsisten).
 *
 * Solusinya: redirect langsung pakai window.location.href. Ini paling stabil
 * di semua browser (desktop & mobile) dan tidak bisa diblokir pop-up blocker.
 */
export async function sendOrderViaWhatsApp(message: string) {
  const url = buildWhatsAppUrl(message);
  window.location.href = url;
}
