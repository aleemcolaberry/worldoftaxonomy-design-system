import styles from './PropsTable.module.css';

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface PropsTableProps {
  rows: PropRow[];
  title?: string;
}

export default function PropsTable({ rows, title = 'Props' }: PropsTableProps) {
  return (
    <section className={styles.section} aria-labelledby="props-heading">
      <h3 id="props-heading" className={styles.title}>{title}</h3>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td>
                  <code className={styles.propName}>{row.name}</code>
                  {row.required && <span className={styles.required}>required</span>}
                </td>
                <td>
                  <code className={styles.type}>{row.type}</code>
                </td>
                <td>
                  {row.default ? <code className={styles.default}>{row.default}</code> : '—'}
                </td>
                <td className={styles.description}>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
