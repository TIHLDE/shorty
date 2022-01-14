/**
 * Shows SEO-info about the event with the given `id` and redirects the user to the event at TIHLDE.org
 */
import { GetServerSideProps } from 'next';
import API from 'fetch/api';
import Redirect from 'components/Redirect';
import SEO from 'components/Seo';
import { Event } from 'types/Types';
import { formatDate, sentryCaptureException, urlEncode } from 'utils';

// https://piccalil.li/quick-tip/disable-client-side-react-with-next-js/
export const config = {
  unstable_runtimeJS: false,
};

export type EventProps = {
  event: Event;
};

export default function EventPage({ event }: EventProps) {
  return (
    <Redirect path={`arrangementer/${event.id}/${urlEncode(event.title)}/`}>
      <SEO
        description={`${formatDate(event.start_date, { fullDayOfWeek: true, fullMonth: true })} på ${event.location}`}
        image={event.image || undefined}
        title={event.title}
        url={`arrangementer/${event.id}/${urlEncode(event.title)}/`}
      />
    </Redirect>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { id } = query;
    if (Number.isNaN(id)) {
      throw new Error('Id is not a number');
    }
    const event = await API.getEvent(Number(id));
    const data: EventProps = { event };
    return { props: data };
  } catch (e) {
    if (e instanceof Error) {
      await sentryCaptureException(e);
    }
    return {
      notFound: true,
    };
  }
};
