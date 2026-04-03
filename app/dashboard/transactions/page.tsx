import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import KpiCard from "@/components/KpiCard";
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

      <article className={styles.tableWrap}>
        <StatTable
          headers={[
            "ID",
            "Agence",
            "Véhicule",
            "Client",
            "Période",
            "Montant",
            "Statut",
            "Dommage",
          ]}
          rows={transactions.map((trx) => ({
            id: trx.id,
            danger: trx.statut === "Signalée",
            cells: [
              trx.id,
              trx.agence,
              trx.vehicule,
              trx.client,
              `${trx.debut} → ${trx.fin}`,
              `${trx.montant.toLocaleString("fr-CA")} $`,
              <Badge
                key={`${trx.id}-status`}
                statut={trx.statut === "Signalée" ? "Erreur" : trx.statut === "En cours" ? "En cours" : trx.statut === "Annulée" ? "Suspendu" : "Actif"}
              />,
              <Badge key={`${trx.id}-dommage`} statut={trx.dommage ? "Attention" : "Actif"} />,
            ],
          }))}
        />
      </article>
    </div>
  );
}
