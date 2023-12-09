import { Inputs } from "@/components/form/add-visualization-form";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { visualizationTypesEnum } from "@/lib/validation/visualizations";
export interface VisualizationTypeProp {
  form: UseFormReturn<Inputs>; // Include the form context
  router: AppRouterInstance;
  exclude?: boolean;
}

export function VisualizationType({
  form,
  router,
  exclude,
}: VisualizationTypeProp) {
  return (
    <>
      <div className="col-span-1">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  value={form.getValues("type")}
                  onValueChange={(value: visualizationTypesEnum) => {
                    form.setValue("type", value);
                    router.refresh();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={visualizationTypesEnum.WORD_CLOUD}>
                      WordCloud
                    </SelectItem>
                    <SelectItem
                      value={visualizationTypesEnum.FORCE_DIRECTED_GRAPH}
                    >
                      Forced Layout Graph
                    </SelectItem>
                    <SelectItem value={visualizationTypesEnum.SANKEY}>
                      Sankey
                    </SelectItem>
                    <SelectItem value={visualizationTypesEnum.CALENDAR}>
                      Calendar
                    </SelectItem>
                    <SelectItem
                      value={visualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING}
                    >
                      Hierarchical Edge Bundling
                    </SelectItem>
                    {!exclude && (
                      <SelectItem value={visualizationTypesEnum.MATRIX}>
                        Matrix
                      </SelectItem>
                    )}
                    <SelectItem value={visualizationTypesEnum.LINE_CHART}>
                      Line Chart
                    </SelectItem>
                    <SelectItem value={visualizationTypesEnum.BAR_CHART}>
                      Bar Chart
                    </SelectItem>
                    <SelectItem value={visualizationTypesEnum.PIE_CHART}>
                      Pie Chart
                    </SelectItem>
                    <SelectItem value={visualizationTypesEnum.SCATTER}>
                      Scatter
                    </SelectItem>
                    <SelectItem value={visualizationTypesEnum.TREEMAP}>
                      Treemap
                    </SelectItem>
                    <SelectItem value={visualizationTypesEnum.SUNBURST}>
                      Sunburst
                    </SelectItem>
                    <SelectItem value={visualizationTypesEnum.FUNNEL}>
                      Funnel
                    </SelectItem>
                    {!exclude && (
                      <SelectItem value={visualizationTypesEnum.TIMELINE}>
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
}
