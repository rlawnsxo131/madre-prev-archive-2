import classNames from 'classnames';
import { type SVGProps } from 'react';

import { CrescentMoonIcon, MenuIcon, SunIcon } from './IconComponents';
import styles from './Icons.module.scss';

const iconMap = {
  sun: SunIcon,
  ['crescent-moon']: CrescentMoonIcon,
  menu: MenuIcon,
} as const;

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
  const _className = classNames(styles.Icons, styles[theme], className);
  const Component = iconMap[type];

  if (Component) {
    return <Component className={_className} {...props} />;
  }

  return null;
}
