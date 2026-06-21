import { useMemo, useState } from "react";
import { Eye, Trash2, ClipboardList, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { formatRupiahWa } from "@/lib/whatsapp-order";
import { buildWhatsAppUrl } from "@/lib/whatsapp-config";
import {
  useOrders,
  updateOrderStatus,
  deleteOrder,
  ORDER_STATUS_LABEL,
  type Order,
  type OrderStatus,
} from "@/lib/order-store";

const STATUS_BADGE_VARIANT: Record<OrderStatus, "default" | "secondary" | "outline" | "destructive"> = {
  baru: "default",
  diproses: "secondary",
  selesai: "outline",
  dibatalkan: "destructive",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const OrderManager = () => {
  const orders = useOrders();
  const [viewing, setViewing] = useState<Order | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);

  const summary = useMemo(() => {
    return {
      total: orders.length,
      baru: orders.filter((o) => o.status === "baru").length,
      diproses: orders.filter((o) => o.status === "diproses").length,
      selesai: orders.filter((o) => o.status === "selesai").length,
    };
  }, [orders]);

  const handleStatusChange = (order: Order, status: OrderStatus) => {
    updateOrderStatus(order.id, status);
    toast.success(`Status pesanan ${order.id} diubah ke "${ORDER_STATUS_LABEL[status]}"`);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteOrder(deleteTarget.id);
    toast.success("Pesanan dihapus");
    setDeleteTarget(null);
  };

  const chatBuyer = (order: Order) => {
    const message = `Halo ${order.buyerName}, terkait pesanan ${order.id} di Sasak Bike...`;
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display font-bold text-lg">Kelola Pesanan</h2>
        <p className="text-sm text-muted-foreground">
          Pesanan tercatat otomatis saat pembeli klik "Kirim Pesanan via WhatsApp"
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border border-border bg-gradient-card p-3 sm:p-4">
          <p className="text-xs text-muted-foreground">Total Pesanan</p>
          <p className="text-xl sm:text-2xl font-bold">{summary.total}</p>
        </div>
        <div className="rounded-lg border border-border bg-gradient-card p-3 sm:p-4">
          <p className="text-xs text-muted-foreground">Baru</p>
          <p className="text-xl sm:text-2xl font-bold text-primary">{summary.baru}</p>
        </div>
        <div className="rounded-lg border border-border bg-gradient-card p-3 sm:p-4">
          <p className="text-xs text-muted-foreground">Diproses</p>
          <p className="text-xl sm:text-2xl font-bold">{summary.diproses}</p>
        </div>
        <div className="rounded-lg border border-border bg-gradient-card p-3 sm:p-4">
          <p className="text-xs text-muted-foreground">Selesai</p>
          <p className="text-xl sm:text-2xl font-bold">{summary.selesai}</p>
        </div>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            <ClipboardList className="h-10 w-10 mx-auto mb-3 opacity-50" />
            Belum ada pesanan masuk.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Pembeli</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-xs whitespace-nowrap">
                      {formatDate(order.createdAt)}
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold">{order.buyerName}</p>
                      <p className="text-xs text-muted-foreground">{order.buyerPhone}</p>
                    </TableCell>
                    <TableCell className="text-sm">
                      {order.items.length === 1
                        ? order.items[0].productName
                        : `${order.items.length} produk`}
                    </TableCell>
                    <TableCell className="font-medium whitespace-nowrap">
                      {formatRupiahWa(order.total)}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(v) => handleStatusChange(order, v as OrderStatus)}
                      >
                        <SelectTrigger className="h-8 w-[120px] text-xs">
                          <SelectValue>
                            <Badge variant={STATUS_BADGE_VARIANT[order.status]} className="text-[10px]">
                              {ORDER_STATUS_LABEL[order.status]}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(ORDER_STATUS_LABEL).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => chatBuyer(order)}
                          aria-label="Chat WhatsApp pembeli"
                          className="text-primary hover:text-primary"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setViewing(order)}
                          aria-label="Lihat detail"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setDeleteTarget(order)}
                          className="text-destructive hover:text-destructive"
                          aria-label="Hapus pesanan"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Detail pesanan */}
      <Dialog open={Boolean(viewing)} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Pesanan {viewing?.id}</DialogTitle>
            <DialogDescription>
              {viewing && formatDate(viewing.createdAt)}
            </DialogDescription>
          </DialogHeader>

          {viewing && (
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Pembeli</p>
                <p className="font-medium">{viewing.buyerName}</p>
                <p className="text-muted-foreground">{viewing.buyerPhone}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Alamat</p>
                <p className="leading-relaxed">{viewing.fullAddress}</p>
                {viewing.mapsLink && (
                  <a
                    href={viewing.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-xs underline"
                  >
                    Lihat di Google Maps
                  </a>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Item Pesanan</p>
                <div className="space-y-2">
                  {viewing.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-start rounded-md border border-border p-2.5"
                    >
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.variantLabel}
                          {item.size ? ` • ${item.size} inch` : ""} • {item.quantity} unit
                        </p>
                      </div>
                      <p className="font-semibold whitespace-nowrap">
                        {formatRupiahWa(item.lineTotal)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-border font-bold">
                <span>Total</span>
                <span className="text-primary">{formatRupiahWa(viewing.total)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus pesanan ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Catatan pesanan {deleteTarget?.id} akan dihapus secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OrderManager;
