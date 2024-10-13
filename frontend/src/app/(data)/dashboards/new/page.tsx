import type { Metadata } from 'next';
import { browseVisualizations } from '@/app/_actions/visualization';
import AddDashboardForm from '@/components/form/add-dashboard-form';

const metadata: Metadata = {
  title: 'New Dashboard',
  description: 'Add a new Dashboard'
};
const visualizations = await browseVisualizations({});
const visualizationsObject = visualizations ? visualizations.visualizations?.reduce((acc, { name, type }) => {
  acc[name] = `${name}(${type})`;
  return acc;
}, {} as Record<string, string>) : {};
const NewDashboardPage = () => (
  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-gray-50 rounded-3xl dark:bg-gray-800">
    <div className="space-y-2.5">
      <AddDashboardForm visualizations={visualizationsObject as Record<string, string>} />
    </div>
  </div>
);

export default NewDashboardPage;
export { metadata };
