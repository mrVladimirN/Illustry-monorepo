"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { catchError } from "@/lib/utils";
import { visualizationSchema } from "@/lib/validation/project";
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

import { Icons } from "@/components/icons";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { ExtFile } from "@files-ui/react";
import { FileUpload } from "../ui/file-upload";
type Inputs = z.infer<typeof visualizationSchema>;

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
            <p className="text-red-500">
              CSV visualization is not yet implemented.
            </p>
          ) : (
            <>
              <FormItem className="flex w-full flex-col gap-1.5">
                <FormLabel>Files</FormLabel>
                <FormControl>
                  <FileUpload
                    acceptedFiles={files}
                    updateFiles={updateFiles}
                    removeFile={removeFile}
                  />
                </FormControl>
                <UncontrolledFormMessage
                  message={form.formState.errors.fileType?.message}
                />
              </FormItem>
              <Button className="w-fit" disabled={isPending}>
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
          )}
        </form>
      </Form>
    </div>
  );
}
