'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Icons } from '@/components/icons';
import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';

interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}
export type MainNavItem = NavItemWithOptionalChildren;
interface MobileNavProps {
  items?: MainNavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild suppressHydrationWarning>
        <Button
          suppressHydrationWarning
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Icons.menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          <Link
            aria-label="Home"
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Icons.logo className="mr-2 h-4 w-4" aria-hidden="true" />
            <span className="font-bold">{siteConfig.name}</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            {items?.map((item) => (
              <MobileLink
                key={item.title}
                href={item.href ? item.href : '/'}
                pathname={pathname}
                setIsOpen={setIsOpen}
                disabled={item.disabled}
              >
                {item.title}
              </MobileLink>
            ))}
            <div className="my-4 h-[calc(100vh-8rem)] pb-10">
              <ThemeToggle />
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  children?: React.ReactNode;
  href: string;
  disabled?: boolean;
  pathname: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  setIsOpen
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
        pathname === href,
        disabled && 'pointer-events-none opacity-60'
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
}
