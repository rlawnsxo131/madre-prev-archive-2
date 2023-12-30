import { cloneElement, type HTMLAttributes, isValidElement } from 'react';

export function Slot({
  children,
  ...props
}: HTMLAttributes<HTMLElement> & { children: JSX.Element }) {
  if (!isValidElement(children)) {
    throw new Error('children is not JSX.Element');
  }

  return cloneElement(children, {
    ...props,
  });
}
