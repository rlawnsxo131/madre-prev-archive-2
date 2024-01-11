import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  forwardRef,
  type PropsWithoutRef,
} from 'react';

import { Icons, type IconsProps } from '../../../../components/ui/Icons';
import { If } from '../../../../components/utility/If';
import { useTheme } from '../../providers';
import styles from './ThemeButton.module.scss';

const iconMap = {
  light: 'sun',
  dark: 'crescent-moon',
} as const;

export type ThemeButtonProps = PropsWithoutRef<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> & {
  iconTheme?: IconsProps['theme'];
};

export const ThemeButton = forwardRef<HTMLButtonElement, ThemeButtonProps>(
  ({ iconTheme = 'default', onClick, ...props }, ref) => {
    const [{ theme, isSynced }, { toggle }] = useTheme();

    return (
      <button
        ref={ref}
        className={styles.ThemeButton}
        onClick={(e) => {
          toggle();
          onClick?.(e);
        }}
        {...props}
      >
        <If predicate={isSynced}>
          <Icons theme={iconTheme} type={iconMap[theme]} />
        </If>
      </button>
    );
  },
);
