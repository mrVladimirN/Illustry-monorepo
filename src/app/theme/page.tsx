import ThemeShell from '@/components/shells/theme-shell';
import { env } from '@/env.mjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Theme',
  description: 'Manage your Theme'
};
const Theme = () => <ThemeShell></ThemeShell>;
export default Theme;
