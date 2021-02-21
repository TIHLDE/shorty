import { useEffect, ReactNode } from 'react';

export type RedirectProps = {
  children?: ReactNode;
  path?: string;
};

export default function Redirect({ children, path = '' }: RedirectProps) {
  useEffect(() => {
    window.location.replace(`https://tihlde.org/${path}`);
  }, []);
  return <>{children}</>;
}
