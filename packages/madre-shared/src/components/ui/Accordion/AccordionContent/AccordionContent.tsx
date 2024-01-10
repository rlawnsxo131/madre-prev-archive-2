import { forwardRef, type PropsWithoutRef } from 'react';

import styles from './AccordionContent.module.scss';

export type AccordionContentProps = PropsWithoutRef<{}>;

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>((props, ref) => {
  return <div ref={ref} className={styles.AccordionContent}></div>;
});
