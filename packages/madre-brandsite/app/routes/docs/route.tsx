import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'Madre - 문서' }, { name: 'description', content: '문서' }];
};

export default function DocsPage() {
  return <div>document</div>;
}
