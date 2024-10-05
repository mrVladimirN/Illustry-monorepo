/* eslint-disable import/no-cycle */
import { UseFormReturn } from 'react-hook-form';
import { Inputs } from '@/components/form/add-visualization-form';
import { Input } from '@/components/ui/input';

interface ExcelOrCsvPieChartFunnelMappingProps {
  form: UseFormReturn<Inputs>;
}
function ExcelOrCsvPieChartFunnelMapping({
  form
}: ExcelOrCsvPieChartFunnelMappingProps) {
  return (
    <>
      <div className="flex items-center space-x-4">
        <div className="w-20">Names:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column numbers for Names"
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
            placeholder="Column numbers for Values"
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

    </>
  );
}

export default ExcelOrCsvPieChartFunnelMapping;
