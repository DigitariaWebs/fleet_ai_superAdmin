import type { ReactNode } from "react";
import { DashboardStateProvider } from "@/components/DashboardState";
import DashboardShell from "@/components/DashboardShell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardStateProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardStateProvider>
  );
}
