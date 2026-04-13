import { ReactNode } from "react";
import { useLocation } from "wouter";
import { useGetAdminMe } from "@workspace/api-client-react";

export function AdminGuard({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();
  const { data: session, isLoading } = useGetAdminMe();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white/40 text-sm uppercase tracking-widest">Loading...</div>
      </div>
    );
  }

  if (!session?.authenticated) {
    setLocation("/admin/login");
    return null;
  }

  return <>{children}</>;
}
