import { VisibleContextBuilder } from '../../../context/builder';
import styles from './Drawer.module.scss';

export type DrawerProps = {};

const VisibleContextProvider = VisibleContextBuilder.create();

export function Drawer(props: DrawerProps) {
  return (
    <VisibleContextProvider>
      {({ visible, toggle }) => (
        <div className={styles.Drawer}>
          <button onClick={toggle}>click</button>
          {`${visible}`}
        </div>
      )}
    </VisibleContextProvider>
  );
}
