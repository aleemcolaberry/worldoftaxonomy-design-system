import PageHeader from '../../components/PageHeader/PageHeader';
import PageFooter from '../../components/PageFooter/PageFooter';
import Btn, { type ButtonSize } from '../../components/Button/Button';
import Group from '../../components/ButtonGroup/ButtonGroup';
import styles from './ButtonGroup.module.css';

const sizes: ButtonSize[] = ['lg', 'md', 'sm'];

function GroupCell({
  orientation,
  variant,
  size,
}: {
  orientation: 'horizontal' | 'vertical';
  variant: 'primary' | 'default';
  size: ButtonSize;
}) {
  return (
    <Group orientation={orientation}>
      {[1, 2, 3, 4].map((i) => (
        <Btn key={i} variant={variant} size={size}>
          Button
        </Btn>
      ))}
    </Group>
  );
}

export default function ButtonGroupPage() {
  return (
    <>
      <PageHeader
        breadcrumb={['Style Guide', 'Components', 'Button Group']}
        title="Button Group"
        description="Groups arrange related actions. Default spacing keeps each button visually distinct; for tightly-bound toolbars use the compact variant on the next page."
      />
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.block} aria-labelledby="horiz">
            <h3 id="horiz" className={styles.blockTitle}>Horizontal</h3>
            <div className={styles.grid}>
              <span />
              <span className={styles.colHead}>Primary</span>
              <span className={styles.colHead}>Default</span>
              {sizes.map((s) => (
                <>
                  <span key={`l-${s}`} className={styles.rowHead}>{s}</span>
                  <div className={styles.cell}>
                    <GroupCell orientation="horizontal" variant="primary" size={s} />
                  </div>
                  <div className={styles.cell}>
                    <GroupCell orientation="horizontal" variant="default" size={s} />
                  </div>
                </>
              ))}
            </div>
          </section>

          <section className={styles.block} aria-labelledby="vert">
            <h3 id="vert" className={styles.blockTitle}>Vertical</h3>
            <div className={styles.grid}>
              <span />
              <span className={styles.colHead}>Primary</span>
              <span className={styles.colHead}>Default</span>
              {sizes.map((s) => (
                <>
                  <span key={`vl-${s}`} className={styles.rowHead}>{s}</span>
                  <div className={styles.cell}>
                    <GroupCell orientation="vertical" variant="primary" size={s} />
                  </div>
                  <div className={styles.cell}>
                    <GroupCell orientation="vertical" variant="default" size={s} />
                  </div>
                </>
              ))}
            </div>
          </section>
        </div>
      </main>
      <PageFooter />
    </>
  );
}
