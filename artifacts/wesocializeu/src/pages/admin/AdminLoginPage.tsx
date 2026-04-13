import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <span className="text-2xl font-display font-extrabold text-[#1a202c]">
            WeSocialize<span className="text-primary">U</span>
          </span>
          <div className="text-[10px] text-[rgba(74,85,104,0.5)] uppercase tracking-[3px] mt-1 font-semibold">Admin Portal</div>
        </div>

        <div className="bg-white border border-t-[3px] border-t-primary border-black/[0.06] rounded-2xl shadow-[0px_24px_60px_0px_rgba(0,0,0,0.06)] p-8">
          <h1 className="text-xl font-display font-bold text-[#1a202c] mb-6">Sign In</h1>

          {error && (
            <div className="bg-destructive/5 border border-destructive/20 text-destructive text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-medium text-[#4a5568] mb-2">Username</label>
              <input
                type="text"
                required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#4a5568] mb-2">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={login.isPending}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl py-3.5 shadow-[0px_10px_15px_-3px_rgba(245,166,35,0.2)] transition-all mt-2 disabled:opacity-60"
            >
              {login.isPending ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p className="text-xs text-[rgba(74,85,104,0.4)] text-center mt-6">
            Default credentials: admin / admin123
          </p>
        </div>
      </motion.div>
    </div>
  );
}
