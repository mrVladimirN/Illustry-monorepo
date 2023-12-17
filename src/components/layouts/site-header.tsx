import { siteConfig } from '@/config/site';
import MainNav from './main-nav';
import MobileNav from './mobile-nav';

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav
          items={siteConfig.mainNav}
        />
      </div>
    </header>
  );
}

export default SiteHeader;
