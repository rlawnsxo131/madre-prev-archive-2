import { NavLink } from '@remix-run/react';
import type { ReactNode } from 'react';

import { Routes } from '@/routes';

import styles from './RootLayoutHeader.module.scss';

type RootLayoutHeaderProps = {
  Menu: ReactNode;
};

export function RootLayoutHeader({ Menu }: RootLayoutHeaderProps) {
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
