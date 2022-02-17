/**
 * Shows SEO-info about the given page with the given `path` and redirects the user to the page at TIHLDE.org
 */
import { GetServerSideProps } from 'next';
import { sanitizeUrl } from '@braintree/sanitize-url';
import API from 'fetch/api';
import SEO from 'components/Seo';
import Redirect from 'components/Redirect';
import { sentryCaptureException } from 'utils';
import { routes } from 'routes';

// https://piccalil.li/quick-tip/disable-client-side-react-with-next-js/
export const config = {
  unstable_runtimeJS: false,
};

export type ShortyProps = {
  url?: string;
  title?: string;
  description?: string;
  image?: string | null;
};

export default function ShortyPage({ url, title, description, image }: ShortyProps) {
  return (
    <Redirect path={url}>
      <SEO description={description} image={image || undefined} title={title} url={url} />
    </Redirect>
  );
}

export const getServerSideProps: GetServerSideProps<ShortyProps> = async ({ res, query }) => {
  try {
    const { path } = query;
    if (!path || !Array.isArray(path)) {
      return { props: {} };
    }
    const base = path[0];
    const rest = path.slice(1);
    const route = routes.find((route) => route.id === base);
    if (route) {
      const props = await route.getSeo(rest);
      return { props };
    }
    const shortLink = await API.getShortLink(base);
    if (shortLink && res) {
      res
        .writeHead(307, {
          // Sanitizes the url to avoid malicious code in the url
          Location: sanitizeUrl(shortLink.url),
        })
        .end();
    }
    return { props: {} };
  } catch (e) {
    if (e instanceof Error) {
      await sentryCaptureException(e);
    }
    return { props: {} };
  }
};
