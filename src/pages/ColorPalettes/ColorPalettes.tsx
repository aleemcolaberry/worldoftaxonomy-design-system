import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import SwatchTable from '../../components/SwatchTable/SwatchTable';
import { palettes } from '../../data/palettes';

export default function ColorPalettes() {
  return (
    <AppShell>
      <PageIntro
        eyebrow="Foundations · Color"
        title="Color Palettes"
        lede="Cyan is the only saturated brand colour — used for accents, focus rings, and the brand mark. Zinc is the neutral surface scale. Emerald, amber, and red exist purely for success / warning / error states."
      />
      {palettes.map((p) => (
        <SwatchTable key={p.name} name={p.name} rows={p.rows} />
      ))}
    </AppShell>
  );
}
