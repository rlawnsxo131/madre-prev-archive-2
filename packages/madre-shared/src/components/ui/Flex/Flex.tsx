import classNames from 'classnames';
import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  type ElementType,
  forwardRef,
  type ReactNode,
} from 'react';

import styles from './Flex.module.scss';

export type FlexProps<E extends ElementType> = ComponentPropsWithoutRef<E> & {
  as?: E;
  children?: ReactNode;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'stretch' | 'start' | 'center' | 'end';
  alignSelf?: 'auto' | 'start' | 'center' | 'end';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string | number;
  fullWidth?: boolean;
};

export type FlexComponent = <E extends ElementType = 'div'>(
  Props: FlexProps<E> & { ref?: ComponentPropsWithRef<E>['ref'] },
) => ReactNode;

export const Flex: FlexComponent = forwardRef(function <E extends ElementType>(
  {
    as,
    children,
    direction = 'row',
    justify = 'start',
    align = 'stretch',
    alignSelf = 'auto',
    wrap = 'nowrap',
    gap = 0,
    fullWidth = false,
    className,
    style,
    ...props
  }: FlexProps<E>,
  ref?: ComponentPropsWithRef<E>['ref'],
) {
  const Element = as ?? 'div';

  return (
    <Element
      ref={ref}
      className={classNames(
        styles.Flex,
        styles[direction],
        styles[`justify-${justify}`],
        styles[`align-${align}`],
        styles[`align-self-${alignSelf}`],
        styles[wrap],
        {
          [styles['full-width']]: fullWidth,
        },
        className,
      )}
      style={Object.assign({ gap }, style)}
      {...props}
    >
      {children}
    </Element>
  );
});
