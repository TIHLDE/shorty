import { GetServerSideProps } from 'next';
import API from 'fetch/api';
import SEO from 'components/Seo';
import { Page } from 'types/Types';
import Redirect from 'components/Redirect';

export type PagesProps = {
  page: Page;
};

export default function PagesMainPage({ page }: PagesProps) {
  return (
    <Redirect path={`om/${page.path}/`}>
      <SEO description={''} title={page.title} image={page.image || undefined} url={`om/${page.path}/`} />
    </Redirect>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const page = await API.getPage('');
    const data: PagesProps = { page };
    return { props: data };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
