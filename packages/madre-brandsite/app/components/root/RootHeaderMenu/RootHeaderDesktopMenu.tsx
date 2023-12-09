import { NavLink } from '@remix-run/react';
import classNames from 'classnames';

import { Routes } from '@/routes';

import styles from './RootHeaderDesktopMenu.module.scss';

type RootHeaderDesktopMenuProps = {};

export function RootHeaderDesktopMenu(props: RootHeaderDesktopMenuProps) {
  return (
    <ul className={styles.container}>
      {Object.entries(Routes).map(([_, value]) => (
        <li className={styles.item} key={value.path}>
          <NavLink
            to={value.path}
            className={({ isActive, isPending }) =>
              classNames(styles.link, {
                [styles.active]: isActive,
                [styles.pending]: isPending,
              })
            }
          >
            {value.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
