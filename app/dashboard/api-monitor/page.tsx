import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import KpiCard from "@/components/KpiCard";
import StatTable from "@/components/StatTable";
import { apiAlertes, kpis, topAgencesApi, volumeApi7j } from "@/lib/mockData";
import styles from "./api.module.css";

const width = 960;
const height = 300;
const maxY = Math.max(...volumeApi7j);
const minY = Math.min(...volumeApi7j);
const avgY = Math.round(volumeApi7j.reduce((sum, value) => sum + value, 0) / volumeApi7j.length);
const paddedMax = Math.ceil(maxY * 1.12);
const chartInnerTop = 24;
const chartInnerBottom = 42;
const chartInnerHeight = height - chartInnerTop - chartInnerBottom;

const pointsData = volumeApi7j.map((value, index) => {
  const x = (index / (volumeApi7j.length - 1)) * width;
  const y = chartInnerTop + (1 - value / paddedMax) * chartInnerHeight;
  return { x, y, value, index };
});

const points = pointsData.map((point) => `${point.x},${point.y}`).join(" ");

const areaPath = `M0,${height} ${points
  .split(" ")
  .map((p) => `L${p}`)
  .join(" ")} L${width},${height} Z`;

const yTicks = Array.from({ length: 5 }).map((_, index) => {
  const ratio = 1 - index / 4;
  const value = Math.round(paddedMax * ratio);
  const y = chartInnerTop + (1 - value / paddedMax) * chartInnerHeight;
  return { value, y };
});

const xTicks = pointsData.map((point) => ({
  x: point.x,
  label: point.index === pointsData.length - 1 ? "Aujourd'hui" : `J-${pointsData.length - 1 - point.index}`,
}));

const trendPct = Math.round(((volumeApi7j[volumeApi7j.length - 1] - volumeApi7j[0]) / volumeApi7j[0]) * 100);
const trendLabel = trendPct >= 0 ? `+${trendPct}%` : `${trendPct}%`;

export default function ApiMonitorPage() {
  const topVolume = topAgencesApi[0]?.volume ?? 1;
  const lastPoint = pointsData[pointsData.length - 1];

  return (
    <div className={styles.page}>
      <section className={styles.kpiGrid}>
        <KpiCard titre="Appels aujourd'hui" valeur={kpis.api.appelsAujourdhui} tendance="+8.2%" detail="Sur 24h" icone={<Icon name="plug" />} />
        <KpiCard titre="Taux d'erreur" valeur={kpis.api.tauxErreur * 100} suffixe="%" tendance="Stable" detail="0.3%" icone={<Icon name="alert" />} />
        <KpiCard titre="Temps réponse moyen" valeur={kpis.api.tempsReponseMs} suffixe=" ms" tendance="-11ms" detail="Performance" icone={<Icon name="clock" />} />
        <KpiCard titre="Endpoints actifs" valeur={kpis.api.endpointsActifs} tendance="+2" detail="Services connectés" icone={<Icon name="nodes" />} />
      </section>

      <article className={styles.areaCard}>
        <div className={styles.areaHead}>
          <h3>Volume d'appels API — 7 derniers jours</h3>
          <div className={styles.statsRow}>
            <span>Min {minY.toLocaleString("fr-FR")}</span>
            <span>Moyenne {avgY.toLocaleString("fr-FR")}</span>
            <span>Max {maxY.toLocaleString("fr-FR")}</span>
            <span className={trendPct >= 0 ? styles.trendUp : styles.trendDown}>Tendance {trendLabel}</span>
          </div>
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Volume d'appels API">
          <defs>
            <linearGradient id="apiGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3EC9F0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3EC9F0" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="apiStrokeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#35B7FF" />
              <stop offset="100%" stopColor="#00E4B8" />
            </linearGradient>
          </defs>

          {yTicks.map((tick) => (
            <g key={`y-${tick.y}`}>
              <line x1="0" y1={tick.y} x2={width} y2={tick.y} className={styles.gridLine} />
              <text x="10" y={tick.y - 6} className={styles.axisLabel}>
                {tick.value.toLocaleString("fr-FR")}
              </text>
            </g>
          ))}

          {xTicks.map((tick) => (
            <text key={tick.label} x={tick.x} y={height - 10} className={styles.axisLabel} textAnchor="middle">
              {tick.label}
            </text>
          ))}

          <path d={areaPath} fill="url(#apiGradient)" />
          <polyline points={points} fill="none" stroke="url(#apiStrokeGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

          {pointsData.map((point) => (
            <g key={`p-${point.index}`}>
              <circle cx={point.x} cy={point.y} r="5.5" className={styles.pointOuter} />
              <circle cx={point.x} cy={point.y} r="3.2" className={styles.pointInner} />
            </g>
          ))}

          <g>
            <line x1={lastPoint.x} y1={lastPoint.y - 34} x2={lastPoint.x} y2={lastPoint.y - 10} className={styles.calloutLine} />
            <rect x={Math.max(lastPoint.x - 66, 8)} y={Math.max(lastPoint.y - 62, 2)} width="132" height="28" rx="8" className={styles.calloutBox} />
            <text x={Math.max(lastPoint.x - 52, 16)} y={Math.max(lastPoint.y - 44, 20)} className={styles.calloutText}>
              {lastPoint.value.toLocaleString("fr-FR")} appels
            </text>
          </g>
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
