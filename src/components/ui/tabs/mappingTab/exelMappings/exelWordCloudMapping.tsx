import { Inputs } from "@/components/form/add-visualization-form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ExelVisualizationMapping } from "./visualizationDetailsMapping";

interface ExelWordCloudMappingProps {
  form: UseFormReturn<Inputs>; // Include the form context
  fileDetails: boolean;
}
export function ExelWordCloudMapping({
  form,
  fileDetails,
}: ExelWordCloudMappingProps) {
  return (
    <div className="space-y-4">
      {fileDetails && <ExelVisualizationMapping form={form} />}
      <div className="flex items-center space-x-4">
        <div className="w-20">Names:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Names"
            defaultValue={form.getValues("mapping.Names") || ""}
            onChange={(e) => {
              setTimeout(() => {
                const value = e.target.value;
                form.setValue("mapping.Names", value);
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
            defaultValue={form.getValues("mapping.Values") || ""}
            onChange={(e) => {
              setTimeout(() => {
                const value = e.target.value;
                form.setValue("mapping.Values", value);
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
            defaultValue={form.getValues("mapping.Properties") || ""}
            onChange={(e) => {
              const value = e.target.value;
              form.setValue("mapping.Properties", value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
