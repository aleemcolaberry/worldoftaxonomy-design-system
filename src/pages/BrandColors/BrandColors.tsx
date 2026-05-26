import PageHeader from '../../components/PageHeader/PageHeader';
import PageFooter from '../../components/PageFooter/PageFooter';
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
import styles from './BrandColors.module.css';

export default function BrandColors() {
  return (
    <>
      <PageHeader
        breadcrumb={['Style Guide', 'Color', 'Brand Colors']}
        title="Brand Colors"
        description="Cyan is the sole brand colour, applied through the Primary and Info roles. Success, Warning, and Error use functional state palettes (emerald / amber / red) — they communicate meaning but never compete with the brand accent."
      />
      <main className={styles.main}>
        <div className={styles.container}>
          <TokenTable name="Primary" rows={primaryTokens} />
          <TokenTable name="Success" rows={successTokens} />
          <TokenTable name="Warning" rows={warningTokens} />
          <TokenTable name="Info" rows={infoTokens} />
          <TokenTable name="Error" rows={errorTokens} />
          <TokenTable name="Link" rows={linkTokens} />
          <TokenTable name="Control" rows={controlTokens} />
        </div>
      </main>
      <PageFooter />
    </>
  );
}
