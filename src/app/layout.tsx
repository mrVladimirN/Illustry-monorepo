import type { Metadata } from "next";
import { env } from "@/env.mjs";

import "./globals.css";

import { siteConfig } from "@/config/site";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import {
  ThemeColorsProvider,
  ThemeProvider,
} from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Server Actions",
    "VisualizationHub",
  ],
  authors: [
    {
      name: "Vladimir",
      url: "https://github.com/mrVladimirN",
    },
  ],
  creator: "mrVladimirN",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
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
}
