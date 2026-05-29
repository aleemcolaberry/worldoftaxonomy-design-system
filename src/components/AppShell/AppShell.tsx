import type { ReactNode } from 'react';
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';
import styles from './AppShell.module.css';

export interface AppShellProps {
  children: ReactNode;
  /** Full-bleed page (e.g. the playground). Keeps the sidebar. */
  fluid?: boolean;
  /** Show the docs sidebar. Set false for the marketing landing. */
  sidebar?: boolean;
}

export default function AppShell({ children, fluid = false, sidebar = true }: AppShellProps) {
  const mainClass = !sidebar ? styles.mainLanding : fluid ? styles.mainFluid : styles.main;
  const contentClass = !sidebar
    ? styles.contentLanding
    : fluid
      ? styles.contentFluid
      : styles.content;

  return (
    <div className={styles.shell}>
      <Topbar />
      <div className={styles.body}>
        {sidebar && <Sidebar />}
        <main className={mainClass}>
          <div className={contentClass}>{children}</div>
        </main>
      </div>
    </div>
  );
}
