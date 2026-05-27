import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import TokenTable from '../../components/TokenTable/TokenTable';
import {
  primaryTokens,
  successTokens,
  warningTokens,
  infoTokens,
  errorTokens,
  linkTokens,
  controlTokens,
} from '../../data/brandTokens';

export default function BrandColors() {
  return (
    <AppShell>
      <PageIntro
        eyebrow="Foundations · Color"
        title="Brand Colors"
        lede="Cyan is the sole brand colour, applied through the Primary and Info roles. Success, Warning, and Error use functional state palettes (emerald / amber / red) — they communicate meaning but never compete with the brand accent."
      />
      <TokenTable name="Primary" rows={primaryTokens} />
      <TokenTable name="Success" rows={successTokens} />
      <TokenTable name="Warning" rows={warningTokens} />
      <TokenTable name="Info" rows={infoTokens} />
      <TokenTable name="Error" rows={errorTokens} />
      <TokenTable name="Link" rows={linkTokens} />
      <TokenTable name="Control" rows={controlTokens} />
    </AppShell>
  );
}
