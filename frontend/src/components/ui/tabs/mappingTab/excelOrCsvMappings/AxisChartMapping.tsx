import { UseFormReturn } from 'react-hook-form';
import Input from '@/components/ui/input';
import { Inputs } from '@/components/form/types';

type ExcelOrCsvAxisChartMappingProps = {
  form: UseFormReturn<Inputs>;
}

const ExcelOrCsvAxisChartMapping = ({
  form
}: ExcelOrCsvAxisChartMappingProps) => (
    <>
      <div className="flex items-center space-x-4">
        <div className="w-20">Data:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column numbers for Data, coma separated"
            defaultValue={form.getValues('mapping.data') || ''}
            onChange={(e) => {
              setTimeout(() => {
                const { value } = e.target;
                form.setValue('mapping.data', value);
              }, 100);
            }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-20">Headers:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Headers"
            defaultValue={form.getValues('mapping.headers') || ''}
            onChange={(e) => {
              const { value } = e.target;
              form.setValue('mapping.headers', value);
            }}
          />
        </div>
      </div>
    </>
);

export default ExcelOrCsvAxisChartMapping;
