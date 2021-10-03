/**
 * Redirects the user with JS to the given path at TIHLDE.org.
 * The redirect is done with JS to ensure that bots/scrapers that visit the url to find SEO-info finds the headers before the redirection is done.
 * The do find the headers because they normally don't run the JS on the page and our redirection is therefore not executed.
 */
import { ReactNode } from 'react';
import Head from 'next/head';

export type RedirectProps = {
  children?: ReactNode;
  path?: string;
};

export default function Redirect({ children, path = '' }: RedirectProps) {
  const link = `https://tihlde.org/${path}`;
  return (
    <>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: `window.location.replace("${link}");` }} />
      </Head>
      {children}
      <p>
        Hvis du ikke ble sendt til siden automatisk kan du klikke her: <a href={link}>{link}</a>
      </p>
    </>
  );
}
