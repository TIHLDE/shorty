/**
 * Redirect user immediately if not bot, else show seo-info
 */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { BASE_URL } from 'URLS';
import API from 'fetch/api';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { sentryCaptureException } from 'utils';
import { routes } from 'routes';

export const middleware = async ({ ua, page }: NextRequest) => {
  try {
    const isBot = ua.isBot;
    if (isBot) {
      return NextResponse.next();
    }

    const path = (page.params.path || []) as unknown as Array<string> | string;
    const pathArray = Array.isArray(path) ? path : path.split('/');
    const base = pathArray[0];
    const rest = pathArray.slice(1);
    const route = routes.find((route) => route.id === base);

    if (route) {
      return NextResponse.redirect(route.getQuick(rest));
    }

    const shortLink = await API.getShortLink(pathArray.join('/'));
    if (shortLink) {
      return NextResponse.redirect(sanitizeUrl(shortLink.url));
    }
  } catch (e) {
    if (e instanceof Error) {
      await sentryCaptureException(e);
    }
  }
  return NextResponse.redirect(BASE_URL);
};
