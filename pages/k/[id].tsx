import { GetServerSideProps } from 'next';
import API from 'fetch/api';
import Redirect from 'components/Redirect';
import SEO from 'components/Seo';
import { JobPost } from 'types/Types';
import { urlEncode } from 'utils';

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
        title={jobpost.title}
        image={jobpost.image || undefined}
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
    return {
      notFound: true,
    };
  }
};
