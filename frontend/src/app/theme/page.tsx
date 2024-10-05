import { Metadata } from 'next';
import ThemeShell from '@/components/shells/theme-shell';

export const metadata: Metadata = {
  title: 'Theme',
  description: 'Manage your Theme'
};
const Theme = () => <ThemeShell></ThemeShell>;
export default Theme;
