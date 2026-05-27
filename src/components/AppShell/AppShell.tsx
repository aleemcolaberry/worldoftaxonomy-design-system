import type { ReactNode } from 'react';
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';
import styles from './AppShell.module.css';

export interface AppShellProps {
  children: ReactNode;
  /** Set `fluid` for full-bleed pages like the playground. */
  fluid?: boolean;
}

export default function AppShell({ children, fluid = false }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <Topbar />
      <div className={styles.body}>
        <Sidebar />
        <main className={fluid ? styles.mainFluid : styles.main}>
          <div className={fluid ? styles.contentFluid : styles.content}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
