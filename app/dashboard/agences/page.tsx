"use client";

import { useMemo, useState } from "react";
import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import KpiCard from "@/components/KpiCard";
import StatTable from "@/components/StatTable";
import { agences } from "@/lib/mockData";
import styles from "./agences.module.css";

export default function AgencesPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [abonnement, setAbonnement] = useState("all");
  const [statut, setStatut] = useState("all");
  const [conformite, setConformite] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const suspendues = agences.filter((a) => a.statut === "Suspendu").length;

  const regions = useMemo(() => Array.from(new Set(agences.map((a) => a.region))), []);

  const filteredAgences = useMemo(() => {
    return agences.filter((agence) => {
      if (region !== "all" && agence.region !== region) return false;
      if (abonnement !== "all" && agence.abonnement !== abonnement) return false;
      if (statut !== "all" && agence.statut !== statut) return false;
      if (conformite !== "all" && agence.conformiteLoi25 !== conformite) return false;

      if (!query.trim()) return true;

      const text = `${agence.nom} ${agence.proprietaire}`.toLowerCase();
      return text.includes(query.toLowerCase());
    });
  }, [query, region, abonnement, statut, conformite]);

  const pageCount = Math.max(1, Math.ceil(filteredAgences.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const paginatedAgences = filteredAgences.slice((safePage - 1) * pageSize, safePage * pageSize);
  const selectedAgence = agences.find((a) => a.id === selectedId) ?? null;

  return (
    <div className={styles.page}>
      <section className={styles.kpiGrid}>
        <KpiCard titre="Total agences" valeur={agences.length} tendance="+6.4%" detail="Global" icone={<Icon name="building" />} />
        <KpiCard
          titre="Actives ce mois"
          valeur={agences.filter((a) => a.statut === "Actif").length}
          tendance="+3.1%"
          detail="Sur 30 jours"
          icone={<Icon name="check" />}
        />
        <KpiCard titre="Nouvelles (30j)" valeur={12} tendance="+2.7%" detail="Croissance" icone={<Icon name="plus" />} />
        <KpiCard titre="Suspendues" valeur={suspendues} tendance="-0.8%" detail="À traiter" icone={<Icon name="ban" />} danger />
      </section>

      <section className={styles.filters}>
        <input
          type="search"
          placeholder="Rechercher une agence..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
        />
        <select value={region} onChange={(event) => { setRegion(event.target.value); setPage(1); }}>
          <option value="all">Région</option>
          {regions.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select value={abonnement} onChange={(event) => { setAbonnement(event.target.value); setPage(1); }}>
          <option value="all">Abonnement</option>
          <option value="Standard">Standard</option>
          <option value="Pro">Pro</option>
          <option value="Entreprise">Entreprise</option>
        </select>
        <select value={statut} onChange={(event) => { setStatut(event.target.value); setPage(1); }}>
          <option value="all">Statut</option>
          <option value="Actif">Actif</option>
          <option value="En cours">En cours</option>
          <option value="Attention">Attention</option>
          <option value="Suspendu">Suspendu</option>
        </select>
        <select value={conformite} onChange={(event) => { setConformite(event.target.value); setPage(1); }}>
          <option value="all">Conformité</option>
          <option value="Conforme">Conforme</option>
          <option value="En révision">En révision</option>
          <option value="Infraction">Infraction</option>
        </select>
      </section>

      {selectedAgence && (
        <section className={styles.detailsPanel}>
          <img src={selectedAgence.imageUrl} alt={selectedAgence.nom} className={styles.detailsImage} />
          <div>
            <h3>{selectedAgence.nom}</h3>
            <p>Propriétaire: {selectedAgence.proprietaire}</p>
            <p>Région: {selectedAgence.region} · Abonnement: {selectedAgence.abonnement}</p>
            <p>
              {selectedAgence.employes} employés · {selectedAgence.locationsActives} locations actives · {selectedAgence.transactionsTotal.toLocaleString("fr-CA")} transactions
            </p>
          </div>
        </section>
      )}

      <StatTable
        headers={[
          "Image",
          "Nom agence",
          "Propriétaire",
          "Abonnement",
          "Employés",
          "Locations en cours",
          "Total transactions",
          "Dernière activité",
          "Conformité Loi 25",
          "Actions",
        ]}
        rows={paginatedAgences.map((agence) => ({
          id: agence.id,
          cells: [
            <img
              key={`${agence.id}-img`}
              src={agence.imageUrl}
              alt={`Agence ${agence.nom}`}
              className={styles.agenceImage}
              loading="lazy"
            />,
            agence.nom,
            agence.proprietaire,
            agence.abonnement,
            agence.employes,
            agence.locationsActives,
            agence.transactionsTotal.toLocaleString("fr-CA"),
            agence.derniereActivite,
            <Badge key={`${agence.id}-conf`} statut={agence.conformiteLoi25} />,
            <div key={`${agence.id}-actions`} className={styles.actionsCell}>
              <button type="button" onClick={() => setSelectedId(agence.id)}>Voir détails</button>
              <button type="button">Contacter</button>
            </div>,
          ],
        }))}
      />

      <footer className={styles.pagination}>
        <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))}>Précédent</button>
        <p>Page {safePage} sur {pageCount}</p>
        <button type="button" onClick={() => setPage((p) => Math.min(pageCount, p + 1))}>Suivant</button>
      </footer>
    </div>
  );
}
