import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { VisualizationDetails } from "./visualizationDetails";
import { Inputs } from "@/components/form/add-visualization-form";
import { UseFormReturn } from "react-hook-form";
import { VisualizationType } from "./visualizationType";

interface XMLMappingTabProps {
  form: UseFormReturn<Inputs>; // Include the form context
  router: AppRouterInstance;
  fileDetails: boolean;
}
export function XMLMappingTab({
  fileDetails,
  form,
  router,
}: XMLMappingTabProps) {
  return (
    <>
      {fileDetails ? (
        <p className="text-green-500">
          XML files don't need a special mapping
        </p>
      ) : (
        <>
          <VisualizationType form={form} router={router} exclude={false} />
          <VisualizationDetails form={form} />
        </>
      )}
    </>
  );
}
