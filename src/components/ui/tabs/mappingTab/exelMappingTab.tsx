import { visualizationTypesEnum } from "@/lib/validation/visualizations";
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../form";
import { Input } from "../../input";
import { Checkbox } from "../../checkbox";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Inputs } from "@/components/form/add-visualization-form";
import { UseFormReturn } from "react-hook-form";
import { ExelWordCloudMapping } from "./exelMappings/exelWordCloudMapping";
import { VisualizationDetails } from "./visualizationDetails";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";
import { ExelVisualizationMapping } from "./exelMappings/visualizationDetailsMapping";
import { ExelNodeLinkMapping } from "./exelMappings/exelNodeLinkMapping";
interface ExelMappingTabProps {
  form: UseFormReturn<Inputs>; // Include the form context
  router: AppRouterInstance;
  fileDetails: boolean;
}
export function ExelMappingTab({
  form,
  router,
  fileDetails,
}: ExelMappingTabProps) {
  const renderMapping = (type: visualizationTypesEnum) => {
    if (type) {
      switch (type) {
        case visualizationTypesEnum.WORLD_CLOUD:
          return (
            <>
              <div className="space-y-4">
                {fileDetails && <ExelVisualizationMapping form={form} />}
                <ExelWordCloudMapping form={form} />
              </div>
            </>
          );
        case visualizationTypesEnum.FORCE_DIRECTED_GRAPH:
        case visualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING:
        case visualizationTypesEnum.SANKEY:
          return (
            <>
              <div className="space-y-4">
                {fileDetails && <ExelVisualizationMapping form={form} />}
                <ExelNodeLinkMapping form={form} />
              </div>
            </>
          );
        default:
          return (
            <>
              <div className="space-y-4">
                {fileDetails && <ExelVisualizationMapping form={form} />}
              </div>
            </>
          );
      }
    }
  };
  return (
    <div className="grid grid-cols-2 gap-5">
      {!fileDetails && <VisualizationDetails form={form} router={router} />}
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
                    <SelectItem value="matrix">Matrix</SelectItem>
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
      </div>
      <div className="col-span-1">
        <FormField
          control={form.control}
          name="sheets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sheets number</FormLabel>
              <FormControl>
                <Input
                  placeholder="How many sheets to include"
                  defaultValue={form.getValues("sheets") || "1"}
                  onChange={(e) => {
                    setTimeout(() => {
                      const value = e.target.value;
                      form.setValue("sheets", value);
                    }, 100);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mapping</FormLabel>
              <FormControl>
                {renderMapping(
                  form.getValues("type") as visualizationTypesEnum
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
