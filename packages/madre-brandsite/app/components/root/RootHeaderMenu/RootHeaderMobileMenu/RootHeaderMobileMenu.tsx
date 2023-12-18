import { DropdownMenu } from '@madre/shared';
import { NavLink } from '@remix-run/react';
import classNames from 'classnames';

import { DISPLAY_ROUTES } from '@/routes';

import linkStyles from '../RootHeaderLink.module.scss';
import styles from './RootHeaderMobileMenu.module.scss';

type RootHeaderMobileMenuProps = {};

export function RootHeaderMobileMenu(props: RootHeaderMobileMenuProps) {
  return (
    <div className={styles.RootHeaderMobileMenu}>
      <DropdownMenu>
        {({ visible, close, toggle }) => (
          <DropdownMenu.Root touchOutside={close}>
            <DropdownMenu.Trigger>
              <button onClick={toggle}>메뉴열기</button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content visible={visible} align="right">
              {Object.entries(DISPLAY_ROUTES).map(([_, value]) => (
                <DropdownMenu.Item className={styles.item} key={value.path}>
                  <NavLink
                    to={value.path}
                    className={({ isActive, isPending }) =>
                      classNames(linkStyles.link, {
                        [linkStyles.active]: isActive,
                        [linkStyles.pending]: isPending,
                      })
                    }
                    onClick={close}
                  >
                    {value.title}
                  </NavLink>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </DropdownMenu>
    </div>
  );
}
