import styles from "./parametres.module.css";

export default function ParametresPage() {
  return (
    <section className={styles.page}>
      <h3>Paramètres globaux</h3>
      <p>Cette section centralise la configuration de sécurité, notifications et facturation FleetAI.</p>
      <div className={styles.grid}>
        <article>
          <h4>Sécurité</h4>
          <p>Gestion des sessions admin, MFA et politiques de mot de passe.</p>
        </article>
        <article>
          <h4>Intégrations</h4>
          <p>Clés API, webhooks, limites de débit et accès inter-services.</p>
        </article>
        <article>
          <h4>Facturation</h4>
          <p>Plans d'abonnement, taxes régionales et export comptable.</p>
        </article>
      </div>
    </section>
  );
}
