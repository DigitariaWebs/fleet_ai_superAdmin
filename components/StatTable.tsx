import type { ReactNode } from "react";
import styles from "./StatTable.module.css";

type TableRow = {
  id: string;
  cells: ReactNode[];
  danger?: boolean;
};

type StatTableProps = {
  headers: string[];
  rows: TableRow[];
};

export default function StatTable({ headers, rows }: StatTableProps) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className={row.danger ? styles.dangerRow : ""}>
              {row.cells.map((cell, index) => (
                <td key={`${row.id}-${index}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
