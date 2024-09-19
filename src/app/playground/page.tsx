import PlaygroundShell from '@/components/shells/playground-shell';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Play with data'
};

const Playground = () => (
    <>
      <PlaygroundShell></PlaygroundShell>
    </>
);

export default Playground;
