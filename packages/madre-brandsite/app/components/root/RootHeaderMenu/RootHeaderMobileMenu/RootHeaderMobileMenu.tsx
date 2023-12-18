import { Button, DropdownMenu, Icons, ThemeButton } from '@madre/shared';
import { NavLink } from '@remix-run/react';
import classNames from 'classnames';

import { DISPLAY_ROUTES } from '@/routes';

import linkStyles from '../RootHeaderLink.module.scss';
import styles from './RootHeaderMobileMenu.module.scss';

type RootHeaderMobileMenuProps = {};

export function RootHeaderMobileMenu(props: RootHeaderMobileMenuProps) {
  return (
    <div className={styles.RootHeaderMobileMenu}>
      <ThemeButton />
      <DropdownMenu>
        {({ visible, close, toggle }) => (
          <DropdownMenu.Root onClickOutside={close}>
            <DropdownMenu.Trigger>
              <button className={styles['theme-button']} onClick={toggle}>
                <Icons type="menu" />
              </button>
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
              <DropdownMenu.Item>
                <Button onClick={close}>시작하기</Button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </DropdownMenu>
    </div>
  );
}
