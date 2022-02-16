import { IFetch } from 'fetch/fetch';
import { Event, JobPost, News, Page, ShortLink } from 'types/Types';

export const EVENTS_ENDPOINT = 'events';
export const JOBPOSTS_ENDPOINT = 'jobposts';
export const NEWS_ENDPOINT = 'news';
export const WIKI_ENDPOINT = 'pages';
export const SHORT_LINKS_ENDPOINT = 'short-links';

export default {
  getEvent: (eventId: string) => IFetch<Event>(`${EVENTS_ENDPOINT}/${eventId}/`),
  getJobPost: (id: string) => IFetch<JobPost>(`${JOBPOSTS_ENDPOINT}/${id}/`),
  getNewsItem: (id: string) => IFetch<News>(`${NEWS_ENDPOINT}/${id}/`),
  getPage: (path: string) => IFetch<Page>(`${WIKI_ENDPOINT}/${path}`),
  getShortLink: (slug: string) => IFetch<ShortLink>(`${SHORT_LINKS_ENDPOINT}/${slug}/`),
};
