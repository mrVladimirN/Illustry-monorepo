import { SiteHeader } from '@/components/layouts/site-header';

interface IntroLayoutProps {
  children: React.ReactNode;
}

export default async function ThemeLayout({ children }: IntroLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
