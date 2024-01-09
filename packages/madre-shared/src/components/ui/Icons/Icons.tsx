import classNames from 'classnames';
import {
  type DetailedHTMLProps,
  forwardRef,
  type PropsWithoutRef,
  type SVGProps,
} from 'react';

import { CrescentMoonIcon, MenuIcon, SunIcon } from './IconComponents';
import styles from './Icons.module.scss';

const iconMap = {
  sun: SunIcon,
  ['crescent-moon']: CrescentMoonIcon,
  menu: MenuIcon,
} as const;

export type IconsProps = DetailedHTMLProps<
  SVGProps<SVGSVGElement>,
  SVGSVGElement
> & {
  type: 'sun' | 'crescent-moon' | 'menu';
  theme?: 'default' | 'primary' | 'warn';
};

export const Icons = forwardRef<SVGSVGElement, PropsWithoutRef<IconsProps>>(
  ({ type, theme = 'default', className, ...props }, ref) => {
    const Component = iconMap[type];

    return Component ? (
      <Component
        className={classNames(styles.Icons, styles[theme], className)}
        ref={ref}
        {...props}
      />
    ) : null;
  },
);
