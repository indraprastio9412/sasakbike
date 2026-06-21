import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
  size?: "default" | "compact";
};

const ProductSearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Cari sepeda... misal: sepeda anak anak",
  className,
  size = "default",
}: ProductSearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative w-full", className)}>
      <Search
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none",
          size === "compact" ? "h-4 w-4" : "h-4 w-4 sm:h-5 sm:w-5",
        )}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Cari produk sepeda"
        className={cn(
          "w-full rounded-xl border border-border bg-secondary/30 text-foreground placeholder:text-muted-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary",
          size === "compact" ? "h-10 pl-9 pr-9 text-sm" : "h-11 sm:h-12 pl-10 pr-10 text-sm sm:text-base",
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Hapus pencarian"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-smooth"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
};

export default ProductSearchBar;
