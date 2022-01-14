/**
 * Shows SEO-info about the page in pages with the given `path` and redirects the user to the page at TIHLDE.org
 */
import { GetServerSideProps } from 'next';
import API from 'fetch/api';
import SEO from 'components/Seo';
import { Page } from 'types/Types';
import Redirect from 'components/Redirect';
import { sentryCaptureException } from 'utils';

// https://piccalil.li/quick-tip/disable-client-side-react-with-next-js/
export const config = {
  unstable_runtimeJS: false,
};

export type PagesProps = {
  page: Page;
};

export default function PagesMainPage({ page }: PagesProps) {
  return (
    <Redirect path={`om/${page.path}/`}>
      <SEO description={''} image={page.image || undefined} title={page.title} url={`om/${page.path}/`} />
    </Redirect>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const page = await API.getPage('');
    const data: PagesProps = { page };
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
