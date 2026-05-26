import { Link } from 'react-router-dom';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  breadcrumb: string[];
  title: string;
  description?: string;
}

export default function PageHeader({ breadcrumb, title, description }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            {breadcrumb.map((crumb, i) => (
              <span key={i} className={styles.crumb}>
                {i < breadcrumb.length - 1 ? (
                  <Link to="/" className={styles.crumbLink}>
                    {crumb}
                  </Link>
                ) : (
                  <span aria-current="page">{crumb}</span>
                )}
                {i < breadcrumb.length - 1 && <span className={styles.divider}>/</span>}
              </span>
            ))}
          </nav>
          <Link to="/" className={styles.markWrap} aria-label="WorldOfTaxonomy home">
            <img src="/brand/logo-favicon.svg" alt="" className={styles.mark} />
            <span className={styles.markWord}>WorldOfTaxonomy</span>
          </Link>
        </div>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </header>
  );
}
