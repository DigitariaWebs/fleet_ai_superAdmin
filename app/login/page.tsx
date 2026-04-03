"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./login.module.css";

const DEMO_EMAIL = "admin@admin.com";
const DEMO_PASSWORD = "admin123";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      document.cookie = "fleetai_auth=1; path=/; max-age=86400";
      router.push("/dashboard");
      return;
    }

    setError("Identifiants incorrects. Utilise admin@admin.com et admin123.");
  };

  return (
    <main className={styles.page}>
      <div className={styles.backdrop} />

      <section className={styles.panel}>
        <div className={styles.logoWrap}>
          <Image src="/logo.png" alt="FleetAI" width={240} height={92} className={styles.logoImage} priority />
        </div>

        <header className={styles.header}>
          <h1>Connexion Super Admin</h1>
          <p>Accède à FleetAI avec ton compte administrateur.</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@admin.com"
              autoComplete="username"
              required
            />
          </label>

          <label>
            <span>Mot de passe</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="admin123"
              autoComplete="current-password"
              required
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit">Se connecter</button>
        </form>

        <footer className={styles.footer}>
          <small>Identifiants de démo: admin@admin.com · admin123</small>
        </footer>
      </section>
    </main>
  );
}
