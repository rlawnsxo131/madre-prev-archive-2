import classNames from 'classnames';
import { Children, cloneElement } from 'react';

import { useDrawerActions } from '../DrawerProvider';
import styles from './DrawerTrigger.module.scss';

type Props = {
  children: JSX.Element;
  className?: string;
};

export function DrawerTrigger({ children, className }: Props) {
  const child = Children.only(children);
  const { toggle } = useDrawerActions();

  return (
    <div className={classNames(styles.DrawerTrigger, className)}>
      {cloneElement(children, {
        ['aria-label']: '메뉴 열기',
        onClick: () =>
          Promise.resolve(child.props.onClick?.()).then(() => toggle()),
      })}
    </div>
  );
}
