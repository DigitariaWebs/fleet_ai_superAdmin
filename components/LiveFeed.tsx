import Badge from "./Badge";
import styles from "./LiveFeed.module.css";
import type { StatutGlobal } from "@/lib/mockData";

type FeedItem = {
  id: string;
  agence: string;
  action: string;
  montant?: number;
  heure: string;
  statut: StatutGlobal;
};

type LiveFeedProps = {
  titre: string;
  items: FeedItem[];
};

export default function LiveFeed({ titre, items }: LiveFeedProps) {
  return (
    <section className={styles.panel}>
      <h3>{titre}</h3>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[...items, ...items].map((item, index) => (
            <article key={`${item.id}-${index}`} className={styles.item}>
              <div className={styles.color} data-status={item.statut} />
              <div className={styles.content}>
                <p className={styles.agence}>{item.agence}</p>
                <p className={styles.action}>{item.action}</p>
                <p className={styles.meta}>
                  {item.montant ? `${item.montant.toLocaleString("fr-CA")} $ CAD` : "Sans montant"} · {item.heure}
                </p>
              </div>
              <Badge statut={item.statut} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
