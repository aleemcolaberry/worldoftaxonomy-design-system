import PageHeader from '../../components/PageHeader/PageHeader';
import PageFooter from '../../components/PageFooter/PageFooter';
import TokenTable from '../../components/TokenTable/TokenTable';
import {
  textTokens,
  iconTokens,
  backgroundTokens,
  borderTokens,
  fillTokens,
} from '../../data/neutralTokens';
import styles from './NeutralColors.module.css';

export default function NeutralColors() {
  return (
    <>
      <PageHeader
        breadcrumb={['Style Guide', 'Color', 'Neutral Colors']}
        title="Neutral Colors"
        description="Every neutral in the system is sourced from the Zinc scale. Zinc 950 carries the brand dark surface; Zinc 50 the page background. The full ladder powers text, icons, borders, and fills."
      />
      <main className={styles.main}>
        <div className={styles.container}>
          <TokenTable name="Text" rows={textTokens} />
          <TokenTable name="Icon" rows={iconTokens} />
          <TokenTable name="Background" rows={backgroundTokens} />
          <TokenTable name="Border" rows={borderTokens} />
          <TokenTable name="Fill" rows={fillTokens} />
        </div>
      </main>
      <PageFooter />
    </>
  );
}
