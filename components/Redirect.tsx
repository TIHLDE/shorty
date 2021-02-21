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
        Hvis du ikke ble sendte til siden automatisk kan du klikke her: <a href={link}>{link}</a>
      </p>
    </>
  );
}
