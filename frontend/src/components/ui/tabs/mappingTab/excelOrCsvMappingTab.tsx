/* eslint-disable import/no-cycle */
import { UseFormReturn } from 'react-hook-form';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import { Inputs, fileTypes } from '@/components/form/add-visualization-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../../form';
import { Input } from '../../input';
import Checkbox from '../../checkbox';
import ExcelOrCsvWordCloudMapping from './excelOrCsvMappings/WordCloudMapping';
import VisualizationDetails from './visualizationDetails';
import ExcelOrCsvVisualizationMapping from './excelOrCsvMappings/visualizationDetailsMapping';
import ExcelOrCsvNodeLinkMapping from './excelOrCsvMappings/NodeLinkMapping';
import VisualizationType from './visualizationType';
import ExcelOrCsvCalendarMapping from './excelOrCsvMappings/CalendarMapping';
import ExcelOrCsvAxisChartMapping from './excelOrCsvMappings/AxisChartMapping';
import ExcelOrCsvPieChartFunnelMapping from './excelOrCsvMappings/PieChartFunnelMapping';
import ExcelOrCsvScatterMapping from './excelOrCsvMappings/ScatterMapping';
import ExcelOrCsvHierarchyMapping from './excelOrCsvMappings/HierarchyMapping';

interface ExcelMappingTabProps {
  form: UseFormReturn<Inputs>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router: any;
  fileDetails: boolean;
  selectedFileType: fileTypes;
}
function ExcelOrCsvMappingTab({
  form,
  router,
  fileDetails,
  selectedFileType
}: ExcelMappingTabProps) {
  const renderMapping = (type: visualizationTypesEnum) => {
    if (type) {
      switch (type) {
        case visualizationTypesEnum.WORD_CLOUD:
          return (
            <>
              <div className="space-y-4">
                {fileDetails && <ExcelOrCsvVisualizationMapping form={form} />}
                <ExcelOrCsvWordCloudMapping form={form} />
              </div>
            </>
          );
        case visualizationTypesEnum.FORCE_DIRECTED_GRAPH:
        case visualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING:
        case visualizationTypesEnum.SANKEY:
          return (
            <>
              <div className="space-y-4">
                {fileDetails && <ExcelOrCsvVisualizationMapping form={form} />}
                <ExcelOrCsvNodeLinkMapping form={form} />
              </div>
            </>
          );
        case visualizationTypesEnum.CALENDAR:
          return (
            <>
              <div className="space-y-4">
                {fileDetails && <ExcelOrCsvVisualizationMapping form={form} />}
                <ExcelOrCsvCalendarMapping form={form} />
              </div>
            </>
          );
        case visualizationTypesEnum.BAR_CHART:
        case visualizationTypesEnum.LINE_CHART:
          return (
            <>
              <div className="space-y-4">
                {fileDetails && <ExcelOrCsvVisualizationMapping form={form} />}
                <ExcelOrCsvAxisChartMapping form={form} />
              </div>
            </>
          );
        case visualizationTypesEnum.PIE_CHART:
        case visualizationTypesEnum.FUNNEL:
          return (
            <>
              <div className="space-y-4">
                {fileDetails && <ExcelOrCsvVisualizationMapping form={form} />}
                <ExcelOrCsvPieChartFunnelMapping form={form} />
              </div>
            </>
          );
        case visualizationTypesEnum.SCATTER:
          return (
            <>
              <div className="space-y-4">
                {fileDetails && <ExcelOrCsvVisualizationMapping form={form} />}
                <ExcelOrCsvScatterMapping form={form} />
              </div>
            </>
          );
        case visualizationTypesEnum.TREEMAP:
        case visualizationTypesEnum.SUNBURST:
          return (
            <>
              <div className="space-y-4">
                {fileDetails && <ExcelOrCsvVisualizationMapping form={form} />}
                <ExcelOrCsvHierarchyMapping form={form} />
              </div>
            </>
          );
        default:
          return (
            <>
              <div className="space-y-4">
                {fileDetails && <ExcelOrCsvVisualizationMapping form={form} />}
              </div>
            </>
          );
      }
    }
    return null;
  };
  return (
    <div className="grid grid-cols-2 gap-5">
      {!fileDetails && <VisualizationDetails form={form} />}
      <VisualizationType form={form} router={router} exclude={true} />
      {selectedFileType === fileTypes.EXCEL ? <div className="col-span-1">
        <FormField
          control={form.control}
          name="sheets"
          render={() => (
            <FormItem>
              <FormLabel>Sheets number</FormLabel>
              <FormControl>
                <Input
                  placeholder="How many sheets to include"
                  defaultValue={form.getValues('sheets') || '1'}
                  onChange={(e) => {
                    setTimeout(() => {
                      const { value } = e.target;
                      form.setValue('sheets', value);
                    }, 100);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div> : <div className="col-span-1">
        <FormField
          control={form.control}
          name="separator"
          render={() => (
            <FormItem>
              <FormLabel>Separator</FormLabel>
              <FormControl>
                <Input
                  placeholder="Separator"
                  defaultValue={form.getValues('separator') || ','}
                  onChange={(e) => {
                    setTimeout(() => {
                      const { value } = e.target;
                      form.setValue('separator', value);
                    }, 100);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>}
      <div className="col-span-2">
        <FormField
          control={form.control}
          name="includeHeaders"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <div className=" flex flex-row items-center gap-2">
                    <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Include headers?
                    </p>
                    <Checkbox
                      className="ml-[3%] mt-[0.5%]"
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
              </FormItem>
              <FormMessage />
            </>
          )}
        />
      </div>
      <div className="col-span-2">
        <FormField
          control={form.control}
          name="mapping"
          render={() => (
            <FormItem>
              <FormLabel>Mapping</FormLabel>
              <FormControl>
                {renderMapping(
                  form.getValues('type') as visualizationTypesEnum
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default ExcelOrCsvMappingTab;
