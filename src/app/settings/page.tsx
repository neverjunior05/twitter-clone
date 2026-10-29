"use client";
import AppLayout from "@/components/layout/app-layout";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="max-w-[640px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-extrabold tracking-tight">Settings</h1>
        <div className="mt-6 space-y-6">
          <SettingsSection title="Profile" items={["Edit profile", "Privacy settings", "Account protection"]} />
          <SettingsSection title="Appearance" items={["Theme (Light / Dim / Dark / Auto)", "Reduce motion", "Larger text", "High contrast"]} />
          <SettingsSection title="Notifications" items={["Pause notifications", "Per-type preferences", "Message requests"]} />
          <SettingsSection title="Safety" items={["Blocked accounts", "Muted words", "Report history"]} />
          <SettingsSection title="Data" items={["Data export", "Account deletion (with grace period)"]} />
        </div>
      </div>
    </AppLayout>
  );
}

function SettingsSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-hairline-dark/20 bg-surface-dark/30 p-5">
      <h2 className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted-dark mb-3">{title}</h2>
      <div className="space-y-2">
        {items.map((item) => (
          <a key={item} href="#" className="block rounded-xl px-3 py-2.5 text-sm text-text-dark hover:bg-elevated-dark/40 transition-colors">
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
