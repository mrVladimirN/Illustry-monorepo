import { Inputs } from "@/components/form/add-visualization-form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface ExelVisualizationMappingProps {
  form: UseFormReturn<Inputs>; // Include the form context
}
export function ExelVisualizationMapping({
  form,
}: ExelVisualizationMappingProps) {
  return (
    <>
      <div className="flex items-center space-x-4">
        <div className="w-20">Visualization Name:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Visualization Name"
            defaultValue={form.getValues("mapping.VisualizationName") || ""}
            onChange={(e) => {
              setTimeout(() => {
                const value = e.target.value;
                form.setValue("mapping.VisualizationName", value);
              }, 100);
            }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-20">Visualization Type:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Visualization Type"
            defaultValue={form.getValues("mapping.VisualizationType") || ""}
            onChange={(e) => {
              setTimeout(() => {
                const value = e.target.value;
                form.setValue("mapping.VisualizationType", value);
              }, 100);
            }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-20">Visualization Description:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Visualization Description"
            defaultValue={
              form.getValues("mapping.VisualizationDescription") || ""
            }
            onChange={(e) => {
              setTimeout(() => {
                const value = e.target.value;
                form.setValue("mapping.VisualizationDescription", value);
              }, 100);
            }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-20">Visualization Tags:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Visualization Tags"
            defaultValue={form.getValues("mapping.VisualizationTags") || ""}
            onChange={(e) => {
              const value = e.target.value;
              form.setValue("mapping.VisualizationTags", value);
            }}
          />
        </div>
      </div>
    </>
  );
}
