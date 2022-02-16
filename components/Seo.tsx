/**
 * Adds SEO-information to the HTML-headers which creates good-looking "cards" in social media platforms like Facebook, Twitter and Slack when sharing the link.
 */
import Head from 'next/head';
import { BASE_URL } from 'URLS';

export type SEOProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};

export default function SEO({
  description = 'Linjeforeningen for Dataingeniør, Digital infrastruktur og cybersikkerhet, Digital forretningsutvikling og Digital samhandling ved NTNU',
  title = 'TIHLDE',
  url = '',
  image = `${BASE_URL}/browser-icons/cover-image.jpg`,
}: SEOProps) {
  return (
    <Head>
      <link href={`${BASE_URL}/browser-icons/apple-icon-72x72.png`} rel='icon' />
      <title>{title === 'TIHLDE' ? title : `${title} | TIHLDE`}</title>
      <meta content={description} name='description' />
      <meta content='website' property='og:type' />
      <meta content={title} property='og:title' />
      <meta content={description} property='og:description' />
      <meta content='TIHLDE' property='og:site_name' />
      <meta content='website' property='og:type' />
      <meta content={`${BASE_URL}${url}`} property='og:url' />
      <meta content={image} property='og:image' />

      <link href={`${BASE_URL}${url}`} rel='canonical' />

      <meta content='summary_large_image' name='twitter:card' />
      <meta content='tihlde.org' property='twitter:domain' />
      <meta content={`${BASE_URL}${url}`} property='twitter:url' />
      <meta content={title} name='twitter:title' />
      <meta content={description} name='twitter:description' />
      <meta content={image} name='twitter:image' />
      <meta content='TIHLDE' property='twitter:creator' />
    </Head>
  );
}
