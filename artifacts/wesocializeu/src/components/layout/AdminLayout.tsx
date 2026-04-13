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
    <div className="min-h-screen bg-background flex text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-card hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="inline-block">
            <span className="text-xl font-display font-bold tracking-tighter text-white">
              WeSocialize<span className="text-primary">U</span>
            </span>
          </Link>
          <div className="text-xs text-white/50 uppercase tracking-widest mt-1 font-semibold">Admin Panel</div>
        </div>

        <nav className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.href || (location.startsWith(item.href) && item.href !== "/admin");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-none text-sm transition-all ${
                  isActive 
                    ? "bg-primary/10 text-primary border-l-2 border-primary font-medium" 
                    : "text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 rounded-none text-white/70 hover:text-white border-white/10"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-white/10 bg-card flex items-center justify-between px-4 sticky top-0 z-10">
          <span className="font-display font-bold text-lg">Admin</span>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
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
