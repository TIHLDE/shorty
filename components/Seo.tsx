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
      <meta name='description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content='TIHLDE' />
      <meta content='website' property='og:type' />
      <meta content={`https://tihlde.org/${url}`} property='og:url' />
      <meta content={image} property='og:image' />

      <link rel='canonical' href={`https://tihlde.org/${url}`} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta property='twitter:domain' content='tihlde.org' />
      <meta property='twitter:url' content={`https://tihlde.org/${url}`} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      <meta property='twitter:creator' content='TIHLDE' />
    </Head>
  );
}
