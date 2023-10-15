"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { catchError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
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
import { visualizationSchema } from "@/lib/validation/visualizations";
import { JsonFileFormatter } from "../ui/jsonFileFormatFormItem";
import { ExelFileFormatter } from "../ui/exelFileFormatFormItem";
export type Inputs = z.infer<typeof visualizationSchema>;

export function AddVisualizationForm() {
  const router = useRouter();
  const [files, setFiles] = React.useState<ExtFile[]>([]);
  const [isPending, startTransition] = React.useTransition();
  const [selectedFileType, setSelectedFileType] =
    React.useState<string>("JSON");

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const form = useForm<Inputs>({
    resolver: zodResolver(visualizationSchema),
    defaultValues: {
      fileType: "JSON",
    },
  });

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        if (files.length > 0) {
          const formData = new FormData();
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add a new Visualization</h2>
      <Form {...form}>
        <form
          className="grid w-full max-w-xl gap-5"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <FormField
              control={form.control}
              name="fileType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>File Type</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedFileType(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a File Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {["CSV", "JSON"].map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {selectedFileType === "CSV" ? (
            <ExelFileFormatter
              acceptedFiles={files}
              updateFiles={updateFiles}
              removeFile={removeFile}
              isPending={isPending}
              form={form}
            />
          ) : (
            <JsonFileFormatter
              acceptedFiles={files}
              updateFiles={updateFiles}
              removeFile={removeFile}
              isPending={isPending}
              form={form}
            />
          )}
        </form>
      </Form>
    </div>
  );
}
