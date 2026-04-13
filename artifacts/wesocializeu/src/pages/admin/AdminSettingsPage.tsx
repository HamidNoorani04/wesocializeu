import { AdminLayout } from "@/components/layout/AdminLayout";
import { useGetAdminMe } from "@workspace/api-client-react";

export default function AdminSettingsPage() {
  const { data: session } = useGetAdminMe();

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Settings</h1>
        <p className="text-white/40 text-sm mb-8">Agency configuration and account settings</p>

        <div className="bg-card border border-white/10 p-6 mb-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Account</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <div className="text-white text-sm">Logged in as</div>
                <div className="text-white/40 text-xs">{session?.username ?? "—"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-white/10 p-6 mb-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Agency Info</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Agency Name</label>
              <input value="WeSocializeU" readOnly className="w-full bg-background border border-white/15 text-white/60 px-3 py-2 text-sm cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Contact Email</label>
              <input value="hello@wesocializeu.com" readOnly className="w-full bg-background border border-white/15 text-white/60 px-3 py-2 text-sm cursor-not-allowed" />
            </div>
          </div>
        </div>

        <div className="border border-white/10 bg-white/5 p-6 text-sm text-white/40">
          Settings management is available to agency administrators. Contact your system administrator to update agency configuration.
        </div>
      </div>
    </AdminLayout>
  );
}
