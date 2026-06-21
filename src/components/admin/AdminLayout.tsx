import { type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bike, LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAdmin } from "@/lib/admin-auth";
import { toast } from "sonner";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    toast.success("Berhasil logout");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow shrink-0">
              <Bike className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold text-sm">SASAK BIKE</p>
              <p className="text-[11px] text-muted-foreground">Dashboard Admin</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-smooth px-3 py-2"
            >
              Lihat situs <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-1.5">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6 sm:py-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
