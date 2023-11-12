import classnames from 'classnames';
import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';

import styles from './Button.module.scss';

export type ButtonProps<E extends ElementType> = ComponentPropsWithoutRef<E> & {
  as?: E;
  children?: ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  theme?: 'primary' | 'primary-low' | 'secondary' | 'warn';
  radius?: 'none' | 'medium' | 'full';
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
    variant = 'solid',
    theme = 'primary',
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
      className={classnames(
        styles['Button'],
        styles[size],
        styles[`radius-${radius}`],
        styles[variant],
        styles[theme],
        {
          [styles['full-width']]: fullWidth,
        },
      )}
      {...props}
    >
      {children}
    </Element>
  );
});
