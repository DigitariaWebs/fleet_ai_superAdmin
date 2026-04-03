import styles from "./Badge.module.css";
import type { StatutGlobal } from "@/lib/mockData";

type BadgeProps = {
  statut: StatutGlobal | "Conforme" | "En révision" | "Infraction" | "Validée" | "Annulée";
};

const mapClass: Record<BadgeProps["statut"], string> = {
  Actif: styles.vert,
  "En cours": styles.bleu,
  Attention: styles.orange,
  Erreur: styles.rouge,
  Suspendu: styles.rouge,
  Conforme: styles.vert,
  "En révision": styles.orange,
  Infraction: styles.rouge,
  Validée: styles.vert,
  Annulée: styles.rouge,
};

export default function Badge({ statut }: BadgeProps) {
  return <span className={`${styles.badge} ${mapClass[statut]}`}>{statut}</span>;
}
