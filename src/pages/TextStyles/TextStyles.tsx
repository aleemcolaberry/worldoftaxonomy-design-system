import PageHeader from '../../components/PageHeader/PageHeader';
import PageFooter from '../../components/PageFooter/PageFooter';
import styles from './TextStyles.module.css';

interface SizeBlock {
  label: string;
  fontSize: string;
  lineHeight: string;
  prefix: string;
  variants: { name: string; className: string }[];
}

const sizeBlocks: SizeBlock[] = [
  {
    label: 'Base',
    fontSize: '14px',
    lineHeight: '22px',
    prefix: 'Base',
    variants: [
      { name: 'Normal', className: 'base-normal' },
      { name: 'Strong', className: 'base-strong' },
      { name: 'Underline', className: 'base-underline' },
      { name: 'Delete', className: 'base-delete' },
      { name: 'Italic', className: 'base-italic' },
    ],
  },
  {
    label: 'SM',
    fontSize: '12px',
    lineHeight: '20px',
    prefix: 'SM',
    variants: [
      { name: 'Normal', className: 'sm-normal' },
      { name: 'Strong', className: 'sm-strong' },
      { name: 'Underline', className: 'sm-underline' },
      { name: 'Delete', className: 'sm-delete' },
      { name: 'Italic', className: 'sm-italic' },
    ],
  },
  {
    label: 'LG',
    fontSize: '16px',
    lineHeight: '24px',
    prefix: 'LG',
    variants: [
      { name: 'Normal', className: 'lg-normal' },
      { name: 'Strong', className: 'lg-strong' },
      { name: 'Underline', className: 'lg-underline' },
      { name: 'Delete', className: 'lg-delete' },
      { name: 'Italic', className: 'lg-italic' },
    ],
  },
  {
    label: 'XL',
    fontSize: '20px',
    lineHeight: '28px',
    prefix: 'XL',
    variants: [
      { name: 'Normal', className: 'xl-normal' },
      { name: 'Strong', className: 'xl-strong' },
      { name: 'Underline', className: 'xl-underline' },
      { name: 'Delete', className: 'xl-delete' },
      { name: 'Italic', className: 'xl-italic' },
    ],
  },
];

const headings = [
  { name: 'Heading 1', fontSize: '38px', lineHeight: '46px', className: 'h1' },
  { name: 'Heading 2', fontSize: '30px', lineHeight: '38px', className: 'h2' },
  { name: 'Heading 3', fontSize: '24px', lineHeight: '32px', className: 'h3' },
  { name: 'Heading 4', fontSize: '20px', lineHeight: '28px', className: 'h4' },
  { name: 'Heading 5', fontSize: '16px', lineHeight: '24px', className: 'h5' },
];

export default function TextStyles() {
  return (
    <>
      <PageHeader
        breadcrumb={['Style Guide', 'Typography', 'Text Styles']}
        title="Text Styles"
        description="The text ramp pairs four body sizes (SM / Base / LG / XL) with a five-step heading scale. All weights render in Geist; mono styles use Geist Mono."
      />
      <main className={styles.main}>
        <div className={styles.container}>
          {sizeBlocks.map((block) => (
            <section key={block.label} className={styles.row}>
              <div className={styles.meta}>
                <h3 className={styles.metaLabel}>{block.label}</h3>
                <p className={styles.metaSize}>Font size: {block.fontSize}</p>
                <p className={styles.metaSize}>Line height: {block.lineHeight}</p>
              </div>
              <ul className={styles.samples}>
                {block.variants.map((v) => (
                  <li key={v.name} className={styles[v.className]}>
                    {block.label} {v.name}
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {headings.map((h) => (
            <section key={h.name} className={styles.row}>
              <div className={styles.meta}>
                <h3 className={styles.metaLabel}>{h.name}</h3>
                <p className={styles.metaSize}>Font size: {h.fontSize}</p>
                <p className={styles.metaSize}>Line height: {h.lineHeight}</p>
              </div>
              <div className={styles[h.className]}>{h.name}</div>
            </section>
          ))}
        </div>
      </main>
      <PageFooter />
    </>
  );
}
