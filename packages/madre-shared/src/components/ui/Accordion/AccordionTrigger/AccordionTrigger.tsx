import { forwardRef, type PropsWithoutRef } from 'react';

import styles from './AccordionTrigger.module.scss';

export type AccordionTriggerProps = PropsWithoutRef<{}>;

export const AccordionTrigger = forwardRef<
  HTMLDivElement,
  AccordionTriggerProps
>((props, ref) => {
  return <div ref={ref} className={styles.AccordionTrigger}></div>;
});
