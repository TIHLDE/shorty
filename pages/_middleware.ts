import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import URLS, { BASE_URL } from 'URLS';
import API from 'fetch/api';
import { sanitizeUrl } from '@braintree/sanitize-url';

export const middleware = async ({ ua, page }: NextRequest) => {
  const isBot = ua.isBot;
  if (isBot) {
    return NextResponse.next();
  }

  const path = page.params.path as unknown as Array<string>;
  const base = path[0];
  if (base === 'a') {
    return NextResponse.redirect(`${BASE_URL}${URLS.events}${path[1]}/`);
  }
  if (base === 'k') {
    return NextResponse.redirect(`${BASE_URL}${URLS.jobposts}${path[1]}/`);
  }
  if (base === 'n') {
    return NextResponse.redirect(`${BASE_URL}${URLS.news}${path[1]}/`);
  }
  if (base === 'om' || base === 'wiki') {
    return NextResponse.redirect(`${BASE_URL}${URLS.wiki}${path.slice(1).join('/')}/`);
  }

  const shortLink = await API.getShortLink(path.join('/'));
  if (shortLink) {
    return NextResponse.redirect(sanitizeUrl(shortLink.url));
  }
  return NextResponse.redirect(BASE_URL);
};
