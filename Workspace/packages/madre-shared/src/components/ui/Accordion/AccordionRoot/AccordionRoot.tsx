import classNames from 'classnames';
import {
  type DetailedHTMLProps,
  forwardRef,
  type HTMLAttributes,
  type PropsWithoutRef,
} from 'react';

import { useCombinedRefs } from '../../../../hooks/useCombinedRefs';
import { useOutsideClickAndEscapeEventRef } from '../../../../hooks/useOutsideClickAndEscapeEventRef';
import { useAccordionActions } from '../AccordionProvider';
import styles from './AccordionRoot.module.scss';

export const AccordionRoot = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >
>(({ children, className }, forwardedRef) => {
  const { close } = useAccordionActions();
  const ref = useOutsideClickAndEscapeEventRef<HTMLDivElement>(close);
  const refs = useCombinedRefs(ref, forwardedRef);

  return (
    <div ref={refs} className={classNames(styles.AccordionRoot, className)}>
      {children}
    </div>
  );
});
