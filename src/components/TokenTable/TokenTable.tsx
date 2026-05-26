import styles from './TokenTable.module.css';

export interface TokenRow {
  variable: string;
  group: 'Map' | 'Alias' | 'Seed';
  value: string;
  description: string;
}

export interface TokenTableProps {
  name: string;
  rows: TokenRow[];
}

function isHex(value: string) {
  return /^#([0-9a-f]{3,8})$/i.test(value);
}

export default function TokenTable({ name, rows }: TokenTableProps) {
  return (
    <section className={styles.section} aria-labelledby={`tokens-${name}`}>
      <h3 id={`tokens-${name}`} className={styles.title}>
        {name}
      </h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Group</th>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.variable}>
              <td className={styles.varName}>{row.variable}</td>
              <td>
                <span className={`${styles.tag} ${styles[`tag-${row.group}`]}`}>{row.group}</span>
              </td>
              <td className={styles.value}>
                {isHex(row.value) && (
                  <span
                    className={styles.swatch}
                    style={{ background: row.value }}
                    aria-hidden
                  />
                )}
                <code>{row.value}</code>
              </td>
              <td className={styles.description}>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
