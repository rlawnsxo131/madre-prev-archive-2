import type { PropsWithChildren } from 'react';

import styles from './RootLayoutContainer.module.scss';

type RootLayoutContainerProps = PropsWithChildren;

export function RootLayoutContainer({ children }: RootLayoutContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
