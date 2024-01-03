import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { type PropsWithChildren } from 'react';

import { useVisibleContext } from '../../../../contexts/VisibleContext';
import { Portal } from '../../../utility/Portal';
import { Overlay } from '../../Overlay';
import styles from './DrawerContent.module.scss';

type Props = PropsWithChildren<{
  duration?: number;
  className?: string;
}>;

export function DrawerContent({ children, duration = 0.15, className }: Props) {
  const [visible] = useVisibleContext();

  return (
    <>
      <Overlay visible={visible} />
      <Portal>
        <AnimatePresence>
          {visible && (
            <motion.ul
              className={classNames(styles.DrawerContent, className)}
              initial={{
                translateY: '100%',
                opacity: 0,
              }}
              animate={{
                translateY: 0,
                opacity: 1,
              }}
              exit={{
                translateY: '100%',
                opacity: 0,
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
      </Portal>
    </>
  );
}
