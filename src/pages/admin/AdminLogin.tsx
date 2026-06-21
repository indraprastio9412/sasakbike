import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Lock, User, Loader2, Bike } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAdmin, isAdminLoggedIn } from "@/lib/admin-auth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAdminLoggedIn()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    // Sengaja diberi sedikit delay agar terasa seperti proses verifikasi.
    window.setTimeout(() => {
      const ok = loginAdmin(username, password);
      if (ok) {
        toast.success("Login berhasil, selamat datang!");
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("Username atau password salah.");
        setSubmitting(false);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <SEO
        title="Login Admin — Sasak Bike"
        description="Halaman login khusus admin Sasak Bike."
        path="/admin/login"
      />

      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow mb-3">
            <Bike className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="font-display text-xl font-black">SASAK BIKE</h1>
          <p className="text-sm text-muted-foreground">Panel Admin</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-border bg-gradient-card p-6 space-y-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username admin"
                className="pl-9"
                autoFocus
                autoComplete="username"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password admin"
                className="pl-9"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Masuk"
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Halaman ini hanya untuk admin Sasak Bike.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
