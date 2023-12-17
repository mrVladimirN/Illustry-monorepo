import type { Metadata } from 'next';
import { env } from '@/env.mjs';
import { AddVisualizationForm } from '@/components/form/add-visualization-form';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'New Visualization',
  description: 'Add some visualizations'
};

export default async function NewVisualizationPage() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-gray-50 rounded-3xl dark:bg-gray-800">
      <div className="space-y-2.5">
        <AddVisualizationForm />
      </div>
    </div>
  );
}
