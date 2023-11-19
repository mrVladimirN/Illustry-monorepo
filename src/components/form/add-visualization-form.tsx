"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { catchError } from "@/lib/utils";
import { env } from "@/env.mjs";
import { Form } from "@/components/ui/form";
import { ExtFile } from "@files-ui/react";
import {
  exelSchema,
  jsonSchema,
  visualizationSchema,
  visualizationTypesEnum,
} from "@/lib/validation/visualizations";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { MappingTab } from "../ui/tabs/mappingTab/mappingTab";
import { TypeTab } from "../ui/tabs/typeTab/typeTab";
import { FileDetails } from "types/files";
import { VisualizationUpdate } from "types/visualizations";

export type Inputs = z.infer<typeof visualizationSchema>;
export type ExelType = z.infer<typeof exelSchema>;
export type JSONType = z.infer<typeof jsonSchema>;
export enum fileTypes {
  JSON = "JSON",
  EXEL = "EXEL",
}
export function AddVisualizationForm() {
  const router = useRouter();
  const [files, setFiles] = React.useState<ExtFile[]>([]);
  const [isPending, startTransition] = React.useTransition();
  const [selectedFileType, setSelectedFileType] = React.useState<string>(
    fileTypes.JSON
  );

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const form = useForm<Inputs>({
    resolver: zodResolver(visualizationSchema),
    defaultValues: {
      fileType: fileTypes.JSON,
      allFileDetails: true,
    },
  });

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        if (files.length > 0) {
          const formData = new FormData();
          const fileDetails: FileDetails = { fileType: data.fileType };
          fileDetails.includeHeaders = (data as ExelType).includeHeaders;
          fileDetails.mapping = (data as ExelType).mapping;
          fileDetails.sheets = (data as ExelType).sheets;
          fileDetails.type = (data as ExelType).type;
          formData.append("allFileDetails", data.allFileDetails.toString());
          formData.append("FileDetails", JSON.stringify(fileDetails));
          const visualizationDetails: VisualizationUpdate = {
            name: (data as ExelType).name as string,
          };
          visualizationDetails.description = (data as ExelType).description;
          visualizationDetails.tags = (data as ExelType).tags?.split(",");
          if (data.allFileDetails) {
            formData.append(
              "VisualizationDetails",
              JSON.stringify(visualizationDetails)
            );
          }
          files.forEach((f) => {
            formData.append("File", f.file as File);
          });
          const res = await fetch(
            `${env.NEXT_PUBLIC_BACKEND_PUBLIC_URL}/api/visualization`,
            {
              method: "POST",
              body: formData,
            }
          );
          if (!res.ok) {
            throw new Error("Request failed");
          }
          await res.json();
          form.reset();
          setFiles([]); // Clear the files
          toast.success("Visualizations added successfully.");
          router.push("/visualizations");
          router.refresh();
        } else {
          toast.error("No files selected.");
        }
      } catch (err) {
        toast.error("Something went wrong.");
        catchError(err);
      }
    });
  }

  const handleFileTypeChange = (value: string) => {
    if (value !== selectedFileType) {
      setSelectedFileType(value);
      form.reset({
        fileType: value,
        type: visualizationTypesEnum.WORLD_CLOUD,
        name: "",
        tags: "",
        includeHeaders: false,
        description: "",
        mapping: { Names: "", Values: "", Properties: "" },
      });
      setFiles([]); // Clear the files
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add a new Visualization</h2>
      <Form {...form}>
        <form
          className="grid w-full max-w-xl gap-5"
          onSubmit={async (...args) => {
            await form.handleSubmit(onSubmit)(...args);
          }}
        >
          <Tabs defaultValue="type" className="w-[100%]">
            <TabsList>
              <TabsTrigger value="type">Type</TabsTrigger>
              <TabsTrigger value="mapping">Mapping</TabsTrigger>
            </TabsList>
            <MappingTab
              selectedFileType={selectedFileType}
              isPending={isPending}
              form={form}
              router={router}
            />
            <TypeTab
              form={form}
              files={files}
              handleFileTypeChange={handleFileTypeChange}
              selectedFileType={selectedFileType}
              updateFiles={updateFiles}
              removeFile={removeFile}
            />
          </Tabs>
        </form>
      </Form>
    </div>
  );
}
