import { Product, formatRupiah } from "@/data/products";
import { Link } from "react-router-dom";
import { ShoppingBag, Truck } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp-config";
import { buildQuickOrderWhatsAppMessage } from "@/lib/whatsapp-order";

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const waUrl = buildWhatsAppUrl(
    buildQuickOrderWhatsAppMessage({
      productName: product.name,
      variantLabel: product.variants[0]?.label ?? product.name,
      unitPrice: product.price,
      quantity: 1,
      size: product.sizes[0],
    }),
  );

  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-gradient-card border border-border shadow-card transition-smooth hover:-translate-y-2 hover:shadow-glow animate-fade-up flex flex-col h-full"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link to={`/produk/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-black">
          <div
            className="absolute inset-0 opacity-60 transition-smooth group-hover:opacity-90"
            style={{ background: `radial-gradient(circle at center, ${product.color}33, transparent 70%)` }}
          />
          <img
            src={product.image}
            alt={`${product.name} — ${product.tagline}`}
            loading="lazy"
            className="relative h-full w-full object-cover transition-smooth group-hover:scale-110"
          />
          {product.variants.length > 1 && (
            <span className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest bg-secondary/90 text-foreground border border-border">
              {product.variants.length} WARNA
            </span>
          )}
        </div>

        <div className="p-3 sm:p-4 lg:p-5 pb-0 flex flex-col flex-1">
          <p className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-muted-foreground mb-1.5 sm:mb-2 truncate">{product.tagline}</p>
          <h3 className="font-display text-sm sm:text-base lg:text-lg font-bold leading-tight mb-2 line-clamp-2 min-h-[2.25rem] sm:min-h-[2.5rem]">{product.name}</h3>
          <p className="text-base sm:text-xl lg:text-2xl font-black text-gradient mb-3 sm:mb-4">{formatRupiah(product.price)}</p>
        </div>
      </Link>

      <div className="p-3 sm:p-4 lg:p-5 pt-0 mt-auto">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-buy flex items-center justify-center gap-1.5 sm:gap-2 w-full h-10 sm:h-11 lg:h-12 rounded-lg sm:rounded-xl text-[11px] sm:text-sm"
        >
          <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" /> Beli Sekarang
        </a>

        <p className="flex items-center justify-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] lg:text-[11px] font-semibold text-primary tracking-wide mt-2 sm:mt-3 text-center">
          <Truck className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
          <span className="truncate">PENGANTARAN SEPULAU LOMBOK</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
