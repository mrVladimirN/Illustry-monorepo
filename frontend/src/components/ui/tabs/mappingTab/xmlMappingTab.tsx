/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form';
import { Inputs } from '@/components/form/types';
import VisualizationDetails from './visualizationDetails';
import VisualizationType from './visualizationType';

type XMLMappingTabProps = {
  form: UseFormReturn<Inputs>;
  router: any;
  fileDetails: boolean;
}
const XMLMappingTab = ({
  fileDetails,
  form,
  router
}: XMLMappingTabProps) => (
    <>
      {fileDetails ? (
        <p className="text-green-500">
          XML files don&apos;t need a special mapping
        </p>
      ) : (
        <>
          <VisualizationType form={form} router={router} exclude={false} />
          <VisualizationDetails form={form} />
        </>
      )}
    </>
);

export default XMLMappingTab;
