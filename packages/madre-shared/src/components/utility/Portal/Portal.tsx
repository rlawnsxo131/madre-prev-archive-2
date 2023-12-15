import type {
  Attributes,
  HTMLAttributes,
  PropsWithoutRef,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = PropsWithoutRef<{
  children?: ReactNode;
  key?: Attributes['key'];
  className?: HTMLAttributes<HTMLElement>['className'];
  style?: HTMLAttributes<HTMLElement>['style'];
  container?: Element | (() => Element | null) | null;
}>;

function getContainer(container: PortalProps['container']) {
  return typeof container === 'function' ? container() : container;
}

export const Portal = forwardRef<HTMLDivElement, PortalProps>(function (
  { children, key, className, style, container },
  ref,
) {
  const mountNode = getContainer(container) || document.body;

  return createPortal(
    <div ref={ref} key={key} className={className} style={style}>
      {children}
    </div>,
    mountNode,
  );
});
