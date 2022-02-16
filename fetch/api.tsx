import { IFetch } from 'fetch/fetch';
import { Event, JobPost, News, Page, ShortLink } from 'types/Types';

export const EVENTS_ENDPOINT = 'events';
export const JOBPOSTS_ENDPOINT = 'jobposts';
export const NEWS_ENDPOINT = 'news';
export const WIKI_ENDPOINT = 'pages';
export const SHORT_LINKS_ENDPOINT = 'short-links';

export default {
  getEvent: (eventId: number) => IFetch<Event>(`${EVENTS_ENDPOINT}/${String(eventId)}/`),
  getJobPost: (id: number) => IFetch<JobPost>(`${JOBPOSTS_ENDPOINT}/${String(id)}/`),
  getNewsItem: (id: number) => IFetch<News>(`${NEWS_ENDPOINT}/${String(id)}/`),
  getPage: (path: string) => IFetch<Page>(`${WIKI_ENDPOINT}/${path}`),
  getShortLink: (slug: string) => IFetch<ShortLink>(`${SHORT_LINKS_ENDPOINT}/${slug}/`),
};
