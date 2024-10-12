import { ReactNode } from 'react';
import SiteHeader from '@/components/layouts/site-header';

type PlaygroundLayoutProps = {
  children: ReactNode
}

const PlaygroundLayout = ({ children }: PlaygroundLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col" >
      <SiteHeader />
      <main className="flex-1">{children}</main>
      {/* <SiteFooter /> */}
    </div>
  );
};

export default PlaygroundLayout;
