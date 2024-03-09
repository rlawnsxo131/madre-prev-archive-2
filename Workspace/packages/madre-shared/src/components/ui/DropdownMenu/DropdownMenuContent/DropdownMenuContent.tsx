import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, type PropsWithoutRef, type ReactNode } from 'react';

import { Portal } from '../../../utility/Portal';
import {
  useDropdownMenuOptions,
  useDropdownMenuState,
} from '../DropdownMenuProvider';
import styles from './DropdownMenuContent.module.scss';

export const DropdownMenuContent = forwardRef<
  HTMLUListElement,
  PropsWithoutRef<{ children: ReactNode; className?: string }>
>(({ children, className }, ref) => {
  const { visible } = useDropdownMenuState();
  const { align, duration, isPortal, portalProps } = useDropdownMenuOptions();

  const Component = (
    <AnimatePresence>
      {visible && (
        <div className={styles.DropdownMenuContent}>
          <motion.ul
            ref={ref}
            className={classNames(styles.items, styles[align], className)}
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
              opacity: 0,
            }}
            transition={{
              duration,
              ease: 'easeIn',
            }}
          >
            {children}
          </motion.ul>
        </div>
      )}
    </AnimatePresence>
  );

  if (isPortal) {
    return <Portal {...portalProps}>{Component}</Portal>;
  }

  return Component;
});
