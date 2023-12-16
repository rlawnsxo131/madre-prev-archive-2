import {
  type Attributes,
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
  key?: Attributes['key'];
  className?: HTMLAttributes<HTMLElement>['className'];
  style?: HTMLAttributes<HTMLElement>['style'];
  container?: Element | (() => Element | null) | null;
}>;

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
