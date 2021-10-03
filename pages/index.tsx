/**
 * Redirects the user to TIHLDE.org
 */
import Redirect from 'components/Redirect';
import SEO from 'components/Seo';

// https://piccalil.li/quick-tip/disable-client-side-react-with-next-js/
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
