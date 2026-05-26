import PageHeader from '../../components/PageHeader/PageHeader';
import PageFooter from '../../components/PageFooter/PageFooter';
import SwatchTable from '../../components/SwatchTable/SwatchTable';
import { palettes } from '../../data/palettes';
import styles from './ColorPalettes.module.css';

export default function ColorPalettes() {
  return (
    <>
      <PageHeader
        breadcrumb={['Style Guide', 'Color', 'Palettes']}
        title="Color Palettes"
        description="Cyan is the only saturated brand colour — used for accents, focus rings, and the brand mark. Zinc is the neutral surface scale. Emerald, amber, and red exist purely for success / warning / error states."
      />
      <main className={styles.main}>
        <div className={styles.container}>
          {palettes.map((p) => (
            <SwatchTable key={p.name} name={p.name} rows={p.rows} />
          ))}
        </div>
      </main>
      <PageFooter />
    </>
  );
}
