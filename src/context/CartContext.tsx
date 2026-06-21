import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type Product } from "@/data/products";
import { getAllProducts } from "@/lib/product-store";

const CART_STORAGE_KEY = "sasakbike-cart";

export type CartItem = {
  productId: string;
  variantId: string;
  size?: string;
  quantity: number;
};

export type CartLine = CartItem & {
  key: string;
  product: Product;
  variantLabel: string;
  variantImage: string;
  unitPrice: number;
  lineTotal: number;
};

type AddToCartInput = {
  productId: string;
  variantId: string;
  size?: string;
  quantity?: number;
};

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  totalItems: number;
  totalPrice: number;
  addToCart: (input: AddToCartInput) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string, variantId: string, size?: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function cartItemKey(productId: string, variantId: string, size?: string) {
  return `${productId}::${variantId}::${size ?? ""}`;
}

function loadCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.productId === "string" &&
        typeof item.variantId === "string" &&
        typeof item.quantity === "number" &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

function resolveCartLine(item: CartItem): CartLine | null {
  const product = getAllProducts().find((p) => p.id === item.productId);
  if (!product) return null;

  const variant = product.variants.find((v) => v.id === item.variantId);
  if (!variant) return null;

  const key = cartItemKey(item.productId, item.variantId, item.size);

  return {
    ...item,
    key,
    product,
    variantLabel: variant.label,
    variantImage: variant.image,
    unitPrice: product.price,
    lineTotal: product.price * item.quantity,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage());

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback(({ productId, variantId, size, quantity = 1 }: AddToCartInput) => {
    const product = getAllProducts().find((p) => p.id === productId);
    if (!product) return;

    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant) return;

    const normalizedQty = Math.min(99, Math.max(1, quantity));
    const key = cartItemKey(productId, variantId, size);

    setItems((prev) => {
      const existing = prev.find(
        (i) => cartItemKey(i.productId, i.variantId, i.size) === key,
      );

      if (existing) {
        return prev.map((i) =>
          cartItemKey(i.productId, i.variantId, i.size) === key
            ? { ...i, quantity: Math.min(99, i.quantity + normalizedQty) }
            : i,
        );
      }

      return [...prev, { productId, variantId, size, quantity: normalizedQty }];
    });
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setItems((prev) =>
      prev.filter((i) => cartItemKey(i.productId, i.variantId, i.size) !== key),
    );
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(key);
      return;
    }

    setItems((prev) =>
      prev.map((i) =>
        cartItemKey(i.productId, i.variantId, i.size) === key
          ? { ...i, quantity: Math.min(99, quantity) }
          : i,
      ),
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => setItems([]), []);

  const lines = useMemo(
    () =>
      items
        .map(resolveCartLine)
        .filter((line): line is CartLine => line !== null),
    [items],
  );

  const totalItems = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );

  const totalPrice = useMemo(
    () => lines.reduce((sum, line) => sum + line.lineTotal, 0),
    [lines],
  );

  const isInCart = useCallback(
    (productId: string, variantId: string, size?: string) =>
      items.some(
        (i) =>
          i.productId === productId &&
          i.variantId === variantId &&
          (i.size ?? "") === (size ?? ""),
      ),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      lines,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
    }),
    [
      items,
      lines,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus digunakan di dalam CartProvider");
  return ctx;
}
