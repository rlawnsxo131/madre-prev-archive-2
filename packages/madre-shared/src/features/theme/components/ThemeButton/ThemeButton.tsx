import {
  type ButtonHTMLAttributes,
  forwardRef,
  type PropsWithoutRef,
} from 'react';

import { Icons, type IconsProps } from '../../../../components/ui/Icons';
import { useTheme } from '../../contexts';
import styles from './ThemeButton.module.scss';

const iconMap = {
  light: 'sun',
  dark: 'crescent-moon',
} as const;

export type ThemeButtonProps = PropsWithoutRef<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>
> & {
  iconTheme?: IconsProps['theme'];
};

export const ThemeButton = forwardRef<HTMLButtonElement, ThemeButtonProps>(
  function ({ iconTheme = 'default', ...props }, ref) {
    const {
      theme,
      actions: { toggle },
    } = useTheme();

    return (
      <button
        ref={ref}
        className={styles.ThemeButton}
        onClick={toggle}
        {...props}
      >
        <Icons theme={iconTheme} type={iconMap[theme]} />
      </button>
    );
  },
);
