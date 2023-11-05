import { css } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ComponentProps, MouseEvent, PropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import { zIndices } from '../../../styles/zIndices';

/**
 * @description ...props 의 형태로 motion.div 의 모든 props 를 받는 경우
 * 아래 경고가 발생하므로 필요할때 props 요소를 하나씩 추가 정의
 *
 * react-dom.development.js:86 Warning: Unknown event handler property `onPointerEnterCapture`. It will be ignored.
 */
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
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          css={block}
          ref={ref}
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

const block = css`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(100, 100, 100, 0.5);
  z-index: ${zIndices['overlay']};

  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
`;
