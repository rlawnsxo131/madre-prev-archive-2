import type { PropsWithChildren } from 'react';

import styles from './RootLayoutMain.module.scss';

type RootLayoutMainProps = PropsWithChildren;

export function RootLayoutMain({ children }: RootLayoutMainProps) {
  return <main className={styles.main}>{children}</main>;
}
