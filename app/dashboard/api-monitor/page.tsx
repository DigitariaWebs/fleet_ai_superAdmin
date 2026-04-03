import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import KpiCard from "@/components/KpiCard";
import StatTable from "@/components/StatTable";
import { apiAlertes, kpis, topAgencesApi, volumeApi7j } from "@/lib/mockData";
import styles from "./api.module.css";

const width = 960;
const height = 250;
const maxY = Math.max(...volumeApi7j);
const points = volumeApi7j
  .map((value, index) => {
    const x = (index / (volumeApi7j.length - 1)) * width;
    const y = height - (value / maxY) * (height - 20);
    return `${x},${y}`;
  })
  .join(" ");

const areaPath = `M0,${height} ${points
  .split(" ")
  .map((p) => `L${p}`)
  .join(" ")} L${width},${height} Z`;

export default function ApiMonitorPage() {
  const topVolume = topAgencesApi[0]?.volume ?? 1;

  return (
    <div className={styles.page}>
      <section className={styles.kpiGrid}>
        <KpiCard titre="Appels aujourd'hui" valeur={kpis.api.appelsAujourdhui} tendance="+8.2%" detail="Sur 24h" icone={<Icon name="plug" />} />
        <KpiCard titre="Taux d'erreur" valeur={kpis.api.tauxErreur * 100} suffixe="%" tendance="Stable" detail="0.3%" icone={<Icon name="alert" />} />
        <KpiCard titre="Temps réponse moyen" valeur={kpis.api.tempsReponseMs} suffixe=" ms" tendance="-11ms" detail="Performance" icone={<Icon name="clock" />} />
        <KpiCard titre="Endpoints actifs" valeur={kpis.api.endpointsActifs} tendance="+2" detail="Services connectés" icone={<Icon name="nodes" />} />
      </section>

      <article className={styles.areaCard}>
        <h3>Volume d'appels API — 7 derniers jours</h3>
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Volume d'appels API">
          <defs>
            <linearGradient id="apiGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3EC9F0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3EC9F0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#apiGradient)" />
          <polyline points={points} fill="none" stroke="#3EC9F0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </article>

      <section className={styles.twoCols}>
        <article className={styles.barCard}>
          <h3>Top 10 agences par volume d'appels API</h3>
          <div className={styles.bars}>
            {topAgencesApi.map((item) => (
              <div key={item.agence} className={styles.barRow}>
                <p>{item.agence}</p>
                <div>
                  <i style={{ width: `${(item.volume / topVolume) * 100}%` }} />
                </div>
                <span>{item.volume.toLocaleString("fr-CA")}</span>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.alertCard}>
          <h3>Journal des alertes</h3>
          <StatTable
            headers={["Horodatage", "Type", "Agence", "Sévérité", "Message"]}
            rows={apiAlertes.map((alert, index) => ({
              id: `${alert.horodatage}-${index}`,
              cells: [
                alert.horodatage,
                alert.type,
                alert.agence,
                <Badge key={`${alert.horodatage}-sev`} statut={alert.severite} />,
                alert.message,
              ],
            }))}
          />
        </article>
      </section>
    </div>
  );
}
