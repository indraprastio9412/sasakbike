import { Package } from "lucide-react";

const ProductPlaceholder = ({ index = 0 }: { index?: number }) => (
  <div
    className="relative rounded-2xl overflow-hidden bg-gradient-card border border-dashed border-border/60 animate-fade-up flex flex-col h-full opacity-60"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="relative aspect-square overflow-hidden bg-secondary/20 flex items-center justify-center">
      <Package className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground/40" />
    </div>
    <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-1 items-center justify-center text-center">
      <p className="text-[9px] sm:text-[10px] tracking-[0.25em] text-muted-foreground mb-2">KOLEKSI BARU</p>
      <h3 className="font-display text-sm sm:text-base font-bold text-muted-foreground mb-1">Segera Hadir</h3>
      <p className="text-[10px] sm:text-xs text-muted-foreground/70">Produk akan segera ditambahkan</p>
    </div>
  </div>
);

export default ProductPlaceholder;
