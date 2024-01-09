import '@madre/shared/main.scss';

import { ThemeProvider } from '@madre/shared';
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

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>
          <RootLayout>
            <RootLayout.Header Menu={<RootHeaderMenu />} />
            <RootLayout.Main>
              <Outlet />
            </RootLayout.Main>
          </RootLayout>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
