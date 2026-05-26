import styles from './SwatchTable.module.css';

export interface SwatchRow {
  step: number;
  variable: string;
  value: string;
}

export interface SwatchTableProps {
  name: string;
  rows: SwatchRow[];
}

export default function SwatchTable({ name, rows }: SwatchTableProps) {
  return (
    <section className={styles.section} aria-labelledby={`palette-${name}`}>
      <h3 id={`palette-${name}`} className={styles.title}>
        {name}
      </h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Step</th>
            <th>Variable</th>
            <th>Light Theme Value</th>
            <th>Sample</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.step}>
              <td className={styles.step}>{row.step}</td>
              <td className={styles.varName}>{row.variable}</td>
              <td className={styles.value}>{row.value}</td>
              <td>
                <span className={styles.swatch} style={{ background: row.value }} aria-hidden />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
