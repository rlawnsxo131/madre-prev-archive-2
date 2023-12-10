import { Button } from '@madre/shared';
import { NavLink } from '@remix-run/react';
import classNames from 'classnames';

import { ROUTES } from '@/routes';

import styles from './RootHeaderDesktopMenu.module.scss';

type RootHeaderDesktopMenuProps = {};

export function RootHeaderDesktopMenu(props: RootHeaderDesktopMenuProps) {
  return (
    <ul className={styles.container}>
      {Object.entries(ROUTES).map(([_, value]) => (
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
      <li className={styles.item}>
        <Button>시작하기</Button>
      </li>
    </ul>
  );
}
