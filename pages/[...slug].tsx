import { GetServerSideProps } from 'next';
import API from 'fetch/api';
import Index from 'pages/index';

export const config = {
  unstable_runtimeJS: false,
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  try {
    const { slug } = query;
    const shortLink = await API.getShortLink(String(slug));
    if (res) {
      res.writeHead(301, {
        Location: shortLink.url,
      });
      res.end();
    }
    return { props: {} };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
