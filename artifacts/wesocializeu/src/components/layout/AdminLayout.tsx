import { Link, useLocation } from "wouter";
import { ReactNode } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  FolderKanban
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminLogout } from "@workspace/api-client-react";

export function AdminLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const logout = useAdminLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        setLocation("/admin/login");
      }
    });
  };

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/services", icon: Briefcase, label: "Services" },
    { href: "/admin/creators", icon: Users, label: "Creators" },
    { href: "/admin/case-studies", icon: FolderKanban, label: "Case Studies" },
    { href: "/admin/blog", icon: FileText, label: "Blog" },
    { href: "/admin/enquiries", icon: MessageSquare, label: "Enquiries" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-black/[0.06] bg-white hidden md:flex flex-col h-screen sticky top-0 shadow-sm">
        <div className="p-6 border-b border-black/[0.06]">
          <Link href="/" className="inline-block">
            <span className="text-xl font-display font-extrabold tracking-tight text-[#1a202c]">
              WeSocialize<span className="text-primary">U</span>
            </span>
          </Link>
          <div className="text-[10px] text-[rgba(74,85,104,0.5)] uppercase tracking-[3px] mt-1 font-semibold">Admin Panel</div>
        </div>

        <nav className="flex-1 py-6 px-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.href || (location.startsWith(item.href + "/") && item.href !== "/admin") || (location === item.href && item.href === "/admin");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                  isActive
                    ? "bg-[rgba(245,166,35,0.08)] text-primary font-semibold border border-[rgba(245,166,35,0.15)]"
                    : "text-[#4a5568] hover:text-[#1a202c] hover:bg-[#f8f9fa] border border-transparent"
                }`}
              >
                <item.icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/[0.06]">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-xl text-[#4a5568] hover:text-[#1a202c] hover:bg-[#f8f9fa] text-sm"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-black/[0.06] bg-white flex items-center justify-between px-4 sticky top-0 z-10">
          <span className="font-display font-bold text-lg text-[#1a202c]">Admin</span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-[#4a5568]">
            <LogOut size={16} />
          </Button>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
