import { useEffect, useState } from "react";

const STORAGE_KEY = "sasakbike-orders";
const ORDERS_EVENT = "sasakbike-orders-updated";

export type OrderStatus = "baru" | "diproses" | "selesai" | "dibatalkan";

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  baru: "Baru",
  diproses: "Diproses",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan",
};

export type OrderItem = {
  productId: string;
  productName: string;
  variantLabel: string;
  size?: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type Order = {
  id: string;
  createdAt: string; // ISO date string
  buyerName: string;
  buyerPhone: string;
  fullAddress: string;
  mapsLink?: string | null;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  /** Dari halaman produk langsung, atau dari keranjang belanja */
  source: "produk" | "keranjang";
};

function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveOrders(orders: Order[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(ORDERS_EVENT));
}

/** Catat pesanan baru. Dipanggil saat pembeli klik kirim pesanan via WhatsApp. */
export function recordOrder(
  order: Omit<Order, "id" | "createdAt" | "status">,
): Order {
  const orders = loadOrders();
  const newOrder: Order = {
    ...order,
    id: `ORD-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "baru",
  };
  orders.unshift(newOrder);
  saveOrders(orders);
  return newOrder;
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  const orders = loadOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx >= 0) {
    orders[idx] = { ...orders[idx], status };
    saveOrders(orders);
  }
}

export function deleteOrder(id: string) {
  saveOrders(loadOrders().filter((o) => o.id !== id));
}

/** Hook React: daftar pesanan yang reaktif terhadap perubahan data */
export function useOrders(): Order[] {
  const [list, setList] = useState<Order[]>(() => loadOrders());

  useEffect(() => {
    const update = () => setList(loadOrders());
    window.addEventListener(ORDERS_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(ORDERS_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return list;
}
