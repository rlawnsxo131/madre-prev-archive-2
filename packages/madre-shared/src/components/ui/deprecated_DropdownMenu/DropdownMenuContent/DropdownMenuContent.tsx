import { AnimatePresence, motion } from 'framer-motion';
import type { BaseSyntheticEvent } from 'react';
import { type PropsWithChildren, useContext } from 'react';

import { useRefEffect } from '../../../../hooks/useRefEffect';
import { DropdownMenuContext } from '../DropdownMenuProvider';
import styles from './DropdownMenuContent.module.scss';

type DropdownMenuContentProps = PropsWithChildren<{
  duration?: number;
}>;

export function DropdownMenuContent({
  children,
  duration = 0.15,
}: DropdownMenuContentProps) {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error(
      'DropdownMenu is only available within DropdownMenuProvider.',
    );
  }

  const ref = useRefEffect((ul: HTMLUListElement) => {
    const handler = (e: BaseSyntheticEvent | MouseEvent | TouchEvent) => {
      if (ul.contains(e.target)) return;
      context.close();
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  return (
    <AnimatePresence initial={false}>
      {context.visible && (
        <motion.ul
          ref={ref}
          className={styles.DropdownMenuContent}
          initial={{
            y: 0,
            opacity: 0,
          }}
          animate={{
            y: 1,
            translateY: 1,
            opacity: 1,
          }}
          exit={{
            y: 0,
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
