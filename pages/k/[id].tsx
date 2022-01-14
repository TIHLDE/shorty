/**
 * Shows SEO-info about the jobpost with the given `id` and redirects the user to the jobpost at TIHLDE.org
 */
import { GetServerSideProps } from 'next';
import API from 'fetch/api';
import Redirect from 'components/Redirect';
import SEO from 'components/Seo';
import { JobPost } from 'types/Types';
import { sentryCaptureException, urlEncode } from 'utils';

// https://piccalil.li/quick-tip/disable-client-side-react-with-next-js/
export const config = {
  unstable_runtimeJS: false,
};

export type JobPostProps = {
  jobpost: JobPost;
};

export default function JobPostPage({ jobpost }: JobPostProps) {
  return (
    <Redirect path={`karriere/${jobpost.id}/${urlEncode(jobpost.title)}/`}>
      <SEO
        description={`${jobpost.company}, ${jobpost.location}`}
        image={jobpost.image || undefined}
        title={jobpost.title}
        url={`karriere/${jobpost.id}/${urlEncode(jobpost.title)}/`}
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
    const jobpost = await API.getJobPost(Number(id));
    const data: JobPostProps = { jobpost };
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
