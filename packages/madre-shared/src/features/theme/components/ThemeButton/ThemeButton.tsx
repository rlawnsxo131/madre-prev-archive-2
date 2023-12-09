import type { ButtonHTMLAttributes, PropsWithoutRef } from 'react';
import { forwardRef, useEffect, useState } from 'react';

import { SwitchCase } from '../../../..';
import { Icons } from '../../../../components/ui/Icons/Icons';
import type { Theme } from '../../models/models';
import { ThemeModel } from '../../models/models';
import { themeService } from '../../services/themeService';
import styles from './ThemeButton.module.scss';

export type ThemeButtonProps = PropsWithoutRef<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>
>;

export const ThemeButton = forwardRef<HTMLButtonElement, ThemeButtonProps>(
  function (props, ref) {
    const [theme, setTheme] = useState<Theme>(ThemeModel.themes.light);

    const onToggle = () => setTheme(themeService.toggle());

    /**
     * @description storybook preview.tsx 에 storybook-dark-mode 와
     * 바인딩된 이벤트로 인해 초기 darkmode 값이 storybook 내에서만 제대로 set 되지 않음
     */
    useEffect(() => {
      const theme = themeService.getCurrentTheme();
      setTheme(theme);
      themeService.set(theme);
    }, []);

    return (
      <button ref={ref} className={styles.Button} onClick={onToggle} {...props}>
        <SwitchCase
          value={theme}
          caseBy={{
            light: <Icons className={styles[theme]} type="sun" />,
            dark: <Icons className={styles[theme]} type="night" />,
          }}
        />
      </button>
    );
  },
);
