'use client';

import { safeLocalStorage, THEME } from '@madre/shared';
import Script from 'next/script';

type ThemeScriptProps = {};

export function ThemeScript(props: ThemeScriptProps) {
  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: `
          const theme = ${safeLocalStorage.get(THEME.key)};
          if (theme) {
            if (theme === ${THEME.themes.light}) {
              document.documentElement.dataset.theme = 'light';
            } else {
              document.documentElement.dataset.theme = 'dark';
            }
          } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              document.documentElement.dataset.theme = 'dark';
            } else {
              document.documentElement.dataset.theme = 'light';
            }
          }
        `,
      }}
    />
  );
}
