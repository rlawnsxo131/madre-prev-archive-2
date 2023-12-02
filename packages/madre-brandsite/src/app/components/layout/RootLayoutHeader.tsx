import Link from 'next/link';

import styles from './RootLayoutHeader.module.scss';

type RootLayoutHeaderProps = {};

export function RootLayoutHeader(props: RootLayoutHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles['header-content']}>
        <Link className={styles['brand-link']} href="/">
          Madre
        </Link>
        <div>오른쪽</div>
      </div>
    </header>
  );
}
