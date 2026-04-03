import Icon from "@/components/Icon";
import KpiCard from "@/components/KpiCard";
import StatTable from "@/components/StatTable";
import { agences, conformiteSynthese } from "@/lib/mockData";
import styles from "./conformite.module.css";

export default function ConformitePage() {
  const gaugeAngle = (conformiteSynthese.scoreGlobal / 100) * 180;

  return (
    <div className={styles.page}>
      <section className={styles.gaugeCard}>
        <h3>Score global de conformité RGPD</h3>
        <div className={styles.gaugeWrap}>
          <div
            className={styles.gauge}
            style={{
              background: `conic-gradient(from 180deg, var(--green) ${gaugeAngle}deg, rgba(255,255,255,0.08) ${gaugeAngle}deg 180deg, transparent 180deg)`,
            }}
          >
            <span>{conformiteSynthese.scoreGlobal}%</span>
          </div>
        </div>
      </section>

      <section className={styles.kpiGrid}>
        <KpiCard titre="Conformes" valeur={conformiteSynthese.conformes} tendance="+1" detail="Agences OK" icone={<Icon name="check" />} />
        <KpiCard titre="En révision" valeur={conformiteSynthese.enRevision} tendance="Stable" detail="À surveiller" icone={<Icon name="chart" />} />
        <KpiCard titre="Infraction" valeur={conformiteSynthese.infraction} tendance="-1" detail="Action requise" icone={<Icon name="alert" />} danger />
      </section>

      <StatTable
        headers={[
          "Agence",
          "Consentement client",
          "CB chiffrée",
          "Pièce ID masquée",
          "Logs d'accès actifs",
          "Score global",
        ]}
        rows={agences.map((agence) => ({
          id: agence.id,
          cells: [
            agence.nom,
            agence.consentementClient ? "Oui" : "Non",
            agence.cbChiffree ? "Oui" : "Non",
            agence.pieceIdMasquee ? "Oui" : "Non",
            agence.logsAccesActifs ? "Oui" : "Non",
            <span
              key={`${agence.id}-score`}
              className={`${styles.scorePill} ${
                agence.scoreConformite === 100
                  ? styles.scoreGreen
                  : agence.scoreConformite >= 75
                    ? styles.scoreOrange
                    : styles.scoreRed
              }`}
            >
              {agence.scoreConformite}%
            </span>,
          ],
        }))}
      />

      <div className={styles.ctaWrap}>
        <button type="button" className={styles.cta}>
          Exporter le rapport de conformité
        </button>
      </div>
    </div>
  );
}
