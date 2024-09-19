/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-cycle
import { Inputs } from '@/components/form/add-visualization-form';
import { UseFormReturn } from 'react-hook-form';
import VisualizationDetails from './visualizationDetails';
import VisualizationType from './visualizationType';

interface JSONMappingTabProps {
  form: UseFormReturn<Inputs>; // Include the form context
  router: any;
  fileDetails: boolean;
}
function JSONMappingTab({
  fileDetails,
  form,
  router
}: JSONMappingTabProps) {
  return (
    <>
      {fileDetails ? (
        <p className="text-green-500">
          JSON files don&apos;t need a special mapping
        </p>
      ) : (
        <>
          <VisualizationType form={form} router={router} exclude={false} />
          <VisualizationDetails form={form} />
        </>
      )}
    </>
  );
}

export default JSONMappingTab;
