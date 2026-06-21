import { Link } from "react-router-dom";
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import BuyerOrderForm, {
  type BuyerOrderPayload,
  WhatsAppIcon,
} from "@/components/BuyerOrderForm";
import { useCart } from "@/context/CartContext";
import { formatRupiah } from "@/data/products";
import {
  buildCartWhatsAppMessage,
  sendOrderViaWhatsApp,
} from "@/lib/whatsapp-order";
import { recordOrder } from "@/lib/order-store";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { lines, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCheckout = async (data: BuyerOrderPayload) => {
    if (lines.length === 0) return;

    setSubmitting(true);
    try {
      const message = buildCartWhatsAppMessage({
        lines,
        buyerName: data.name,
        buyerPhone: data.phone,
        fullAddress: data.fullAddress,
        mapsLink: data.mapsLink,
      });

      recordOrder({
        buyerName: data.name,
        buyerPhone: data.phone,
        fullAddress: data.fullAddress,
        mapsLink: data.mapsLink,
        source: "keranjang",
        items: lines.map((line) => ({
          productId: line.productId,
          productName: line.product.name,
          variantLabel: line.variantLabel,
          size: line.size,
          unitPrice: line.unitPrice,
          quantity: line.quantity,
          lineTotal: line.lineTotal,
        })),
        total: totalPrice,
      });

      toast.success("Membuka WhatsApp...");
      await sendOrderViaWhatsApp(message);
      clearCart();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <SEO
        title="Keranjang Belanja — Sasak Bike Lombok"
        description="Keranjang belanja Sasak Bike. Simpan sepeda pilihanmu, atur jumlah, lalu checkout via WhatsApp dengan COD sepulau Lombok."
        path="/keranjang"
      />
      <PageHeader
        eyebrow="BELANJA MUDAH"
        title="Keranjang Belanja"
        description="Simpan sepeda favoritmu di keranjang — seperti Shopee & Tokopedia. Atur jumlah, lalu pesan semua sekaligus via WhatsApp."
      />

      <section className="container py-10 sm:py-14 max-w-4xl">
        {lines.length === 0 ? (
          <div className="rounded-2xl border border-border bg-gradient-card p-10 sm:p-14 text-center">
            <ShoppingBag className="h-14 w-14 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-2">
              Keranjang masih kosong
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-md mx-auto">
              Belum ada sepeda di keranjang. Jelajahi koleksi kami dan tap
              &quot;Keranjang&quot; untuk menyimpan produk favoritmu.
            </p>
            <Link
              to="/produk"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-bold text-sm transition-smooth hover:shadow-glow"
            >
              Lihat Produk <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  {totalItems} item di keranjang
                </p>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs sm:text-sm font-medium text-destructive hover:underline"
                >
                  Kosongkan keranjang
                </button>
              </div>

              {lines.map((line) => (
                <article
                  key={line.key}
                  className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-border bg-gradient-card"
                >
                  <Link
                    to={`/produk/${line.product.id}`}
                    className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-black border border-border"
                  >
                    <img
                      src={line.variantImage}
                      alt={line.product.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/produk/${line.product.id}`}
                      className="font-semibold text-sm sm:text-base leading-snug hover:text-primary line-clamp-2"
                    >
                      {line.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">
                      Warna: {line.variantLabel}
                      {line.size ? ` · Ukuran ${line.size}"` : ""}
                    </p>
                    <p className="text-base sm:text-lg font-black text-primary mt-2">
                      {formatRupiah(line.unitPrice)}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
                      <div className="inline-flex items-center rounded-sm border border-border overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.key, line.quantity - 1)}
                          aria-label="Kurangi jumlah"
                          className="h-8 w-8 flex items-center justify-center bg-secondary/40 hover:bg-secondary/70 transition-smooth"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[2rem] px-2 text-center text-sm font-semibold tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.key, line.quantity + 1)}
                          aria-label="Tambah jumlah"
                          className="h-8 w-8 flex items-center justify-center bg-secondary/40 hover:bg-secondary/70 transition-smooth"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          removeFromCart(line.key);
                          toast.success("Produk dihapus dari keranjang");
                        }}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-destructive transition-smooth"
                      >
                        <Trash2 className="h-4 w-4" /> Hapus
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="lg:sticky lg:top-24 rounded-xl border border-border bg-gradient-card p-4 sm:p-5 space-y-4">
              <h2 className="font-display text-lg font-bold">Ringkasan Belanja</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total item</span>
                  <span className="font-semibold">{totalItems}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="font-medium">Total harga</span>
                  <span className="font-black text-primary">{formatRupiah(totalPrice)}</span>
                </div>
                <p className="text-xs text-muted-foreground pt-1">
                  Pembayaran COD saat barang sampai di rumah (Sepulau Lombok)
                </p>
              </div>

              {!showForm ? (
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="btn-buy w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Pesan via WhatsApp
                </button>
              ) : (
                <BuyerOrderForm
                  onSubmit={handleCheckout}
                  submitting={submitting}
                  submitLabel="Kirim Pesanan Keranjang"
                />
              )}

              <Link
                to="/produk"
                className="block text-center text-sm font-medium text-primary hover:underline"
              >
                Lanjut belanja
              </Link>
            </aside>
          </div>
        )}
      </section>
    </PageLayout>
  );
};

export default Cart;
