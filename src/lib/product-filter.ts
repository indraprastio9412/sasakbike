import {
  products,
  PRODUCT_CATEGORIES,
  type Product,
  type ProductCategoryId,
} from "@/data/products";

const categoryLabelMap = Object.fromEntries(
  PRODUCT_CATEGORIES.filter((c) => c.id !== "semua").map((c) => [c.id, c.label.toLowerCase()]),
) as Record<ProductCategoryId, string>;

/** Normalisasi teks pencarian: lowercase, hapus tanda baca berlebih */
export function normalizeSearchQuery(query: string): string {
  return query
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s\u00C0-\u024F]/g, "");
}

/** Kata kunci yang dapat dicari dari satu produk */
export function getProductSearchText(product: Product): string {
  const categoryLabels = product.categories
    .map((c) => categoryLabelMap[c] ?? c)
    .join(" ");

  const specText = product.specs.map((s) => `${s.label} ${s.value}`).join(" ");

  return normalizeSearchQuery(
    [
      product.name,
      product.tagline,
      categoryLabels,
      specText,
      ...(product.searchKeywords ?? []),
    ].join(" "),
  );
}

/** Cocokkan query dengan produk (semua kata harus ada) */
export function productMatchesQuery(product: Product, rawQuery: string): boolean {
  const query = normalizeSearchQuery(rawQuery);
  if (!query) return true;

  const searchText = getProductSearchText(product);
  const tokens = query.split(" ").filter(Boolean);

  return tokens.every((token) => searchText.includes(token));
}

export function filterProductsByCategory(
  list: Product[],
  category: ProductCategoryId,
): Product[] {
  if (category === "semua") return list;
  return list.filter((p) => p.categories.includes(category));
}

export function filterProducts(
  rawQuery: string,
  category: ProductCategoryId = "semua",
  source: Product[] = products,
): Product[] {
  const byCategory = filterProductsByCategory(source, category);
  if (!normalizeSearchQuery(rawQuery)) return byCategory;
  return byCategory.filter((p) => productMatchesQuery(p, rawQuery));
}
