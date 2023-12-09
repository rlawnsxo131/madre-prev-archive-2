import { NavLink } from '@remix-run/react';
import type { PropsWithChildren, ReactNode } from 'react';

import { Routes } from '@/routes';

import styles from './RootLayout.module.scss';

function RootLayoutHeader({ Menu }: { Menu: ReactNode }) {
  return (
    <header className={styles.header}>
      <div className={styles['header-content']}>
        <NavLink className={styles['brand-link']} to={Routes.root.path}>
          Madre
        </NavLink>
        {Menu}
      </div>
    </header>
  );
}

function RootLayoutMain({ children }: PropsWithChildren) {
  return <main className={styles.main}>{children}</main>;
}

export const RootLayout = Object.assign(
  ({ children }: PropsWithChildren) => (
    <div className={styles.container}>{children}</div>
  ),
  {
    Header: RootLayoutHeader,
    Main: RootLayoutMain,
  },
);
