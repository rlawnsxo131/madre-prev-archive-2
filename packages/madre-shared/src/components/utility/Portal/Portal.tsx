import { useIsomorphicLayoutEffect } from 'framer-motion';
import {
  type ComponentType,
  type DetailedHTMLProps,
  forwardRef,
  type HTMLAttributes,
  type PropsWithoutRef,
  type ReactNode,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

function getContainer(container: PortalProps['container']) {
  return typeof container === 'function' ? container() : container;
}

export type PortalProps = PropsWithoutRef<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> &
  PropsWithoutRef<{
    children?: ReactNode;
    container?: Element | (() => Element | null) | null;
    key?: string | null;
  }>;

export const Portal = forwardRef<HTMLDivElement, PortalProps>(
  ({ children, key, container, ...props }, ref) => {
    const [node, setNode] = useState<Element | null>(null);

    useIsomorphicLayoutEffect(() => {
      setNode(getContainer(container) || document.body);
    }, [container]);

    if (!node) return null;

    return createPortal(
      <div ref={ref} {...props}>
        {children}
      </div>,
      node,
      key,
    );
  },
);

export type WithPortalProps<T> = PortalProps & {
  Component: ComponentType<T>;
};

export function withPortal<
  ComponentProps extends Record<string, unknown> = Record<string, never>,
>({ Component, ...props }: WithPortalProps<ComponentProps>) {
  const WithPortal = (componentProps: ComponentProps) => (
    <Portal {...props}>
      <Component {...componentProps} />
    </Portal>
  );

  const displayName = Component.displayName || Component.name || 'Component';
  WithPortal.displayName = displayName;

  return WithPortal;
}
