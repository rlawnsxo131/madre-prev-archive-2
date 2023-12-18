import classNames from 'classnames';
import { type SVGProps } from 'react';

import { CrescentMoonIcon, MenuIcon, SunIcon } from './IconComponents';
import styles from './Icons.module.scss';

export type IconsProps = SVGProps<SVGSVGElement> & {
  type: 'sun' | 'crescent-moon' | 'menu';
  theme?: 'default' | 'primary' | 'warn';
};

export function Icons({
  type,
  theme = 'default',
  className,
  ...props
}: IconsProps) {
  switch (type) {
    case 'sun':
      return (
        <SunIcon
          className={classNames(styles.Icons, styles[theme], className)}
          {...props}
        />
      );
    case 'crescent-moon':
      return (
        <CrescentMoonIcon
          className={classNames(styles.Icons, styles[theme], className)}
          {...props}
        />
      );
    case 'menu':
      return (
        <MenuIcon
          className={classNames(styles.Icons, styles[theme], className)}
          {...props}
        />
      );
    default:
      return null;
  }
}
