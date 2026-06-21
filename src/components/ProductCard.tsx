import { Product, formatRupiah } from "@/data/products";
import { Link } from "react-router-dom";
import { ShoppingBag, ShoppingCart, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { addToCart } = useCart();
  const defaultVariant = product.variants[0];
  const defaultSize = product.sizes[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!defaultVariant) return;

    addToCart({
      productId: product.id,
      variantId: defaultVariant.id,
      size: defaultSize,
      quantity: 1,
    });

    toast.success("Ditambahkan ke keranjang", {
      description: product.name,
      action: {
        label: "Lihat",
        onClick: () => {
          window.location.href = "/keranjang";
        },
      },
    });
  };

  return (
    <article
      className="group relative rounded-2xl overflow-hidden bg-gradient-card border border-border shadow-card transition-smooth hover:-translate-y-2 hover:shadow-glow animate-fade-up flex flex-col h-full"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link to={`/produk/${product.id}`} className="flex flex-col flex-1">
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

        <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-1">
          <p className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-muted-foreground mb-1.5 sm:mb-2 truncate">{product.tagline}</p>
          <h3 className="font-display text-sm sm:text-base lg:text-lg font-bold leading-tight mb-2 line-clamp-2 min-h-[2.25rem] sm:min-h-[2.5rem]">{product.name}</h3>
          <p className="text-base sm:text-xl lg:text-2xl font-black text-gradient mb-3 sm:mb-4">{formatRupiah(product.price)}</p>
        </div>
      </Link>

      <div className="px-3 sm:px-4 lg:px-5 pb-3 sm:pb-4 lg:pb-5 mt-auto space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center gap-1 sm:gap-1.5 h-10 sm:h-11 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold border border-primary/40 text-primary bg-primary/10 hover:bg-primary/20 transition-smooth"
          >
            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            Keranjang
          </button>
          <Link
            to={`/produk/${product.id}`}
            className="btn-buy flex items-center justify-center gap-1 sm:gap-1.5 h-10 sm:h-11 rounded-lg sm:rounded-xl text-[10px] sm:text-xs"
          >
            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" /> Beli
          </Link>
        </div>

        <p className="flex items-center justify-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] lg:text-[11px] font-semibold text-primary tracking-wide text-center">
          <Truck className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
          <span className="truncate">PENGANTARAN SEPULAU LOMBOK</span>
        </p>
      </div>
    </article>
  );
};

export default ProductCard;
