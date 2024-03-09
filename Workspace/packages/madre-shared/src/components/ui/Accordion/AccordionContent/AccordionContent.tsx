import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, type PropsWithoutRef, type ReactNode } from 'react';

import { useAccordionState } from '../AccordionProvider';
import styles from './AccordionContent.module.scss';

export type AccordionContentProps = PropsWithoutRef<{}>;

export const AccordionContent = forwardRef<
  HTMLUListElement,
  PropsWithoutRef<{ children: ReactNode; className?: string }>
>(({ children, className }, ref) => {
  const { visible } = useAccordionState();

  return (
    <AnimatePresence>
      {visible && (
        <div className={styles.AccordionContent}>
          <motion.ul ref={ref} className={classNames(styles.items, className)}>
            {children}
          </motion.ul>
        </div>
      )}
    </AnimatePresence>
  );
});
