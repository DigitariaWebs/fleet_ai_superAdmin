"use client";

import Badge from "@/components/Badge";
import StatTable from "@/components/StatTable";
import { useDashboardState } from "@/components/DashboardState";
import { repartitionRoles, utilisateurs } from "@/lib/mockData";
import styles from "./utilisateurs.module.css";

const totalRoles = repartitionRoles.reduce((sum, item) => sum + item.valeur, 0);
let cumulative = 0;
const roleSegments = repartitionRoles.map((item) => {
  const value = (item.valeur / totalRoles) * 100;
  const segment = `${item.couleur} ${cumulative}% ${cumulative + value}%`;
  cumulative += value;
  return segment;
});

export default function UtilisateursPage() {
  const { loi25ShieldActive } = useDashboardState();

  return (
    <div className={styles.page}>
      <section className={styles.topGrid}>
        <article className={styles.chartCard}>
          <h3>Répartition par rôle</h3>
          <div
            className={styles.donut}
            style={{ background: `conic-gradient(${roleSegments.join(", ")})` }}
          />
          <div className={styles.legend}>
            {repartitionRoles.map((item) => (
              <p key={item.role}>
                <i style={{ background: item.couleur }} />
                {item.role} · {item.valeur}%
              </p>
            ))}
          </div>
        </article>
        <div className={styles.roleCards}>
          {repartitionRoles.map((role) => (
            <article key={role.role}>
              <h4>{role.role}</h4>
              <p>{Math.round((utilisateurs.length * role.valeur) / 100)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.filters}>
        <input type="search" placeholder="Rechercher un utilisateur..." />
        <select defaultValue="all">
          <option value="all">Rôle</option>
          <option>Admin Agence</option>
          <option>Agent</option>
          <option>Chauffeur</option>
          <option>Secrétaire</option>
        </select>
        <select defaultValue="all">
          <option value="all">Agence</option>
          <option>Agence Atlas Montréal</option>
          <option>FleetPro Québec</option>
          <option>AutoElite Laval</option>
        </select>
        <select defaultValue="all">
          <option value="all">Statut</option>
          <option>Actif</option>
          <option>En cours</option>
          <option>Suspendu</option>
        </select>
        <select defaultValue="all">
          <option value="all">Consentement Loi 25</option>
          <option>Enregistré</option>
          <option>Non enregistré</option>
        </select>
      </section>

      <StatTable
        headers={[
          "Nom complet",
          "Rôle",
          "Agence",
          "Dernière connexion",
          "Statut",
          "Consentement enregistré",
          "Actions",
        ]}
        rows={utilisateurs.map((user) => ({
          id: user.id,
          cells: [
            <span
              key={`${user.id}-nom`}
              className={`${styles.nom} ${loi25ShieldActive ? styles.nomMasque : ""}`}
            >
              {loi25ShieldActive ? "● ● ●" : user.nomComplet}
            </span>,
            <span key={`${user.id}-role`} className={styles.rolePill}>
              {user.role}
            </span>,
            user.agence,
            user.derniereConnexion,
            <Badge key={`${user.id}-statut`} statut={user.statut} />,
            user.consentementEnregistre ? "Oui" : "Non",
            "⋯",
          ],
        }))}
      />
    </div>
  );
}
