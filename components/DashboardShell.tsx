"use client";

import type { CSSProperties, ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useDashboardState } from "./DashboardState";
import styles from "@/app/dashboard/layout.module.css";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const { sidebarCollapsed } = useDashboardState();

  const shellStyle = {
    "--sidebar-width": sidebarCollapsed ? "84px" : "240px",
  } as CSSProperties;

  return (
    <div className={styles.shell} style={shellStyle}>
      <Sidebar />
      <TopBar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
