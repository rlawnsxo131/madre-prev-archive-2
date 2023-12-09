import type { PropsWithChildren } from 'react';

import styles from './RootPageContainer.module.scss';

type RootPageContainerProps = PropsWithChildren;

export function RootPageContainer({ children }: RootPageContainerProps) {
  return <div className={styles.root}>{children}</div>;
}
