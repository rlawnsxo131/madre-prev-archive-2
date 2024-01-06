import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import {
  type ComponentProps,
  forwardRef,
  type MouseEvent,
  type PropsWithoutRef,
} from 'react';

import { Portal } from '../../utility/Portal';
import styles from './Overlay.module.scss';

export type OverlayProps = PropsWithoutRef<
  ComponentProps<typeof motion.div> & {
    visible: boolean;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    duration?: number;
  }
>;

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ visible, onClick, duration = 0.15, className }, ref) => (
    <Portal>
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={ref}
            className={classNames(styles.Overlay, className)}
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
    </Portal>
  ),
);
