import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import TokenTable from '../../components/TokenTable/TokenTable';
import {
  textTokens,
  iconTokens,
  backgroundTokens,
  borderTokens,
  fillTokens,
} from '../../data/neutralTokens';

export default function NeutralColors() {
  return (
    <AppShell>
      <PageIntro
        eyebrow="Foundations · Color"
        title="Neutral Colors"
        lede="Every neutral in the system is sourced from the Zinc scale. Zinc 950 carries the brand dark surface; Zinc 50 the page background. The full ladder powers text, icons, borders, and fills."
      />
      <TokenTable name="Text" rows={textTokens} />
      <TokenTable name="Icon" rows={iconTokens} />
      <TokenTable name="Background" rows={backgroundTokens} />
      <TokenTable name="Border" rows={borderTokens} />
      <TokenTable name="Fill" rows={fillTokens} />
    </AppShell>
  );
}
