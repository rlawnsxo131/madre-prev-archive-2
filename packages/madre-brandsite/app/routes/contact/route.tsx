import type { MetaFunction } from '@remix-run/node';

import { ROUTES } from '@/routes';

export const meta: MetaFunction = () => {
  return [
    { title: `Madre - ${ROUTES.contact.title}` },
    { name: 'description', content: '' },
  ];
};

export default function ContactPage() {
  return <div>contact</div>;
}
