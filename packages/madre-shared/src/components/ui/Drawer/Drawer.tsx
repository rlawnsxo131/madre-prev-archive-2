import { VisibleContextGenerator } from '../../../contexts/generator';
import styles from './Drawer.module.scss';

export type DrawerProps = {};

const VisibleContextProvider = VisibleContextGenerator.excute();

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
