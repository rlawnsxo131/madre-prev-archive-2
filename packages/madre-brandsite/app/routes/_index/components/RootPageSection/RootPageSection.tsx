import styles from './RootPageSection.module.scss';

type Props = {
  imageProps: {
    src: string;
    alt: string;
  };
  descProps: {
    title: string;
    content: string;
  };
};

export function RootPageSection({ imageProps, descProps }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.image}>
        <img {...imageProps} />
      </div>
      <div className={styles.desc}>
        <div className={styles['desc-content']}>
          <h3>{descProps.title}</h3>
          <h4>{descProps.content}</h4>
        </div>
      </div>
    </section>
  );
}
