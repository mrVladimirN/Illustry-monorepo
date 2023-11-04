"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { catchError } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ExtFile } from "@files-ui/react";
import {
  visualizationSchema,
  visualizationTypesEnum,
} from "@/lib/validation/visualizations";
import { JsonFileFormatter } from "../ui/tabs/typeTab/jsonFileFormatFormItem";
import { ExelFileFormatter } from "../ui/tabs/typeTab/exelFileFormatFormItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { MappingTab } from "../ui/tabs/mappingTab/mappingTab";
import { TypeTab } from "../ui/tabs/typeTab/typeTab";

export type Inputs = z.infer<typeof visualizationSchema>;
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
      type: visualizationTypesEnum.WORLD_CLOUD,
    },
  });

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        if (files.length > 0) {
          const formData = new FormData();
          formData.append("FileType", data.fileType);
          if (data.type) {
            formData.append("VisualizationType", data.type);
          }
          if (data.name) {
            formData.append("Name", data.name);
          }
          if (data.tags) {
            formData.append("Tags", data.tags);
          }
          if (data.includeHeaders) {
            formData.append("IncludeHeaders", data.includeHeaders.toString());
          }
          if (data.description) {
            formData.append("Description", data.description);
          }
          if (data.mapping) {
            formData.append("Mapping", JSON.stringify(data.mapping));
          }
          files.forEach((f) => {
            formData.append("File", f.file as File);
          });
          const res = await fetch("http://localhost:7000/api/visualization", {
            method: "POST",
            body: formData,
          });
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
        fileType: value as fileTypes,
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
