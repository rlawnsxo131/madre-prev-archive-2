import classNames from 'classnames';
import { Children, cloneElement } from 'react';

import { useVisibleContext } from '../../../../contexts/VisibleContext';
import styles from './DropdownMenuItem.module.scss';

type Props = {
  children: JSX.Element;
  className?: string;
};

export function DropdownMenuItem({ children, className }: Props) {
  const child = Children.only(children);
  const { close } = useVisibleContext();

  return (
    <li className={classNames(styles.DropdownMenuItem, className)}>
      {cloneElement(children, {
        ['data-john']: '',
        onClick: () =>
          Promise.resolve(child.props.onClick?.()).then(() => close()),
      })}
    </li>
  );
}
