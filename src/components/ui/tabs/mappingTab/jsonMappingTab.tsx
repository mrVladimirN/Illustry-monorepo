import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { Inputs } from '@/components/form/add-visualization-form';
import { UseFormReturn } from 'react-hook-form';
import { VisualizationDetails } from './visualizationDetails';
import { VisualizationType } from './visualizationType';

interface JSONMappingTabProps {
  form: UseFormReturn<Inputs>; // Include the form context
  router: AppRouterInstance;
  fileDetails: boolean;
}
export function JSONMappingTab({
  fileDetails,
  form,
  router
}: JSONMappingTabProps) {
  return (
    <>
      {fileDetails ? (
        <p className="text-green-500">
          JSON files don't need a special mapping
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
