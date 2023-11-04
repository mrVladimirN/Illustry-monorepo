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
import { Textarea } from "../../textarea";
import { Checkbox } from "../../checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Inputs } from "@/components/form/add-visualization-form";
import { UseFormReturn } from "react-hook-form";
import { ExelWordCloudMapping } from "./exelMappings/exelWordCloudMapping";
interface ExelMappingTabProps {
  form: UseFormReturn<Inputs>; // Include the form context
  router: AppRouterInstance;
}
export function ExelMappingTab({ form, router }: ExelMappingTabProps) {
  const renderMapping = (type: visualizationTypesEnum) => {
    if (type) {
      switch (type) {
        case visualizationTypesEnum.WORLD_CLOUD:
          return <ExelWordCloudMapping form={form} />;
        default:
          return null;
      }
    }
  };
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="col-span-1">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type project name here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="Type comma-separated tags." {...field} />
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type project description here."
                  {...field}
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
          name="mapping"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mapping</FormLabel>
              <FormControl>{renderMapping(form.getValues("type"))}</FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
