import styles from './IndexThinkResultSection.module.scss';

export function IndexThinkResultSection() {
  return (
    <section className={styles.IndexThinkResultSection}>
      <div className={styles.image}>
        <img
          src="/svg/undraw_prototyping_process_bg_2.svg"
          alt="think-result-section"
        />
      </div>
      <div className={styles.desc}>
        <div className={styles['desc-content']}>
          <h2>그래서 그 공간을 만들었어요.</h2>
          <p>마치 그림을 그리듯,{'\n'}자유로운 표현이 가능한 공간을요.</p>
          <div>
            <h1>TODO - 내용추가</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
