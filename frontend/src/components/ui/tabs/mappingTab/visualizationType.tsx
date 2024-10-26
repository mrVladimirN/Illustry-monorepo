/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form';
import { VisualizationTypes } from '@illustry/types';
import { Inputs } from '@/components/form/types';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../../form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../select';

type VisualizationTypeProp = {
  form: UseFormReturn<Inputs>;
  router: any;
  exclude?: boolean;
}

const VisualizationType = ({
  form,
  router,
  exclude
}: VisualizationTypeProp) => (
    <>
      <div className="col-span-1">
        <FormField
          control={form.control}
          name="type"
          render={() => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  value={form.getValues('type')}
                  onValueChange={(value: VisualizationTypes.VisualizationTypesEnum) => {
                    form.setValue('type', value);
                    router.refresh();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={VisualizationTypes.VisualizationTypesEnum.WORD_CLOUD}>
                      WordCloud
                    </SelectItem>
                    <SelectItem
                      value={VisualizationTypes.VisualizationTypesEnum.FORCE_DIRECTED_GRAPH}
                    >
                      Forced Layout Graph
                    </SelectItem>
                    <SelectItem value={VisualizationTypes.VisualizationTypesEnum.SANKEY}>
                      Sankey
                    </SelectItem>
                    <SelectItem value={VisualizationTypes.VisualizationTypesEnum.CALENDAR}>
                      Calendar
                    </SelectItem>
                    <SelectItem
                      value={VisualizationTypes.VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING}
                    >
                      Hierarchical Edge Bundling
                    </SelectItem>
                    {!exclude && (
                      <SelectItem value={VisualizationTypes.VisualizationTypesEnum.MATRIX}>
                        Matrix
                      </SelectItem>
                    )}
                    <SelectItem value={VisualizationTypes.VisualizationTypesEnum.LINE_CHART}>
                      Line Chart
                    </SelectItem>
                    <SelectItem value={VisualizationTypes.VisualizationTypesEnum.BAR_CHART}>
                      Bar Chart
                    </SelectItem>
                    <SelectItem value={VisualizationTypes.VisualizationTypesEnum.PIE_CHART}>
                      Pie Chart
                    </SelectItem>
                    <SelectItem value={VisualizationTypes.VisualizationTypesEnum.SCATTER}>
                      Scatter
                    </SelectItem>
                    <SelectItem value={VisualizationTypes.VisualizationTypesEnum.TREEMAP}>
                      Treemap
                    </SelectItem>
                    <SelectItem value={VisualizationTypes.VisualizationTypesEnum.SUNBURST}>
                      Sunburst
                    </SelectItem>
                    <SelectItem value={VisualizationTypes.VisualizationTypesEnum.FUNNEL}>
                      Funnel
                    </SelectItem>
                    {!exclude && (
                      <SelectItem value={VisualizationTypes.VisualizationTypesEnum.TIMELINE}>
                        Timeline
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
);

export default VisualizationType;
