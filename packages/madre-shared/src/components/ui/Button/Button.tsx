import './Button.scss';

import classNames from 'classnames';
import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';

export type ButtonProps<E extends ElementType> = ComponentPropsWithoutRef<E> & {
  as?: E;
  children?: ReactNode;
  // variant?: keyof typeof _theme;
  // theme?: keyof (typeof _theme)['solid' | 'outline'];
  radius?: 'small' | 'medium' | 'full';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
};

export type ButtonComponent = <E extends ElementType = 'button'>(
  Props: ButtonProps<E> & { ref?: ComponentPropsWithRef<E>['ref'] },
) => ReactNode;

export const Button: ButtonComponent = forwardRef(function <
  E extends ElementType,
>(
  {
    as,
    children,
    // variant = 'solid',
    // theme = 'primary',
    radius = 'medium',
    size = 'medium',
    fullWidth = false,
    ...props
  }: ButtonProps<E>,
  ref?: ComponentPropsWithRef<E>['ref'],
) {
  const Element = as ?? 'button';

  return (
    <Element
      ref={ref}
      className={classNames('Button', size, `radius-${radius}`, {
        'full-width': fullWidth,
      })}
      {...props}
    >
      {children}
    </Element>
  );
});
