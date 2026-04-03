import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import KpiCard from "@/components/KpiCard";
import LiveFeed from "@/components/LiveFeed";
import StatTable from "@/components/StatTable";
import { transactions, kpis } from "@/lib/mockData";
import styles from "./transactions.module.css";

export default function TransactionsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.kpiGrid}>
        <KpiCard titre="Transactions aujourd'hui" valeur={kpis.transactions.aujourdHui} tendance="+9.4%" detail="Flux élevé" icone={<Icon name="card" />} />
        <KpiCard
          titre="Valeur totale"
          valeur={kpis.transactions.valeurTotale}
          suffixe=" $"
          tendance="+13.1%"
          detail="Volume CAD"
          icone={<Icon name="money" />}
        />
        <KpiCard titre="Signalées" valeur={kpis.transactions.signalees} tendance="+1.2%" detail="Surveillance" icone={<Icon name="alert" />} danger />
        <KpiCard titre="Dommages rapportés" valeur={kpis.transactions.dommages} tendance="-4.5%" detail="En baisse" icone={<Icon name="ban" />} />
      </section>

      <section className={styles.contentGrid}>
        <article className={styles.tableWrap}>
          <StatTable
            headers={[
              "ID",
              "Agence",
              "Véhicule",
              "Agent",
              "Client",
              "Début",
              "Fin",
              "Montant",
              "Caution",
              "Dommage",
              "Contravention",
              "Statut",
            ]}
            rows={transactions.map((trx) => ({
              id: trx.id,
              danger: trx.statut === "Signalée",
              cells: [
                trx.id,
                trx.agence,
                trx.vehicule,
                trx.agent,
                trx.client,
                trx.debut,
                trx.fin,
                `${trx.montant.toLocaleString("fr-CA")} $`,
                `${trx.caution.toLocaleString("fr-CA")} $`,
                <Badge key={`${trx.id}-dommage`} statut={trx.dommage ? "Attention" : "Actif"} />,
                trx.contravention,
                <Badge
                  key={`${trx.id}-status`}
                  statut={trx.statut === "Signalée" ? "Erreur" : trx.statut === "En cours" ? "En cours" : trx.statut === "Annulée" ? "Suspendu" : "Actif"}
                />,
              ],
            }))}
          />
        </article>

        <LiveFeed
          titre="Flux transactions en direct"
          items={transactions.slice(0, 8).map((trx) => ({
            id: trx.id,
            agence: trx.agence,
            action: `${trx.vehicule} · ${trx.client}`,
            montant: trx.montant,
            heure: trx.horodatage,
            statut: trx.statut === "Signalée" ? "Erreur" : trx.statut === "En cours" ? "En cours" : "Actif",
          }))}
        />
      </section>
    </div>
  );
}
