import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import KpiCard from "@/components/KpiCard";
import StatTable from "@/components/StatTable";
import { agences } from "@/lib/mockData";
import styles from "./agences.module.css";

export default function AgencesPage() {
  const suspendues = agences.filter((a) => a.statut === "Suspendu").length;

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
        <input type="search" placeholder="Rechercher une agence..." />
        <select defaultValue="all">
          <option value="all">Région</option>
          <option>Montréal</option>
          <option>Québec</option>
          <option>Laval</option>
        </select>
        <select defaultValue="all">
          <option value="all">Abonnement</option>
          <option>Standard</option>
          <option>Pro</option>
          <option>Entreprise</option>
        </select>
        <select defaultValue="all">
          <option value="all">Statut</option>
          <option>Actif</option>
          <option>En cours</option>
          <option>Suspendu</option>
        </select>
        <select defaultValue="all">
          <option value="all">Conformité</option>
          <option>Conforme</option>
          <option>En révision</option>
          <option>Infraction</option>
        </select>
      </section>

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
        rows={agences.map((agence) => ({
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
            <details key={`${agence.id}-actions`} className={styles.actionsMenu}>
              <summary>⋯</summary>
              <ul>
                <li>Voir détails</li>
                <li>Suspendre</li>
                <li>Contacter</li>
                <li>Exporter rapport</li>
              </ul>
            </details>,
          ],
        }))}
      />

      <footer className={styles.pagination}>
        <button type="button">Précédent</button>
        <p>Page 1 sur 4</p>
        <button type="button">Suivant</button>
      </footer>
    </div>
  );
}
