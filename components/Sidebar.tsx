"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Icon from "./Icon";
import { useDashboardState } from "./DashboardState";
import styles from "./Sidebar.module.css";

const navItems = [
  { label: "Vue d'ensemble", href: "/dashboard", icon: "home" as const },
  { label: "Agences", href: "/dashboard/agences", icon: "building" as const },
  { label: "Utilisateurs", href: "/dashboard/utilisateurs", icon: "users" as const },
  { label: "Transactions", href: "/dashboard/transactions", icon: "card" as const },
  { label: "API Monitor", href: "/dashboard/api-monitor", icon: "plug" as const },
  { label: "Conformité RGPD", href: "/dashboard/conformite", icon: "shield" as const },
  { label: "Paramètres", href: "/dashboard/parametres", icon: "settings" as const },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { closeSidebar, openSidebar, sidebarCollapsed } = useDashboardState();

  const handleNavClick = () => {
    if (sidebarCollapsed) {
      openSidebar();
      return;
    }
    closeSidebar();
  };

  const handleLogout = () => {
    document.cookie = "fleetai_auth=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ""}`}>
      <div>
        <div className={styles.logoBlock}>
          <div className={styles.logoFrame}>
            <Image
              src="/logo.png"
              alt="FleetAI"
              fill
              sizes="(max-width: 767px) 58px, 156px"
              className={styles.logoImage}
              priority
            />
          </div>
          <p>Super Admin</p>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                title={item.label}
                onClick={handleNavClick}
              >
                <span className={styles.navGlyph}><Icon name={item.icon} size={16} /></span>
                {!sidebarCollapsed && <strong>{item.label}</strong>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className={styles.footer}>
        <div className={styles.avatar}>SA</div>
        {!sidebarCollapsed && <div className={styles.adminText}>
          <strong>Super Admin</strong>
          <span>Compte principal</span>
        </div>}
        <button type="button" className={styles.logout} aria-label="Déconnexion" onClick={handleLogout}>
          <span className={styles.logoutIcon}><Icon name="logout" size={16} /></span>
        </button>
      </div>
    </aside>
  );
}
