import { Inputs } from '@/components/form/add-visualization-form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface ExcelOrCsvWordCloudMappingProps {
  form: UseFormReturn<Inputs>; // Include the form context
}
export function ExcelOrCsvWordCloudMapping({
  form
}: ExcelOrCsvWordCloudMappingProps) {
  return (
    <>
      <div className="flex items-center space-x-4">
        <div className="w-20">Names:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Names"
            defaultValue={form.getValues('mapping.names') || ''}
            onChange={(e) => {
              setTimeout(() => {
                const { value } = e.target;
                form.setValue('mapping.names', value);
              }, 100);
            }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-20">Values:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Values"
            defaultValue={form.getValues('mapping.values') || ''}
            onChange={(e) => {
              setTimeout(() => {
                const { value } = e.target;
                form.setValue('mapping.values', value);
              }, 100);
            }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-20">Properties:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Properties"
            defaultValue={form.getValues('mapping.properties') || ''}
            onChange={(e) => {
              const { value } = e.target;
              form.setValue('mapping.properties', value);
            }}
          />
        </div>
      </div>
    </>
  );
}
