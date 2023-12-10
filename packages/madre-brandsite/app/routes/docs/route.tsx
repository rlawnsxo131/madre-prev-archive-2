import type { MetaFunction } from '@remix-run/node';

import { ROUTES } from '@/routes';

export const meta: MetaFunction = () => {
  return [
    { title: `Madre - ${ROUTES.docs.title}` },
    { name: 'description', content: '문서' },
  ];
};

export default function DocsPage() {
  return <div>document</div>;
}
