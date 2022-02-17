import API from 'fetch/api';
import { ShortyProps } from 'pages/[[...path]]';
import URLS, { BASE_URL } from 'URLS';
import { formatDate, urlEncode } from 'utils';

type Route = {
  id: string;
  getSeo: (path: Array<string>) => Promise<ShortyProps>;
  getQuick: (path: Array<string>) => string;
};

const eventRoute: Route = {
  id: 'a',
  getSeo: async (path) => {
    if (!path[0] || Number.isNaN(path[0])) {
      throw new Error('Id is not a number');
    }
    const event = await API.getEvent(path[0]);
    return {
      url: `${URLS.events}${event.id}/${urlEncode(event.title)}/`,
      title: event.title,
      image: event.image,
      description: `${formatDate(event.start_date, { fullDayOfWeek: true, fullMonth: true })} på ${event.location}`,
    };
  },
  getQuick: (path) => (path[0] ? `${BASE_URL}${URLS.events}${path[0]}/` : `${BASE_URL}/404/`),
};

const jobpostRoute: Route = {
  id: 'k',
  getSeo: async (path) => {
    if (!path[0] || Number.isNaN(path[0])) {
      throw new Error('Id is not a number');
    }
    const jobpost = await API.getJobPost(path[0]);
    return {
      url: `${URLS.jobposts}${jobpost.id}/${urlEncode(jobpost.title)}/`,
      title: jobpost.title,
      image: jobpost.image,
      description: `${jobpost.company}, ${jobpost.location}`,
    };
  },
  getQuick: (path) => (path[0] ? `${BASE_URL}${URLS.jobposts}${path[0]}/` : `${BASE_URL}/404/`),
};

const newsRoute: Route = {
  id: 'n',
  getSeo: async (path) => {
    if (!path[0] || Number.isNaN(path[0])) {
      throw new Error('Id is not a number');
    }
    const news = await API.getNewsItem(path[0]);
    return {
      url: `${URLS.news}${news.id}/${urlEncode(news.title)}/`,
      title: news.title,
      image: news.image,
      description: news.header,
    };
  },
  getQuick: (path) => (path[0] ? `${BASE_URL}${URLS.news}${path[0]}/` : `${BASE_URL}/404/`),
};

const wikiRoute: Route = {
  id: 'wiki',
  getSeo: async (path) => {
    const page = await API.getPage(path.slice(1).join('/'));
    return {
      url: `${URLS.wiki}${page.path}${path.length === 1 ? '/' : ''}`,
      title: page.title,
      image: page.image,
      description: `Wiki-side for ${page.title}`,
    };
  },
  getQuick: (path) => `${BASE_URL}${URLS.wiki}${path.slice(1).join('/')}/`,
};

const omRoute: Route = {
  ...wikiRoute,
  id: 'om',
};

export const routes = [eventRoute, jobpostRoute, newsRoute, wikiRoute, omRoute];
