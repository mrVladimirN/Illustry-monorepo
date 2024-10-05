import { Metadata } from 'next';
import PlaygroundShell from '@/components/shells/playground-shell';

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
