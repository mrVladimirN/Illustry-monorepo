import { Inputs } from "@/components/form/add-visualization-form";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../form";
import { Input } from "../../input";
import { Textarea } from "../../textarea";

export interface VisualizationDetailsProp {
  form: UseFormReturn<Inputs>; // Include the form context
}
export function VisualizationDetails({
  form,
}: VisualizationDetailsProp) {
  return (
    <>
      <div className="col-span-1">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type project name here."
                  defaultValue={form.getValues("name") || ""}
                  onChange={(e) => {
                    setTimeout(() => {
                      const value = e.target.value;
                      form.setValue("name", value);
                    }, 100);
                  }}
                />
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
                <Input
                  placeholder="Type comma-separated tags."
                  defaultValue={form.getValues("tags") || ""}
                  onChange={(e) => {
                    setTimeout(() => {
                      const value = e.target.value;
                      form.setValue("tags", value);
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type project description here."
                  defaultValue={form.getValues("description") || ""}
                  onChange={(e) => {
                    setTimeout(() => {
                      const value = e.target.value;
                      form.setValue("description", value);
                    }, 100);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
  
    </>
  );
}
