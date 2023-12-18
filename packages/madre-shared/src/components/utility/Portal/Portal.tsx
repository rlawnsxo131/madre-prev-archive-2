import {
  type ComponentType,
  forwardRef,
  type HTMLAttributes,
  type PropsWithoutRef,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

function getContainer(container: PortalProps['container']) {
  return typeof container === 'function' ? container() : container;
}

export type PortalProps = PropsWithoutRef<{
  children?: ReactNode;
  container?: Element | (() => Element | null) | null;
  key?: string | null;
  className?: HTMLAttributes<HTMLElement>['className'];
  style?: HTMLAttributes<HTMLElement>['style'];
}>;

export const Portal = forwardRef<HTMLDivElement, PortalProps>(function (
  { children, key, className, style, container },
  ref,
) {
  const mountNode = getContainer(container) || document.body;

  return createPortal(
    <div ref={ref} className={className} style={style}>
      {children}
    </div>,
    mountNode,
    key,
  );
});

export type WithPortalProps<T> = PortalProps & {
  Component: ComponentType<T>;
};

export function withPortal<
  ComponentProps extends Record<string, unknown> = Record<string, never>,
>({ Component, ...props }: WithPortalProps<ComponentProps>) {
  const Wrapped = (componentProps: ComponentProps) => (
    <Portal {...props}>
      <Component {...componentProps} />
    </Portal>
  );

  return Wrapped;
}
