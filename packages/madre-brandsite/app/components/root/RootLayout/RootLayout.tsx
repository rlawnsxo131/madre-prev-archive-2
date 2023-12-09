import type { PropsWithChildren } from 'react';

import styles from './RootLayout.module.scss';
import { RootLayoutHeader } from './RootLayoutHeader';
import { RootLayoutMain } from './RootLayoutMain';

export const RootLayout = Object.assign(
  ({ children }: PropsWithChildren) => (
    <div className={styles.container}>{children}</div>
  ),
  {
    Header: RootLayoutHeader,
    Main: RootLayoutMain,
  },
);
