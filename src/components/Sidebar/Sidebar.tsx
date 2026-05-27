import { NavLink } from 'react-router-dom';
import { navConfig } from '../../config/nav';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar} aria-label="Documentation navigation">
      <nav>
        {navConfig.map((group) => (
          <section key={group.group} className={styles.group}>
            <h3 className={styles.groupTitle}>{group.group}</h3>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                    }
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`${styles.badge} ${styles[`badge-${item.badge}`]}`}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </aside>
  );
}
