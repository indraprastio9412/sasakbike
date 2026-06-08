import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import BuyerOrderForm, {
  type BuyerOrderPayload,
  WhatsAppIcon,
} from "@/components/BuyerOrderForm";
import { products, formatRupiah } from "@/data/products";
import { absoluteUrl } from "@/lib/site-config";
import {
  buildOrderWhatsAppMessage,
  sendOrderViaWhatsApp,
} from "@/lib/whatsapp-order";
import {
  Truck,
  ArrowLeft,
  Wallet,
  ShoppingCart,
  ChevronRight,
  ShieldCheck,
  Loader2,
  Minus,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants[0] ?? null,
  );
  const [size, setSize] = useState(product?.sizes[0] ?? "26");
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const MAX_QUANTITY = 99;

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setSize(product.sizes[0] ?? "26");
      setQuantity(1);
      setShowForm(false);
    }
  }, [product?.id]);

  if (!product || !selectedVariant) return <Navigate to="/produk" replace />;

  const stockStatus =
    product.specs.find((s) => s.label === "Status")?.value ?? "READY STOK";

  const handleOrderSubmit = async (data: BuyerOrderPayload) => {
    setSubmitting(true);
    try {
      const message = buildOrderWhatsAppMessage({
        variantLabel: selectedVariant.label,
        unitPrice: product.price,
        quantity,
        size: product.sizes.length > 0 ? size : undefined,
        buyerName: data.name,
        buyerPhone: data.phone,
        fullAddress: data.fullAddress,
        mapsLink: data.mapsLink,
      });

      toast.success("Membuka WhatsApp...");
      await sendOrderViaWhatsApp(message);
    } finally {
      setSubmitting(false);
    }
  };

  const orderForm = (
    <BuyerOrderForm
      onSubmit={handleOrderSubmit}
      submitting={submitting}
      hideSubmitOnMobile
    />
  );

  return (
    <PageLayout>
      <SEO
        title={`${product.name} — ${formatRupiah(product.price)} | Sasak Bike`}
        description={`${product.name} — ${product.tagline}. Harga ${formatRupiah(product.price)}, COD sepulau Lombok.`}
        path={`/produk/${product.id}`}
        ogImage={absoluteUrl(selectedVariant.image)}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.tagline,
            image: absoluteUrl(selectedVariant.image),
            brand: { "@type": "Brand", name: "Sasak Bike" },
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "IDR",
              availability: "https://schema.org/InStock",
              url: absoluteUrl(`/produk/${product.id}`),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Beranda", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Produk", item: absoluteUrl("/produk") },
              { "@type": "ListItem", position: 3, name: product.name, item: absoluteUrl(`/produk/${product.id}`) },
            ],
          },
        ]}
      />

      <section className="container max-w-5xl px-4 sm:px-6 py-4 sm:py-6 pb-28 lg:pb-10">
        <Link
          to="/produk"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" /> Kembali ke Produk
        </Link>

        {/* —— Bagian atas: galeri + panel beli (gaya Shopee / Tokopedia) —— */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-start animate-fade-up">
          {/* Kiri: foto utama + thumbnail */}
          <div className="w-full max-w-lg mx-auto md:max-w-none md:mx-0">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black/40 border border-border">
              <span className="absolute top-2 left-2 z-10 px-2 py-0.5 text-[10px] font-bold text-primary border border-primary rounded bg-background/90">
                {stockStatus}
              </span>
              <img
                src={selectedVariant.image}
                alt={`${product.name} — ${selectedVariant.label}`}
                className="h-full w-full object-contain transition-smooth"
              />
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {product.variants.map((v) => {
                const isSelected = selectedVariant.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-md overflow-hidden border-2 snap-start transition-smooth bg-black ${
                      isSelected
                        ? "border-primary ring-1 ring-primary/50"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <img
                      src={v.image}
                      alt={`${product.name} — ${v.label}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kanan: judul, harga, varian, ukuran, tombol */}
          <div className="min-w-0 flex flex-col">
            <p className="text-xs text-primary font-medium mb-1">
              {product.tagline}
            </p>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-snug">
              {product.name}
            </h1>

            <p className="mt-3 text-2xl sm:text-3xl font-black text-primary">
              {formatRupiah(product.price)}
            </p>

            {/* Info pengiriman — seperti baris Shopee */}
            <div className="mt-4 space-y-3 text-sm border-b border-border pb-4">
              <div className="flex gap-3 items-start">
                <Truck className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-muted-foreground">Pengiriman </span>
                  <span className="font-medium">Sepulau Lombok (COD)</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
              <div className="flex gap-3 items-start">
                <ShieldCheck className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-muted-foreground">Garansi </span>
                  <span className="font-medium">
                    Original 100% · Bayar di Tempat
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
            </div>

            {/* Warna — tombol dengan thumbnail kecil (Shopee) */}
            <div className="py-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-2.5">
                Warna{" "}
                <span className="text-foreground font-medium">
                  {selectedVariant.label}
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-sm border text-xs sm:text-sm transition-smooth max-w-full ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary/30 text-foreground hover:border-primary/50"
                      }`}
                    >
                      <span className="w-8 h-8 rounded overflow-hidden bg-black shrink-0 border border-border/50">
                        <img
                          src={v.image}
                          alt={`${product.name} warna ${v.label}`}
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span className="truncate font-medium">{v.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ukuran */}
            {product.sizes.length > 0 && (
              <div className="py-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-2.5">
                  Ukuran{" "}
                  <span className="text-foreground font-medium">
                    {size} Inch
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`min-w-[3rem] px-4 py-2 rounded-sm border text-sm font-medium transition-smooth ${
                        size === s
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary/30 hover:border-primary/50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Jumlah */}
            <div className="py-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-2.5">
                Jumlah{" "}
                <span className="text-foreground font-medium">
                  {quantity} unit
                </span>
              </p>
              <div className="inline-flex items-center rounded-sm border border-border overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Kurangi jumlah"
                  className="h-10 w-10 flex items-center justify-center bg-secondary/40 hover:bg-secondary/70 transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[3rem] px-3 text-center text-sm font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))
                  }
                  disabled={quantity >= MAX_QUANTITY}
                  aria-label="Tambah jumlah"
                  className="h-10 w-10 flex items-center justify-center bg-secondary/40 hover:bg-secondary/70 transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {quantity > 1 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Total estimasi:{" "}
                  <span className="text-primary font-semibold">
                    {formatRupiah(product.price * quantity)}
                  </span>
                </p>
              )}
            </div>

            {/* Tombol aksi — desktop */}
            <div className="hidden md:block mt-5 space-y-3">
              {!showForm ? (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="btn-buy flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-md text-sm sm:text-base shadow-glow"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Beli Sekarang
                  </button>
                </div>
              ) : (
                orderForm
              )}
            </div>
          </div>
        </div>

        {/* —— Deskripsi di bawah (full width) —— */}
        <div className="mt-8 sm:mt-10 animate-fade-up">
          <div className="rounded-lg border border-border bg-gradient-card overflow-hidden">
            <div className="px-4 py-3 bg-secondary/60 border-b border-border flex items-center gap-6 text-sm font-semibold">
              <span className="text-primary border-b-2 border-primary pb-2 -mb-[1px]">
                Deskripsi Produk
              </span>
            </div>
            <div className="p-4 sm:p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specs.map((row, i) => (
                      <tr
                        key={row.label}
                        className={i % 2 === 0 ? "bg-background/20" : ""}
                      >
                        <td className="px-3 sm:px-4 py-2.5 font-medium text-muted-foreground align-top w-[38%] sm:w-[32%] border-b border-border/40">
                          {row.label}
                        </td>
                        <td className="px-3 sm:px-4 py-2.5 font-semibold align-top border-b border-border/40 leading-relaxed">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex gap-3 p-3 rounded-lg border border-border bg-background/30">
                  <Truck className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-sm">
                      Pengantaran Sepulau Lombok
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      COD ke seluruh Pulau Lombok
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 rounded-lg border border-border bg-background/30">
                  <Wallet className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Bayar di Tempat (COD)</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Aman, praktis dan bayar saat barang sampai di rumahmu
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: tombol beli menempel bawah */}
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 flex gap-2 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-border bg-background/95 backdrop-blur-md">
          {!showForm ? (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="btn-buy flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-md text-base shadow-glow"
            >
              <ShoppingCart className="h-5 w-5" />
              Beli Sekarang
            </button>
          ) : (
            <button
              type="submit"
              form="buyer-order-form"
              disabled={submitting}
              className="btn-buy flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-md text-base shadow-glow"
            >
              {submitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <WhatsAppIcon className="h-5 w-5" />
              )}
              {submitting ? "Mengirim..." : "Kirim Pesanan via WhatsApp"}
            </button>
          )}
        </div>

        {showForm && (
          <div
            className="md:hidden mt-6 rounded-lg border border-border bg-gradient-card p-4"
            style={{ paddingBottom: 88 }}
          >
            {orderForm}
          </div>
        )}
      </section>
    </PageLayout>
  );
};

export default ProductDetail;
