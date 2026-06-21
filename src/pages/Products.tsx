import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import ProductPlaceholder from "@/components/ProductPlaceholder";
import ProductSearchBar from "@/components/ProductSearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import SEO from "@/components/SEO";
import {
  EMPTY_PRODUCT_SLOTS,
  PRODUCT_CATEGORIES,
  type ProductCategoryId,
} from "@/data/products";
import { useProducts } from "@/lib/product-store";
import { filterProducts } from "@/lib/product-filter";
import { absoluteUrl } from "@/lib/site-config";
import { PackageSearch } from "lucide-react";

const isValidCategory = (value: string | null): value is ProductCategoryId =>
  PRODUCT_CATEGORIES.some((c) => c.id === value);

const Products = () => {
  const products = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("kategori");
  const activeCategory: ProductCategoryId = isValidCategory(categoryParam)
    ? categoryParam
    : "semua";

  const filteredProducts = useMemo(
    () => filterProducts(query, activeCategory, products),
    [query, activeCategory, products],
  );

  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<ProductCategoryId, number>> = {
      semua: filterProducts(query, "semua", products).length,
    };

    PRODUCT_CATEGORIES.filter((c) => c.id !== "semua").forEach((cat) => {
      counts[cat.id] = filterProducts(query, cat.id, products).length;
    });

    return counts;
  }, [query, products]);

  const updateParams = (nextQuery: string, nextCategory: ProductCategoryId) => {
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (nextCategory !== "semua") params.set("kategori", nextCategory);
    setSearchParams(params, { replace: true });
  };

  const handleSearchChange = (value: string) => {
    updateParams(value, activeCategory);
  };

  const handleCategoryChange = (nextCategory: ProductCategoryId) => {
    updateParams(query, nextCategory);
  };

  return (
    <PageLayout>
      <SEO
        title="Koleksi Sepeda Lengkap — Sasak Bike Lombok"
        description="Koleksi sepeda Sasak Bike: MTB, BMX, city bike, hingga sepeda anak. Cari & filter kategori, harga merakyat, pengantaran COD ke seluruh Pulau Lombok."
        path="/produk"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: filteredProducts.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/produk/${p.id}`),
            name: p.name,
          })),
        }}
      />
      <PageHeader
        eyebrow="KOLEKSI SASAK BIKE"
        title="Produk Sepeda"
        description="Cari sepeda favoritmu — ketik misalnya &quot;sepeda anak anak&quot;, atau pilih kategori. Simpan ke keranjang dulu, pesan kapan saja via WhatsApp."
      />

      <section className="container py-8 sm:py-10 space-y-6">
        <ProductSearchBar value={query} onChange={handleSearchChange} />

        <div>
          <p className="text-xs tracking-[0.25em] text-primary mb-3 font-semibold">
            KATEGORI PRODUK
          </p>
          <CategoryFilter
            active={activeCategory}
            onChange={handleCategoryChange}
            counts={categoryCounts}
          />
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap text-sm text-muted-foreground">
          <p>
            Menampilkan{" "}
            <span className="font-semibold text-foreground">{filteredProducts.length}</span>{" "}
            produk
            {query.trim() ? (
              <>
                {" "}
                untuk pencarian &quot;<span className="text-primary font-medium">{query}</span>&quot;
              </>
            ) : null}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-border bg-gradient-card p-10 sm:p-14 text-center">
            <PackageSearch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold mb-2">Produk tidak ditemukan</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Coba kata kunci lain seperti &quot;sepeda anak&quot;, &quot;bmx&quot;, atau
              &quot;dewasa&quot;. Atau pilih kategori &quot;Semua Produk&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 max-w-7xl mx-auto">
            {filteredProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
            {activeCategory === "semua" &&
              !query.trim() &&
              Array.from({ length: EMPTY_PRODUCT_SLOTS }).map((_, i) => (
                <ProductPlaceholder key={`placeholder-${i}`} index={filteredProducts.length + i} />
              ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
};

export default Products;
