import Redirect from 'components/Redirect';
import SEO from 'components/Seo';

export const config = {
  unstable_runtimeJS: false,
};

export default function Home() {
  return (
    <Redirect>
      <SEO />
    </Redirect>
  );
}
