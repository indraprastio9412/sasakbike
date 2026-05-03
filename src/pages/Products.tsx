import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Products = () => (
  <PageLayout>
    <PageHeader
      eyebrow="KOLEKSI SASAK BIKE"
      title="Produk Sepeda"
      description="Empat varian Mazara R633 — frame alloy ringan, suspensi depan, disc brake, dan 21 speed Shimano. Pilih warna yang paling mencerminkan dirimu."
    />
    <section className="container py-14">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
        {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  </PageLayout>
);

export default Products;
