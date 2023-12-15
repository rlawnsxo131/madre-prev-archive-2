import { AnimatePresence, motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

import styles from './DropdownMenuContent.module.scss';

type DropdownMenuContentProps = PropsWithChildren<{
  visible: boolean;
  duration?: number;
}>;

/**
 * @TODO Portal
 */
export function DropdownMenuContent({
  children,
  visible,
  duration = 0.15,
}: DropdownMenuContentProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.ul
          className={styles.DropdownMenuContent}
          initial={{
            translateY: 0,
            opacity: 0,
          }}
          animate={{
            translateY: 1,
            opacity: 1,
          }}
          exit={{
            translateY: 0,
            opacity: 1,
          }}
          transition={{
            duration,
            ease: 'easeIn',
          }}
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
