import Image from 'next/image';

import styles from './RootPageSection.module.scss';

type RootPageSectionProps = {
  imageProps: {
    src: string;
    alt: string;
  };
  descProps: {
    title: string;
    content: string;
  };
};

export function RootPageSection({
  imageProps,
  descProps,
}: RootPageSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.image}>
        <Image {...imageProps} fill={true} />
      </div>
      <div className={styles.desc}>
        <h3>{descProps.title}</h3>
        <h4>{descProps.content}</h4>
      </div>
    </section>
  );
}
