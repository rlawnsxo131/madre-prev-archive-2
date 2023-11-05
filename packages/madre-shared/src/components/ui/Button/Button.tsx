import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
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
  styles?: SerializedStyles[];
  // variant?: keyof typeof _theme;
  // theme?: keyof (typeof _theme)['solid' | 'outline'];
  radius?: keyof typeof _radius;
  size?: keyof typeof _size;
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
    styles,
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
  const css = styles ?? [];

  return (
    <Element
      ref={ref}
      css={[
        block(fullWidth),
        _size[size],
        // _theme
        _radius[radius],
        ...css,
      ]}
      {...props}
    >
      {children}
    </Element>
  );
});

const block = (fullWidth: boolean) => css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.15s;

  &:active:not([disabled]) {
    transform: scale(0.97, 0.95);
  }
  &:disabled {
    cursor: not-allowed;
  }

  ${fullWidth &&
  css`
    flex: 1;
    width: 100%;
  `}
`;

const _size = {
  small: css`
    height: 1.825rem;
    font-size: 0.9rem;
    padding: 0.25rem 0.725rem;
  `,
  medium: css`
    height: 2rem;
    font-size: 1rem;
    padding: 0.25rem 0.725rem;
  `,
  large: css`
    height: 2.5rem;
    font-size: 1.125rem;
    padding: 0.25rem 1.125rem;
  `,
};

const _radius = {
  none: css`
    border-radius: 0;
  `,
  medium: css`
    border-radius: 0.5rem;
  `,
  full: css`
    border-radius: 2rem;
  `,
};
