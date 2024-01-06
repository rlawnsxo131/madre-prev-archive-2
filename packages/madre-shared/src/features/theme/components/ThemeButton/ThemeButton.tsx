import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  forwardRef,
  type PropsWithoutRef,
} from 'react';

import { Icons, type IconsProps } from '../../../../components/ui/Icons';
import { If } from '../../../../components/utility/If';
import { useTheme } from '../../contexts';
import styles from './ThemeButton.module.scss';

const iconMap = {
  light: 'sun',
  dark: 'crescent-moon',
} as const;

export type ThemeButtonProps = PropsWithoutRef<
  Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'onClick'
  >
> & {
  iconTheme?: IconsProps['theme'];
};

export const ThemeButton = forwardRef<HTMLButtonElement, ThemeButtonProps>(
  ({ iconTheme = 'default', ...props }, ref) => {
    const {
      state: { theme, isSynced },
      actions: { toggle },
    } = useTheme();

    return (
      <button
        ref={ref}
        className={styles.ThemeButton}
        onClick={toggle}
        {...props}
      >
        <If predicate={isSynced}>
          <Icons theme={iconTheme} type={iconMap[theme]} />
        </If>
      </button>
    );
  },
);
