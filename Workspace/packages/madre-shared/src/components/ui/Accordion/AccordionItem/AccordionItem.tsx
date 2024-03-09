import { forwardRef, type PropsWithoutRef } from 'react';

import styles from './AccordionItem.module.scss';

export type AccordionItemProps = PropsWithoutRef<{}>;

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (props, ref) => {
    return <div ref={ref} className={styles.AccordionItem}></div>;
  },
);
