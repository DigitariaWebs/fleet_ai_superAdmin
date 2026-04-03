"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import styles from "./KpiCard.module.css";

type KpiCardProps = {
  titre: string;
  valeur: number;
  suffixe?: string;
  prefixe?: string;
  tendance: string;
  detail: string;
  icone: ReactNode;
  danger?: boolean;
};

export default function KpiCard({
  titre,
  valeur,
  suffixe = "",
  prefixe = "",
  tendance,
  detail,
  icone,
  danger = false,
}: KpiCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(valeur * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [valeur]);

  return (
    <article className={`${styles.card} ${danger ? styles.danger : ""}`}>
      <header className={styles.header}>
        <p>{titre}</p>
        <span className={styles.iconBox}>{icone}</span>
      </header>
      <p className={styles.value}>
        {prefixe}
        {displayValue.toLocaleString("fr-CA")}
        {suffixe}
      </p>
      <footer className={styles.footer}>
        <span>{tendance}</span>
        <small>{detail}</small>
      </footer>
    </article>
  );
}
