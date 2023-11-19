import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { VisualizationDetails } from "./visualizationDetails";
import { Inputs } from "@/components/form/add-visualization-form";
import { UseFormReturn } from "react-hook-form";
interface JSONMappingTabProps {
  form: UseFormReturn<Inputs>; // Include the form context
  router: AppRouterInstance;
  fileDetails: boolean;
}
export function JSONMappingTab({
  fileDetails,
  form,
  router,
}: JSONMappingTabProps) {
  return (
    <>
      {fileDetails ? (
        <p className="text-green-500">
          JSON files don't need a special mapping
        </p>
      ) : (
        <VisualizationDetails form={form} router={router} />
      )}
    </>
  );
}
