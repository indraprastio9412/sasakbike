import { Product, formatRupiah } from "@/data/products";
import { Link } from "react-router-dom";
import { ShoppingBag, Truck } from "lucide-react";

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => (
  <Link
    to={`/produk/${product.id}`}
    className="group relative rounded-2xl overflow-hidden bg-gradient-card border border-border shadow-card transition-smooth hover:-translate-y-2 hover:shadow-glow animate-fade-up block"
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
      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-primary text-primary-foreground">
        BEST SELLER
      </span>
    </div>

    <div className="p-5 space-y-3">
      <p className="text-[10px] tracking-[0.3em] text-muted-foreground">{product.tagline}</p>
      <h3 className="font-display text-lg font-bold leading-tight">{product.name}</h3>
      <p className="text-2xl font-black text-gradient">{formatRupiah(product.price)}</p>

      <span
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-primary text-primary-foreground font-bold text-sm transition-smooth group-hover:bg-none group-hover:bg-orange-500 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] group-active:bg-orange-600"
      >
        <ShoppingBag className="h-4 w-4" /> Beli Sekarang
      </span>

      <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-primary tracking-wide">
        <Truck className="h-3.5 w-3.5" />
        MENDUKUNG PENGANTARAN SEPULAU LOMBOK
      </p>
    </div>
  </Link>
);

export default ProductCard;
