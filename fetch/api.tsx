import { IFetch } from 'fetch/fetch';
import { Event, JobPost, News, Page, ShortLink } from 'types/Types';

export default {
  getEvent: (eventId: number) => IFetch<Event>(`events/${String(eventId)}/`),
  getJobPost: (id: number) => IFetch<JobPost>(`jobposts/${String(id)}/`),
  getNewsItem: (id: number) => IFetch<News>(`news/${String(id)}/`),
  getPage: (path: string) => IFetch<Page>(`pages/${path}`),
  getShortLink: (slug: string) => IFetch<ShortLink>(`short-links/${slug}/`),
};
