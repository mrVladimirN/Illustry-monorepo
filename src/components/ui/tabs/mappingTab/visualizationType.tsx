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
}

export function VisualizationType({ form, router }: VisualizationTypeProp) {
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
                    <SelectItem value="word-cloud">WordCloud</SelectItem>
                    <SelectItem value="force-directed-graph">
                      Forced Layout Graph
                    </SelectItem>
                    <SelectItem value="sankey">Sankey</SelectItem>
                    <SelectItem value="calendar">Calendar</SelectItem>
                    <SelectItem value="hierarchical-edge-bundling">
                      Hierarchical Edge Bundling
                    </SelectItem>
                    {/* <SelectItem value="matrix">Matrix</SelectItem> */}
                    <SelectItem value="line-chart">Line Chart</SelectItem>
                    <SelectItem value="bar-chart">Bar Chart</SelectItem>
                    <SelectItem value="pie-chart">Pie Chart</SelectItem>
                    <SelectItem value="scatter">Scatter</SelectItem>
                    <SelectItem value="treemap">Treemap</SelectItem>
                    <SelectItem value="sunburst">Sunburst</SelectItem>
                    <SelectItem value="funnel">Funnel</SelectItem>
                    <SelectItem value="timeline">Timeline</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>{" "}
    </>
  );
}
