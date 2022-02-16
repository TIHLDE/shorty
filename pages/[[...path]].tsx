/**
 * Shows SEO-info about the page in pages with the given `path` and redirects the user to the page at TIHLDE.org
 */
import { GetServerSideProps } from 'next';
import { sanitizeUrl } from '@braintree/sanitize-url';
import API from 'fetch/api';
import SEO from 'components/Seo';
import Redirect from 'components/Redirect';
import { formatDate, sentryCaptureException, urlEncode } from 'utils';
import URLS from 'URLS';

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
    if (base === 'a') {
      const id = path[1];
      if (Number.isNaN(id)) {
        throw new Error('Id is not a number');
      }
      const event = await API.getEvent(id);
      return {
        props: {
          url: `${URLS.events}${event.id}/${urlEncode(event.title)}/`,
          title: event.title,
          image: event.image,
          description: `${formatDate(event.start_date, { fullDayOfWeek: true, fullMonth: true })} på ${event.location}`,
        },
      };
    }
    if (base === 'k') {
      const id = path[1];
      if (Number.isNaN(id)) {
        throw new Error('Id is not a number');
      }
      const jobpost = await API.getJobPost(id);
      return {
        props: {
          url: `${URLS.jobposts}${jobpost.id}/${urlEncode(jobpost.title)}/`,
          title: jobpost.title,
          image: jobpost.image,
          description: `${jobpost.company}, ${jobpost.location}`,
        },
      };
    }
    if (base === 'n') {
      const id = path[1];
      if (Number.isNaN(id)) {
        throw new Error('Id is not a number');
      }
      const news = await API.getNewsItem(id);
      return {
        props: {
          url: `${URLS.news}${news.id}/${urlEncode(news.title)}/`,
          title: news.title,
          image: news.image,
          description: news.header,
        },
      };
    }
    if (base === 'om' || base === 'wiki') {
      const page = await API.getPage(path.slice(1).join('/'));
      return {
        props: {
          url: `${URLS.wiki}${page.path}${path.length === 1 ? '/' : ''}`,
          title: page.title,
          image: page.image,
          description: `Wiki-side for ${page.title}`,
        },
      };
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
