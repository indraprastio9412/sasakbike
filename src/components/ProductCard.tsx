import { Product, formatRupiah } from "@/data/products";
import { Link } from "react-router-dom";
import { ShoppingBag, Truck } from "lucide-react";

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => (
  <Link
    to={`/produk/${product.id}`}
    className="group relative rounded-2xl overflow-hidden bg-gradient-card border border-border shadow-card transition-smooth hover:-translate-y-2 hover:shadow-glow animate-fade-up flex flex-col h-full"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="relative aspect-square overflow-hidden bg-black">
      <div
        className="absolute inset-0 opacity-60 transition-smooth group-hover:opacity-90"
        style={{ background: `radial-gradient(circle at center, ${product.color}33, transparent 70%)` }}
      />
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="relative h-full w-full object-cover transition-smooth group-hover:scale-110"
      />
      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest bg-primary text-primary-foreground">
        BEST SELLER
      </span>
    </div>

    <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-1">
      <p className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-muted-foreground mb-1.5 sm:mb-2 truncate">{product.tagline}</p>
      <h3 className="font-display text-sm sm:text-base lg:text-lg font-bold leading-tight mb-2 line-clamp-2 min-h-[2.25rem] sm:min-h-[2.5rem]">{product.name}</h3>
      <p className="text-base sm:text-xl lg:text-2xl font-black text-gradient mb-3 sm:mb-4">{formatRupiah(product.price)}</p>

      <span
        className="mt-auto flex items-center justify-center gap-1.5 sm:gap-2 w-full h-10 sm:h-11 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-primary text-primary-foreground font-bold text-[11px] sm:text-sm transition-smooth group-hover:bg-none group-hover:bg-orange-500 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] group-active:bg-orange-600"
      >
        <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" /> Beli Sekarang
      </span>

      <p className="flex items-center justify-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] lg:text-[11px] font-semibold text-primary tracking-wide mt-2 sm:mt-3 text-center">
        <Truck className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
        <span className="truncate">PENGANTARAN SEPULAU LOMBOK</span>
      </p>
    </div>
  </Link>
);

export default ProductCard;
