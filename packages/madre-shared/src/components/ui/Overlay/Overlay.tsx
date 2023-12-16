import { AnimatePresence, motion } from 'framer-motion';
import {
  type ComponentProps,
  forwardRef,
  type MouseEvent,
  type PropsWithoutRef,
} from 'react';

import styles from './Overlay.module.scss';

export type OverlayProps = PropsWithoutRef<
  ComponentProps<typeof motion.div> & {
    visible: boolean;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    duration?: number;
  }
>;

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(function (
  { visible, onClick, duration = 0.15 },
  ref,
) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          className={styles.Overlay}
          onClick={onClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration,
            ease: 'easeIn',
          }}
        />
      )}
    </AnimatePresence>
  );
});
