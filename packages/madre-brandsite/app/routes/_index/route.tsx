import type { MetaFunction } from '@remix-run/node';

import { RootPageSection } from './components/RootPageSection/RootPageSection';
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

export default function RootPage() {
  return (
    <div className={styles.container}>
      <RootPageSection
        imageProps={{
          src: '/svg/undraw_environmental_study_re_bg_1.svg',
          alt: 'background-image-1',
        }}
        descProps={{
          title: '업무중, 내가 살펴야하는 채널이\n너무 많다는 생각이 들었어요.',
          content:
            '그리고 생각했어요.\n내가 보고있는 채널을 한곳에 모아두면 어떨까?',
        }}
      />
      <RootPageSection
        imageProps={{
          src: '/svg/undraw_prototyping_process_bg_2.svg',
          alt: 'background-image-2',
        }}
        descProps={{
          title: '그 공간을 만들었어요.',
          content: '마치 그림을 그리듯,\n자유로운 표현이 가능한 공간을요.',
        }}
      />
    </div>
  );
}
