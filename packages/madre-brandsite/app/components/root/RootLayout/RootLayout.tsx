import { NavLink } from '@remix-run/react';
import { type PropsWithChildren, type ReactNode } from 'react';

import { ROUTES } from '@/routes';

import styles from './RootLayout.module.scss';

function Root({ children }: PropsWithChildren) {
  return <div className={styles.RootLayout}>{children}</div>;
}

function Header({ Menu }: { Menu: ReactNode }) {
  return (
    <header className={styles.header}>
      <div className={styles['header-content']}>
        <NavLink className={styles['brand-link']} to={ROUTES.root.path}>
          Madre
        </NavLink>
        {Menu}
      </div>
    </header>
  );
}

function Main({ children }: PropsWithChildren) {
  return <main className={styles.main}>{children}</main>;
}

export const RootLayout = Object.assign(Root, {
  Header,
  Main,
});
