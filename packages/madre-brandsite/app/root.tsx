import '@madre/shared/main.scss';

import { type LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { RootHeaderMenu } from './components/root/RootHeaderMenu';
import { RootLayout } from './components/root/RootLayout';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'icon',
      href: '/favicon.png',
      type: 'image/png',
    },
  ];
};

export default function App() {
  return (
    <html
      lang="en"
      // suppressContentEditableWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <RootLayout>
          <RootLayout.Header Menu={<RootHeaderMenu />} />
          <RootLayout.Main>
            <Outlet />
          </RootLayout.Main>
        </RootLayout>
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
