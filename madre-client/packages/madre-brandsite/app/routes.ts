export const ROUTES = {
  root: {
    path: '/',
    title: '홈',
  },
  docs: {
    path: '/docs',
    title: '사용방법',
  },
  contact: {
    path: '/contact',
    title: '문의',
  },
};

export const DISPLAY_ROUTES = Object.fromEntries(
  Object.entries(ROUTES).filter(
    ([_, value]) => value.path !== ROUTES['root'].path,
  ),
);
