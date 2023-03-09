import type { AppProps } from 'next/app';
import { inject } from '@vercel/analytics';

inject(); // injects Vercel Analytics

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
  </>
);

export default MyApp;
