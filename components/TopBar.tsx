"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./TopBar.module.css";
import { useDashboardState } from "./DashboardState";
import Icon from "./Icon";

const titleMap: Record<string, string> = {
  "/dashboard": "Vue d'ensemble",
  "/dashboard/agences": "Gestion des agences",
  "/dashboard/utilisateurs": "Utilisateurs",
  "/dashboard/transactions": "Transactions",
  "/dashboard/api-monitor": "API Monitor",
  "/dashboard/conformite": "Conformité RGPD",
  "/dashboard/parametres": "Paramètres",
};

export default function TopBar() {
  const pathname = usePathname();
  const { loi25ShieldActive, toggleLoi25Shield } = useDashboardState();
  const [timeOnly, setTimeOnly] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTimeOnly(
        new Intl.DateTimeFormat("fr-CA", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentTitle = useMemo(
    () => titleMap[pathname] ?? "Super Admin Dashboard",
    [pathname],
  );

  return (
    <header className={styles.topbar}>
      <h2>{currentTitle}</h2>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.shield} ${loi25ShieldActive ? styles.shieldActive : ""}`}
          onClick={toggleLoi25Shield}
          title="Masquer les données personnelles"
        >
          <span className={styles.btnIcon}><Icon name="shield" size={16} /></span>
          RGPD
        </button>
        <time>{timeOnly}</time>
      </div>
    </header>
  );
}
