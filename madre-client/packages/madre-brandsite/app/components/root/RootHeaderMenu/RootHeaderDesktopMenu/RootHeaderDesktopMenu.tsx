import { Button, ThemeButton } from '@madre/shared';
import { NavLink } from '@remix-run/react';
import classNames from 'classnames';

import { DISPLAY_ROUTES } from '@/routes';

import linkStyles from '../RootHeaderLink.module.scss';
import styles from './RootHeaderDesktopMenu.module.scss';

export function RootHeaderDesktopMenu() {
  return (
    <div className={styles.RootHeaderDesktopMenu}>
      <ul className={styles.list}>
        {Object.entries(DISPLAY_ROUTES).map(([_, value]) => (
          <li className={styles.item} key={value.path}>
            <NavLink
              to={value.path}
              className={({ isActive, isPending }) =>
                classNames(linkStyles.link, {
                  [linkStyles.active]: isActive,
                  [linkStyles.pending]: isPending,
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
      <ThemeButton />
    </div>
  );
}
