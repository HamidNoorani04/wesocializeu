import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAdminLogin } from "@workspace/api-client-react";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();
  const login = useAdminLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    login.mutate(form, {
      onSuccess: (data) => {
        if (data.success) {
          setLocation("/admin");
        } else {
          setError(data.message);
        }
      },
      onError: () => {
        setError("Invalid credentials. Please try again.");
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <span className="text-3xl font-display font-black text-white">
            WeSocialize<span className="text-primary">U</span>
          </span>
          <div className="text-xs text-white/40 uppercase tracking-widest mt-2">Admin Portal</div>
        </div>

        <div className="border border-white/10 bg-card p-8">
          <h1 className="text-2xl font-display font-bold text-white mb-6">Sign In</h1>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Username</label>
              <input
                type="text"
                required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full bg-background border border-white/15 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-white/20"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-background border border-white/15 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-white/20"
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              disabled={login.isPending}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-none py-5 uppercase tracking-widest font-bold text-sm"
            >
              {login.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-xs text-white/30 text-center mt-6">
            Default credentials: admin / admin123
          </p>
        </div>
      </motion.div>
    </div>
  );
}
