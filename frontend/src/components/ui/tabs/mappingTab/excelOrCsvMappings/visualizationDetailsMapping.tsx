import { UseFormReturn } from 'react-hook-form';
import Input from '@/components/ui/input';
import { Inputs } from '@/components/form/types';

type ExcelOrCsvVisualizationMappingProps = {
  form: UseFormReturn<Inputs>;
}

const ExcelOrCsvVisualizationMapping = ({
  form
}: ExcelOrCsvVisualizationMappingProps) => (
    <>
      <div className="flex items-center space-x-4">
        <div className="w-20">Visualization Name:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Visualization Name"
            onChange={(e) => {
              setTimeout(() => {
                const { value } = e.target;
                form.setValue('mapping.visualizationName', value);
              }, 100);
            }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-20">Visualization Description:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Visualization Description"
            onChange={(e) => {
              setTimeout(() => {
                const { value } = e.target;
                form.setValue('mapping.visualizationDescription', value);
              }, 100);
            }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-20">Visualization Tags:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Visualization Tags"
            onChange={(e) => {
              const { value } = e.target;
              form.setValue('mapping.visualizationTags', value);
            }}
          />
        </div>
      </div>
    </>
);

export default ExcelOrCsvVisualizationMapping;
