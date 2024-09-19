'use client';

import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Icons } from '@/components/icons';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import ThemeToggle from './theme-toggle';

interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}
type MainNavItem = NavItemWithOptionalChildren;
interface MainNavProps {
  items?: MainNavItem[];
}

function MainNav({ items }: MainNavProps) {
  return (
    <div className="hidden gap-6 lg:flex">
      <Link
        aria-label="Home"
        href="/"
        className="hidden items-center space-x-2 lg:flex"
      >
        <Icons.logo className="h-6 w-6" aria-hidden="true" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {items?.[0]?.items ? (
            <Link href="/projects" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-auto" id="a">
                    {items[0].title}
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
              </NavigationMenuLink>
            </Link>
          ) : null}
          {items
            ?.filter((item) => item.title !== items[0]?.title)
            .map((item) => (
              <Link key={item.title} href={item.href ? item.href : '/'} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="h-auto capitalize">
                      {item.title}
                    </NavigationMenuTrigger>
                  </NavigationMenuItem>
                </NavigationMenuLink>
              </Link>
            ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex flex-1 items-center justify-end space-x-4">
        <ThemeToggle />
      </div>
    </div>
  );
}

const ListItem = forwardRef<
  ElementRef<'a'>,
  ComponentPropsWithoutRef<'a'>
>(({
  className, title, children, href, ...props
}, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
));
ListItem.displayName = 'ListItem';

export default MainNav;
