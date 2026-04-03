"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type DashboardStateValue = {
  loi25ShieldActive: boolean;
  toggleLoi25Shield: () => void;
  sidebarCollapsed: boolean;
  toggleSidebarCollapsed: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
};

const DashboardStateContext = createContext<DashboardStateValue | null>(null);

export function DashboardStateProvider({ children }: { children: ReactNode }) {
  const [loi25ShieldActive, setLoi25ShieldActive] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("fleetai_loi25_shield");
    if (stored === "1") {
      setLoi25ShieldActive(true);
    }

    const sidebarStored = window.localStorage.getItem("fleetai_sidebar_collapsed");
    if (sidebarStored === "1") {
      setSidebarCollapsed(true);
    }
  }, []);

  const toggleLoi25Shield = useCallback(() => {
    setLoi25ShieldActive((previous) => {
      const next = !previous;
      window.localStorage.setItem("fleetai_loi25_shield", next ? "1" : "0");
      return next;
    });
  }, []);

  const toggleSidebarCollapsed = useCallback(() => {
    setSidebarCollapsed((previous) => {
      const next = !previous;
      window.localStorage.setItem("fleetai_sidebar_collapsed", next ? "1" : "0");
      return next;
    });
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarCollapsed(true);
    window.localStorage.setItem("fleetai_sidebar_collapsed", "1");
  }, []);

  const openSidebar = useCallback(() => {
    setSidebarCollapsed(false);
    window.localStorage.setItem("fleetai_sidebar_collapsed", "0");
  }, []);

  const value = useMemo(
    () => ({
      loi25ShieldActive,
      toggleLoi25Shield,
      sidebarCollapsed,
      toggleSidebarCollapsed,
      closeSidebar,
      openSidebar,
    }),
    [loi25ShieldActive, toggleLoi25Shield, sidebarCollapsed, toggleSidebarCollapsed, closeSidebar, openSidebar],
  );

  return (
    <DashboardStateContext.Provider value={value}>
      {children}
    </DashboardStateContext.Provider>
  );
}

export function useDashboardState() {
  const context = useContext(DashboardStateContext);
  if (!context) {
    throw new Error("useDashboardState doit être utilisé dans DashboardStateProvider");
  }
  return context;
}
