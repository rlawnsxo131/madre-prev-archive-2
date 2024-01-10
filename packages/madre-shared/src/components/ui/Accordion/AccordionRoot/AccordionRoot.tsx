import { forwardRef, type PropsWithoutRef } from 'react';

import styles from './AccordionRoot.module.scss';

export type AccordionRootProps = PropsWithoutRef<{}>;

export const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(
  (props, ref) => {
    return <div ref={ref} className={styles.AccordionRoot}></div>;
  },
);
