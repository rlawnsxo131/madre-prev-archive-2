import { NavLink } from '@remix-run/react';

import styles from './RootLayoutHeader.module.scss';

type RootLayoutHeaderProps = {};

export function RootLayoutHeader(props: RootLayoutHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles['header-content']}>
        <NavLink className={styles['brand-link']} to="/">
          Madre
        </NavLink>
        <div>오른쪽</div>
      </div>
    </header>
  );
}
