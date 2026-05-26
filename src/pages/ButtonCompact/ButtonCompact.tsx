import PageHeader from '../../components/PageHeader/PageHeader';
import PageFooter from '../../components/PageFooter/PageFooter';
import Btn, { type ButtonSize } from '../../components/Button/Button';
import Group from '../../components/ButtonGroup/ButtonGroup';
import styles from './ButtonCompact.module.css';

const sizes: ButtonSize[] = ['lg', 'md', 'sm'];

export default function ButtonCompactPage() {
  return (
    <>
      <PageHeader
        breadcrumb={['Style Guide', 'Components', 'Button Compact']}
        title="Button Compact"
        description="A compact group merges adjacent button borders into a single hairline. Use it for toolbars, segmented controls, or tightly-bound action sets where the choices form one logical unit."
      />
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.block} aria-labelledby="item">
            <h3 id="item" className={styles.blockTitle}>Compact item — anatomy</h3>
            <p className={styles.note}>
              Each cell shows a Primary and Default button at one size. In a compact
              group they share a single border seam.
            </p>
            <div className={styles.grid}>
              <span />
              <span className={styles.colHead}>Primary</span>
              <span className={styles.colHead}>Default</span>
              {sizes.map((s) => (
                <>
                  <span key={`l-${s}`} className={styles.rowHead}>{s}</span>
                  <div className={styles.cell}><Btn variant="primary" size={s}>Button</Btn></div>
                  <div className={styles.cell}><Btn variant="default" size={s}>Button</Btn></div>
                </>
              ))}
            </div>
          </section>

          <section className={styles.block} aria-labelledby="horiz">
            <h3 id="horiz" className={styles.blockTitle}>Compact group — horizontal</h3>
            <p className={styles.note}>
              Primary and default styles, three sizes. Internal corners are squared;
              only the outer corners keep their radius.
            </p>
            <div className={styles.row}>
              {sizes.map((s) => (
                <div key={s} className={styles.example}>
                  <span className={styles.label}>{s} · primary</span>
                  <Group compact>
                    {['Cut', 'Copy', 'Paste'].map((label) => (
                      <Btn key={label} variant="primary" size={s}>{label}</Btn>
                    ))}
                  </Group>
                  <span className={styles.label}>{s} · default</span>
                  <Group compact>
                    {['Cut', 'Copy', 'Paste'].map((label) => (
                      <Btn key={label} variant="default" size={s}>{label}</Btn>
                    ))}
                  </Group>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.block} aria-labelledby="vert">
            <h3 id="vert" className={styles.blockTitle}>Compact group — vertical</h3>
            <p className={styles.note}>
              Same compaction logic stacked vertically — for dock-style toolbars
              or floating side menus.
            </p>
            <div className={styles.vertRow}>
              {sizes.map((s) => (
                <div key={s} className={styles.vertExample}>
                  <span className={styles.label}>{s} · primary</span>
                  <Group orientation="vertical" compact>
                    {['Up', 'Center', 'Down'].map((label) => (
                      <Btn key={label} variant="primary" size={s}>{label}</Btn>
                    ))}
                  </Group>
                  <span className={styles.label}>{s} · default</span>
                  <Group orientation="vertical" compact>
                    {['Up', 'Center', 'Down'].map((label) => (
                      <Btn key={label} variant="default" size={s}>{label}</Btn>
                    ))}
                  </Group>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <PageFooter />
    </>
  );
}
