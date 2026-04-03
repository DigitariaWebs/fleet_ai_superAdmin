import type { ReactNode } from "react";
import styles from "./Icon.module.css";

type IconName =
  | "home"
  | "building"
  | "users"
  | "card"
  | "plug"
  | "shield"
  | "settings"
  | "logout"
  | "bell"
  | "money"
  | "alert"
  | "check"
  | "plus"
  | "ban"
  | "chart"
  | "clock"
  | "nodes"
  | "menu";

type IconProps = {
  name: IconName;
  size?: 16 | 18 | 20;
};

const glyphs: Record<IconName, ReactNode> = {
  home: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V5l8-2v18" /><path d="M12 9h8v12h-8" /><path d="M7 9h2M7 13h2M7 17h2M15 13h2M15 17h2" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.6-2.8 2.5-4.5 5.5-4.5s4.9 1.7 5.5 4.5" /><circle cx="17" cy="9" r="2.5" /><path d="M14.5 18.5c.5-2.1 2-3.3 4.5-3.3" /></svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 10h18" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7V3M16 7V3" /><path d="M6 7h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6z" /><path d="M12 16v5" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4.5 6v6c0 4.6 3 7.8 7.5 9 4.5-1.2 7.5-4.4 7.5-9V6z" /></svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.4 1.8" /></svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H5v16h4" /><path d="M14 8l4 4-4 4" /><path d="M8 12h10" /></svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9a6 6 0 1 1 12 0v5l2 2H4l2-2z" /><path d="M10 18a2 2 0 0 0 4 0" /></svg>
  ),
  money: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="2.8" /><path d="M7 9h0M17 15h0" /></svg>
  ),
  alert: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 20h19z" /><path d="M12 9v5" /><path d="M12 17h0" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg>
  ),
  ban: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m8 8 8 8" /></svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18h16" /><path d="M7 14V9M12 14V6M17 14v-3" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  ),
  nodes: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="2" /><circle cx="12" cy="6" r="2" /><circle cx="18" cy="12" r="2" /><circle cx="12" cy="18" r="2" /><path d="M8 12h8M12 8v8" /></svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  ),
};

export default function Icon({ name, size = 18 }: IconProps) {
  const sizeClass = size === 16 ? styles.s16 : size === 20 ? styles.s20 : styles.s18;
  return <span className={`${styles.icon} ${sizeClass}`}>{glyphs[name]}</span>;
}
