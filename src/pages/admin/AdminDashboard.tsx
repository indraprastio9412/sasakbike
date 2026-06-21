import { Package, ClipboardList } from "lucide-react";
import SEO from "@/components/SEO";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductManager from "@/components/admin/ProductManager";
import OrderManager from "@/components/admin/OrderManager";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <SEO
        title="Dashboard Admin — Sasak Bike"
        description="Dashboard internal admin Sasak Bike."
        path="/admin/dashboard"
      />

      <div className="mb-6">
        <h1 className="font-display text-2xl font-black">Dashboard Admin</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola produk dan pesanan toko Sasak Bike di sini.
        </p>
      </div>

      <Tabs defaultValue="produk" className="space-y-5">
        <TabsList>
          <TabsTrigger value="produk" className="gap-1.5">
            <Package className="h-4 w-4" />
            Produk
          </TabsTrigger>
          <TabsTrigger value="pesanan" className="gap-1.5">
            <ClipboardList className="h-4 w-4" />
            Pesanan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="produk">
          <ProductManager />
        </TabsContent>

        <TabsContent value="pesanan">
          <OrderManager />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDashboard;
