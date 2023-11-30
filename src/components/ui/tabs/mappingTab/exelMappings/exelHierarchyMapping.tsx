import { Inputs } from "@/components/form/add-visualization-form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface ExelHierarchyMappingProps {
  form: UseFormReturn<Inputs>; // Include the form context
}
export function ExelHierarchyMapping({
  form,
}: ExelHierarchyMappingProps) {
  return (
    <>
     <div className="flex items-center space-x-4">
        <div className="w-20">Names:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Names"
            defaultValue={form.getValues("mapping.names") || ""}
            onChange={(e) => {
              const value = e.target.value;
              form.setValue("mapping.names", value);
            }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-20">Values:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Values"
            defaultValue={form.getValues("mapping.values") || ""}
            onChange={(e) => {
              const value = e.target.value;
              form.setValue("mapping.values", value);
            }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-20">Categories:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Categories"
            defaultValue={form.getValues("mapping.categories") || ""}
            onChange={(e) => {
              const value = e.target.value;
              form.setValue("mapping.categories", value);
            }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-20">Properties:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column number for Properties"
            defaultValue={form.getValues("mapping.properties") || ""}
            onChange={(e) => {
              const value = e.target.value;
              form.setValue("mapping.properties", value);
            }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-20">Children:</div>
        <div className="flex-grow">
          <Input
            placeholder="Column numbers for Children, coma separated"
            defaultValue={form.getValues("mapping.children") || ""}
            onChange={(e) => {
              setTimeout(() => {
                const value = e.target.value;
                form.setValue("mapping.children", value);
              }, 100);
            }}
          />
        </div>
      </div>
     
    </>
  );
}
