import { RootPage as _RootPage } from './components/page/RootPage';

export default function RootPage() {
  return (
    <_RootPage>
      <_RootPage.Section
        imageProps={{
          src: '/img/undraw_environmental_study_re_bg_1.svg',
          alt: 'background-image-1',
        }}
        descProps={{
          title: '업무중, 내가 살펴야하는 채널이\n너무 많다는 생각이 들었어요.',
          content:
            '그리고 생각했어요.\n내가 보고있는 채널을 한곳에 모아두면 어떨까?',
        }}
      />
      <_RootPage.Section
        imageProps={{
          src: '/img/undraw_prototyping_process_bg_2.svg',
          alt: 'background-image-2',
        }}
        descProps={{
          title: '그 공간을 만들었어요.',
          content: '마치 그림을 그리듯,\n자유로운 표현이 가능한 공간을요.',
        }}
      />
    </_RootPage>
  );
}
