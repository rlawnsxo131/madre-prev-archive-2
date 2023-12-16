import {
  type ButtonHTMLAttributes,
  forwardRef,
  type PropsWithoutRef,
  useEffect,
  useState,
} from 'react';

import { Icons } from '../../../../components/ui/Icons';
import { type Theme, ThemeModel } from '../../models';
import { ThemeService } from '../../services';
import styles from './ThemeButton.module.scss';

const iconMap = {
  light: 'sun',
  dark: 'crescent-moon',
} as const;

export type ThemeButtonProps = PropsWithoutRef<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>
>;

export const ThemeButton = forwardRef<HTMLButtonElement, ThemeButtonProps>(
  function (props, ref) {
    const [theme, setTheme] = useState<Theme>(ThemeModel.themes.light);

    const onToggle = () => setTheme(ThemeService.toggle());

    /**
     * @description storybook preview.tsx 에 storybook-dark-mode 와
     * 바인딩된 이벤트로 인해 초기 darkmode 값이 storybook 내에서만 제대로 set 되지 않음
     */
    useEffect(() => {
      const theme = ThemeService.getCurrentTheme();
      setTheme(theme);
      ThemeService.set(theme);
    }, []);

    return (
      <button
        ref={ref}
        className={styles.ThemeButton}
        onClick={onToggle}
        {...props}
      >
        <Icons className={styles[theme]} type={iconMap[theme]} />
      </button>
    );
  },
);
