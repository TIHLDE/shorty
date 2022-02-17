import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import URLS, { BASE_URL } from 'URLS';
import API from 'fetch/api';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { sentryCaptureException } from 'utils';

export const middleware = async ({ ua, page }: NextRequest) => {
  try {
    const isBot = ua.isBot;
    console.log(ua);
    if (isBot) {
      return NextResponse.next();
    }

    const path = (page.params.path || []) as unknown as Array<string>;
    console.log(path);
    const base = path[0];
    console.log(base);
    console.log(path[1]);
    if (base) {
      console.log('base');
      if (base === 'a') {
        console.log('a');
        return NextResponse.redirect(`${BASE_URL}${URLS.events}${path[1]}/`);
      }
      if (base === 'k') {
        console.log('k');
        return NextResponse.redirect(`${BASE_URL}${URLS.jobposts}${path[1]}/`);
      }
      if (base === 'n') {
        console.log('n');
        return NextResponse.redirect(`${BASE_URL}${URLS.news}${path[1]}/`);
      }
      if (base === 'om' || base === 'wiki') {
        console.log('wiki');
        return NextResponse.redirect(`${BASE_URL}${URLS.wiki}${path.slice(1).join('/')}/`);
      }

      const shortLink = await API.getShortLink(path.join('/'));
      if (shortLink) {
        console.log('short');
        return NextResponse.redirect(sanitizeUrl(shortLink.url));
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      console.log('e', e);
      await sentryCaptureException(e);
    }
  }
  console.log('else');
  return NextResponse.redirect(BASE_URL);
};
