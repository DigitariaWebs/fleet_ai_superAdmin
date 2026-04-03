import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import KpiCard from "@/components/KpiCard";
import LiveFeed from "@/components/LiveFeed";
import {
  activiteRecente,
  kpis,
  repartitionRoles,
  transactionsQuotidiennes30j,
} from "@/lib/mockData";
import styles from "./vue.module.css";

const chartWidth = 680;
const chartHeight = 250;
const maxValue = Math.max(...transactionsQuotidiennes30j);
const points = transactionsQuotidiennes30j
  .map((value, index) => {
    const x = (index / (transactionsQuotidiennes30j.length - 1)) * chartWidth;
    const y = chartHeight - (value / maxValue) * (chartHeight - 20);
    return `${x},${y}`;
  })
  .join(" ");

const areaPath = `M0,${chartHeight} ${points
  .split(" ")
  .map((p) => `L${p}`)
  .join(" ")} L${chartWidth},${chartHeight} Z`;

const totalRoles = repartitionRoles.reduce((sum, item) => sum + item.valeur, 0);
let cumulative = 0;
const segments = repartitionRoles.map((item) => {
  const value = (item.valeur / totalRoles) * 100;
  const segment = `${item.couleur} ${cumulative}% ${cumulative + value}%`;
  cumulative += value;
  return segment;
});

export default function DashboardOverviewPage() {
  return (
    <div className={styles.page}>
      <section className={styles.kpiGrid}>
        <KpiCard
          titre="Agences enregistrées"
          valeur={kpis.vueEnsemble.agencesEnregistrees.valeur}
          tendance={kpis.vueEnsemble.agencesEnregistrees.trend}
          detail={kpis.vueEnsemble.agencesEnregistrees.variation}
          icone={<Icon name="building" />}
        />
        <KpiCard
          titre="Utilisateurs totaux"
          valeur={kpis.vueEnsemble.utilisateursTotaux.valeur}
          tendance={kpis.vueEnsemble.utilisateursTotaux.trend}
          detail={kpis.vueEnsemble.utilisateursTotaux.variation}
          icone={<Icon name="users" />}
        />
        <KpiCard
          titre="Revenus plateforme"
          valeur={kpis.vueEnsemble.revenusPlateforme.valeur}
          prefixe=""
          suffixe=" $"
          tendance={kpis.vueEnsemble.revenusPlateforme.trend}
          detail={kpis.vueEnsemble.revenusPlateforme.variation}
          icone={<Icon name="money" />}
        />
        <KpiCard
          titre="Transactions signalées"
          valeur={kpis.vueEnsemble.transactionsSignalees.valeur}
          tendance={kpis.vueEnsemble.transactionsSignalees.trend}
          detail={kpis.vueEnsemble.transactionsSignalees.variation}
          icone={<Icon name="alert" />}
          danger
        />
      </section>

      <section className={styles.chartsGrid}>
        <article className={styles.chartCard}>
          <h3>Transactions quotidiennes — 30 derniers jours</h3>
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Graphique des transactions">
            <defs>
              <linearGradient id="fillTransactions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3EC9F0" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#3EC9F0" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4].map((line) => (
              <line
                key={line}
                x1="0"
                y1={(chartHeight / 4) * line}
                x2={chartWidth}
                y2={(chartHeight / 4) * line}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
            ))}
            <path d={areaPath} fill="url(#fillTransactions)" />
            <polyline
              fill="none"
              stroke="#3EC9F0"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
              points={points}
            />
          </svg>
        </article>

        <article className={styles.chartCard}>
          <h3>Répartition utilisateurs par rôle</h3>
          <div
            className={styles.donut}
            style={{
              background: `conic-gradient(${segments.join(", ")})`,
            }}
          >
            <span>{totalRoles}%</span>
          </div>
          <div className={styles.legend}>
            {repartitionRoles.map((item) => (
              <p key={item.role}>
                <i style={{ background: item.couleur }} />
                {item.role} ({item.valeur}%)
              </p>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.feedOnly}>
        <LiveFeed
          titre="Activité récente"
          items={activiteRecente.map((event, index) => ({
            id: `feed-${index}`,
            agence: event.agence,
            action: event.action,
            montant: event.montant,
            heure: event.heure,
            statut: event.statut,
          }))}
        />
      </section>
    </div>
  );
}
