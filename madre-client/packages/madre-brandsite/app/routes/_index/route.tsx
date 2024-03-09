import { type MetaFunction } from '@remix-run/node';

import { IndexProductPreviewSection } from './components/IndexProductPreviewSection';
import { IndexThinkResultSection } from './components/IndexThinkResultSection';
import { IndexThinkStartSection } from './components/IndexThinkStartSection';
import styles from './route.module.scss';

export const meta: MetaFunction = () => {
  return [
    { title: 'Madre' },
    {
      name: 'description',
      content: '아름답고 효과적인 업무도구.',
    },
  ];
};

export default function Index() {
  return (
    <div className={styles.Index}>
      <IndexProductPreviewSection />
      <IndexThinkStartSection />
      <IndexThinkResultSection />
    </div>
  );
}
