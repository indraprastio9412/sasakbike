import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import ProductPlaceholder from "@/components/ProductPlaceholder";
import SEO from "@/components/SEO";
import { products, EMPTY_PRODUCT_SLOTS } from "@/data/products";
import { absoluteUrl } from "@/lib/site-config";

const Products = () => (
  <PageLayout>
    <SEO
      title="Koleksi Sepeda Lengkap — Sasak Bike Lombok"
      description="Koleksi sepeda Sasak Bike: MTB, BMX, city bike, hingga sepeda anak. Beragam model & warna, harga merakyat, pengantaran COD ke seluruh Pulau Lombok."
      path="/produk"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: products.map((p, i) => ({
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
      description="Jelajahi koleksi sepeda terlengkap Sasak Bike — dari MTB tangguh, BMX kekinian, city bike praktis, hingga sepeda anak. Pilih model & warna favoritmu, pesan mudah, bayar COD saat barang sampai di rumah."
    />
    <section className="container py-14">
      <h2 className="sr-only">Daftar Koleksi Sepeda Sasak Bike</h2>
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 max-w-7xl mx-auto">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
        {Array.from({ length: EMPTY_PRODUCT_SLOTS }).map((_, i) => (
          <ProductPlaceholder key={`placeholder-${i}`} index={products.length + i} />
        ))}
      </div>
    </section>
  </PageLayout>
);

export default Products;
