/**
 * Redirects the user to the given shorturl by the slug.
 * If a shortlink can't be found, the user is redirected to TIHLDE.org using our 404-page
 */
import { GetServerSideProps } from 'next';
import { sanitizeUrl } from '@braintree/sanitize-url';
import API from 'fetch/api';
import Index from 'pages/index';

// https://piccalil.li/quick-tip/disable-client-side-react-with-next-js/
export const config = {
  unstable_runtimeJS: false,
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  try {
    const { slug } = query;
    const shortLink = await API.getShortLink(String(slug));
    if (res) {
      res.writeHead(307, {
        // Sanitizes the url to avoid malicious code in the url
        Location: sanitizeUrl(shortLink.url),
      });
      res.end();
    }
    return { props: {} };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
