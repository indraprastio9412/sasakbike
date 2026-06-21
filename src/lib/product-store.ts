import { useEffect, useState } from "react";
import {
  products as staticProducts,
  type Product,
  type ProductCategoryId,
} from "@/data/products";

const STORAGE_KEY = "sasakbike-admin-products";
const PRODUCTS_EVENT = "sasakbike-products-updated";

type ProductStoreData = {
  /** Override (hasil edit admin) untuk produk bawaan, dikunci oleh id produk */
  overrides: Record<string, Product>;
  /** Produk baru yang ditambahkan admin */
  added: Product[];
  /** Id produk bawaan yang dihapus admin (disembunyikan, bukan dihapus dari kode) */
  deletedIds: string[];
};

const emptyStore: ProductStoreData = {
  overrides: {},
  added: [],
  deletedIds: [],
};

function loadStore(): ProductStoreData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...emptyStore };
    const parsed = JSON.parse(raw);
    return {
      overrides:
        parsed && typeof parsed.overrides === "object" && parsed.overrides
          ? parsed.overrides
          : {},
      added: Array.isArray(parsed?.added) ? parsed.added : [],
      deletedIds: Array.isArray(parsed?.deletedIds) ? parsed.deletedIds : [],
    };
  } catch {
    return { ...emptyStore };
  }
}

function saveStore(data: ProductStoreData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore (mis. kuota storage penuh)
  }
  window.dispatchEvent(new Event(PRODUCTS_EVENT));
}

export function isStaticProductId(id: string): boolean {
  return staticProducts.some((p) => p.id === id);
}

/** Ambil seluruh produk yang tampil di situs (statis + perubahan admin) */
export function getAllProducts(): Product[] {
  const store = loadStore();

  const base = staticProducts
    .filter((p) => !store.deletedIds.includes(p.id))
    .map((p) => store.overrides[p.id] ?? p);

  const added = store.added.filter((p) => !store.deletedIds.includes(p.id));

  return [...base, ...added];
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((p) => p.id === id);
}

/** Tambah produk baru (admin). Pastikan id unik sebelum memanggil ini. */
export function addProduct(product: Product) {
  const store = loadStore();
  store.added.push(product);
  saveStore(store);
}

/** Simpan perubahan pada produk (statis maupun yang ditambahkan admin) */
export function updateProduct(product: Product) {
  const store = loadStore();
  if (isStaticProductId(product.id)) {
    store.overrides[product.id] = product;
  } else {
    const idx = store.added.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      store.added[idx] = product;
    } else {
      // fallback: kalau ternyata tidak ditemukan, anggap produk baru
      store.added.push(product);
    }
  }
  saveStore(store);
}

/** Hapus produk dari tampilan situs */
export function deleteProduct(id: string) {
  const store = loadStore();
  if (isStaticProductId(id)) {
    if (!store.deletedIds.includes(id)) store.deletedIds.push(id);
    delete store.overrides[id];
  } else {
    store.added = store.added.filter((p) => p.id !== id);
  }
  saveStore(store);
}

/** Buat slug id unik dari nama produk, contoh: "Sepeda BMX Pro" -> "sepeda-bmx-pro" */
export function generateProductId(name: string): string {
  const base =
    name
      .toLowerCase()
      .trim()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-+|-+$)/g, "") || "produk";

  const existingIds = new Set(getAllProducts().map((p) => p.id));
  if (!existingIds.has(base)) return base;

  let i = 2;
  while (existingIds.has(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

/** Hook React: daftar produk yang reaktif terhadap perubahan admin */
export function useProducts(): Product[] {
  const [list, setList] = useState<Product[]>(() => getAllProducts());

  useEffect(() => {
    const update = () => setList(getAllProducts());
    window.addEventListener(PRODUCTS_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(PRODUCTS_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return list;
}

export type { Product, ProductCategoryId };
