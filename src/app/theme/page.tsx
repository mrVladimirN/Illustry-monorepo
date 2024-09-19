import ThemeShell from '@/components/shells/theme-shell';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Theme',
  description: 'Manage your Theme'
};
const Theme = () => <ThemeShell></ThemeShell>;
export default Theme;
