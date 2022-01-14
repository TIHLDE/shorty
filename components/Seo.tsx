/**
 * Adds SEO-information to the HTML-headers which creates good-looking "cards" in social media platforms like Facebook, Twitter and Slack when sharing the link.
 */
import Head from 'next/head';

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
  image = 'https://tihlde.org/browser-icons/cover-image.jpg',
}: SEOProps) {
  return (
    <Head>
      <link href='https://tihlde.org/browser-icons/apple-icon-72x72.png' rel='icon' />
      <title>{title === 'TIHLDE' ? title : `${title} | TIHLDE`}</title>
      <meta content={description} name='description' />
      <meta content='website' property='og:type' />
      <meta content={title} property='og:title' />
      <meta content={description} property='og:description' />
      <meta content='TIHLDE' property='og:site_name' />
      <meta content='website' property='og:type' />
      <meta content={`https://tihlde.org/${url}`} property='og:url' />
      <meta content={image} property='og:image' />

      <link href={`https://tihlde.org/${url}`} rel='canonical' />

      <meta content='summary_large_image' name='twitter:card' />
      <meta content='tihlde.org' property='twitter:domain' />
      <meta content={`https://tihlde.org/${url}`} property='twitter:url' />
      <meta content={title} name='twitter:title' />
      <meta content={description} name='twitter:description' />
      <meta content={image} name='twitter:image' />
      <meta content='TIHLDE' property='twitter:creator' />
    </Head>
  );
}
