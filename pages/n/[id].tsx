import { GetServerSideProps } from 'next';
import API from 'fetch/api';
import Redirect from 'components/Redirect';
import SEO from 'components/Seo';
import { News } from 'types/Types';
import { urlEncode } from 'utils';

export type NewsProps = {
  news: News;
};

export default function NewsPage({ news }: NewsProps) {
  return (
    <Redirect path={`nyheter/${news.id}/${urlEncode(news.title)}/`}>
      <SEO description={news.header} title={news.title} image={news.image || undefined} url={`nyheter/${news.id}/${urlEncode(news.title)}/`} />
    </Redirect>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { id } = query;
    if (Number.isNaN(id)) {
      throw new Error('Id is not a number');
    }
    const news = await API.getNewsItem(Number(id));
    const data: NewsProps = { news };
    return { props: data };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
