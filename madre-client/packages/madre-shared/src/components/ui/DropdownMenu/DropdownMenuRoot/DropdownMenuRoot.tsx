import classNames from 'classnames';
import {
  type DetailedHTMLProps,
  forwardRef,
  type HTMLAttributes,
  type PropsWithoutRef,
} from 'react';

import { useCombinedRefs } from '../../../../hooks/useCombinedRefs';
import { useOutsideClickAndEscapeEventRef } from '../../../../hooks/useOutsideClickAndEscapeEventRef';
import { useDropdownMenuActions } from '../DropdownMenuProvider';
import styles from './DropdownMenuRoot.module.scss';

export const DropdownMenuRoot = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >
>(({ children, className, ...props }, forwardedRef) => {
  const { close } = useDropdownMenuActions();
  const ref = useOutsideClickAndEscapeEventRef<HTMLDivElement>(close);
  const refs = useCombinedRefs(ref, forwardedRef);

  return (
    <div
      ref={refs}
      className={classNames(styles.DropdownMenu, className)}
      {...props}
    >
      {children}
    </div>
  );
});
