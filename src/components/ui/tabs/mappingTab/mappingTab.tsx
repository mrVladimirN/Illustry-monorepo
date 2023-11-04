import { Icons } from "@/components/icons";
import router from "next/router";
import { Button } from "../../button";
import { TabsContent } from "../../tabs";
import { ExelMappingTab } from "./exelMappingTab";
import { JSONMappingTab } from "./jsonMappingTab";
import { Inputs, fileTypes } from "@/components/form/add-visualization-form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { UseFormReturn } from "react-hook-form";

interface MappingTabProps {
  selectedFileType: string;
  isPending: boolean;
  form: UseFormReturn<Inputs>; // Include the form context
  router: AppRouterInstance;
}
export function MappingTab({
  selectedFileType,
  isPending,
  form,
  router,
}: MappingTabProps) {
  const renderMapping = (selectedFileType: string) => {
    if (selectedFileType) {
      switch (selectedFileType) {
        case fileTypes.JSON:
          return (
            <>
              <JSONMappingTab />
              <Button className="w-fit mt-[2%]" disabled={isPending}>
                {isPending && (
                  <Icons.spinner
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Add Visualizations
                <span className="sr-only">Add Visualizations</span>
              </Button>
            </>
          );

        case fileTypes.EXEL:
          return (
            <>
              <ExelMappingTab form={form} router={router} />{" "}
              <Button className="w-fit mt-[2%]" disabled={isPending}>
                {isPending && (
                  <Icons.spinner
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Add Visualizations
                <span className="sr-only">Add Visualizations</span>
              </Button>
            </>
          );
        default:
          return null;
      }
    }
  };
  return (
    <TabsContent className="w-50%" value="mapping">
      {renderMapping(selectedFileType)}
    </TabsContent>
  );
}
