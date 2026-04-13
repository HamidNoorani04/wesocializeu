import { AdminLayout } from "@/components/layout/AdminLayout";
import { useGetAdminMe } from "@workspace/api-client-react";

export default function AdminSettingsPage() {
  const { data: session } = useGetAdminMe();

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-display font-bold text-[#1a202c] mb-1">Settings</h1>
        <p className="text-[#4a5568] text-sm mb-8">Agency configuration and account settings</p>

        <div className="bg-white border border-black/[0.06] rounded-2xl shadow-sm p-6 mb-5">
          <h2 className="text-xs font-semibold text-[#4a5568] uppercase tracking-widest mb-5">Account</h2>
          <div className="flex items-center justify-between py-3 border-b border-black/[0.05]">
            <div>
              <div className="text-[#1a202c] text-sm font-medium">Logged in as</div>
              <div className="text-[rgba(74,85,104,0.5)] text-xs mt-0.5">{session?.username ?? "—"}</div>
            </div>
            <span className="text-[10px] bg-[rgba(245,166,35,0.1)] text-primary border border-[rgba(245,166,35,0.15)] px-2 py-1 font-semibold uppercase tracking-wider rounded-lg">Admin</span>
          </div>
        </div>

        <div className="bg-white border border-black/[0.06] rounded-2xl shadow-sm p-6 mb-5">
          <h2 className="text-xs font-semibold text-[#4a5568] uppercase tracking-widest mb-5">Agency Info</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-[#4a5568] mb-1">Agency Name</label>
              <input value="WeSocializeU" readOnly className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-3 py-2 text-sm text-[rgba(74,85,104,0.6)] cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#4a5568] mb-1">Contact Email</label>
              <input value="hello@wesocializeu.com" readOnly className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-3 py-2 text-sm text-[rgba(74,85,104,0.6)] cursor-not-allowed" />
            </div>
          </div>
        </div>

        <div className="bg-[#f8f9fa] border border-black/[0.06] rounded-2xl p-5">
          <p className="text-sm text-[rgba(74,85,104,0.6)]">
            Settings management is available to agency administrators. Contact your system administrator to update agency configuration.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
