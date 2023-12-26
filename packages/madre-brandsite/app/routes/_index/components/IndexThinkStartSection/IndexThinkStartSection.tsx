import styles from './IndexThinkStartSection.module.scss';

export function IndexThinkStartSection() {
  return (
    <section className={styles.IndexThinkStartSection}>
      <div className={styles.image}>
        <img
          src="/svg/undraw_environmental_study_re_bg_1.svg"
          alt="think-start-section"
        />
      </div>
      <div className={styles.desc}>
        <div className={styles['desc-content']}>
          <h2>
            업무중, 내가 살펴야하는 채널이{'\n'}너무 많다는 생각이 들었어요.
          </h2>
          <p>
            그리고 생각했어요.{'\n'}내가 보고있는 채널을 한곳에 모아두면 어떨까?
          </p>
          <div>
            <h1>TODO - 내용추가</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
