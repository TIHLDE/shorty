import { RequestResponse } from 'types/Types';
import { API_URL } from 'URLS';

// eslint-disable-next-line comma-spacing
export const IFetch = <T,>(url: string): Promise<T> => {
  const urlAddress = API_URL + url;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return fetch(request(urlAddress, headers)).then((response) => {
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json') || !response.ok || response.json === undefined) {
      if (response.json) {
        return response.json().then((responseData: RequestResponse) => {
          throw responseData;
        });
      } else {
        throw { detail: response.statusText } as RequestResponse;
      }
    }
    return response.json().then((responseData: T) => responseData);
  });
};

const request = (url: string, headers: Headers) => {
  return new Request(url, {
    method: 'GET',
    headers: headers,
  });
};
