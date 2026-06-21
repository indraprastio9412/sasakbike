import { PRODUCT_CATEGORIES, type ProductCategoryId } from "@/data/products";
import { cn } from "@/lib/utils";

type CategoryFilterProps = {
  active: ProductCategoryId;
  onChange: (category: ProductCategoryId) => void;
  counts?: Partial<Record<ProductCategoryId, number>>;
  className?: string;
};

const CategoryFilter = ({ active, onChange, counts, className }: CategoryFilterProps) => (
  <div className={cn("flex flex-wrap gap-2 sm:gap-3", className)}>
    {PRODUCT_CATEGORIES.map((cat) => {
      const isActive = active === cat.id;
      const count = counts?.[cat.id];

      return (
        <button
          key={cat.id}
          type="button"
          onClick={() => onChange(cat.id)}
          title={cat.description}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-smooth",
            isActive
              ? "bg-primary text-primary-foreground border-primary shadow-glow"
              : "bg-secondary/40 text-foreground/80 border-border hover:border-primary/50 hover:text-primary",
          )}
        >
          {cat.label}
          {count !== undefined && (
            <span
              className={cn(
                "min-w-[1.25rem] px-1.5 py-0.5 rounded-full text-[10px] font-bold tabular-nums",
                isActive ? "bg-primary-foreground/20" : "bg-background/60",
              )}
            >
              {count}
            </span>
          )}
        </button>
      );
    })}
  </div>
);

export default CategoryFilter;
