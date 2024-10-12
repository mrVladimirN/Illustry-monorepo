import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import siteConfig from '@/config/site';
import { fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import Toaster from '@/components/ui/toaster';
import {
  ThemeColorsProvider,
  ThemeProvider
} from '@/components/theme-provider';

const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Server Actions',
    'VisualizationHub'
  ],
  authors: [
    {
      name: 'Vladimir',
      url: 'https://github.com/mrVladimirN'
    }
  ],
  creator: 'mrVladimirN'
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
            fontMono.variable
          )}
        >
          <ThemeColorsProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </ThemeColorsProvider>
          <Toaster />
        </body>
      </html>
    </>
);

export default RootLayout;
export { metadata };
