import React from "react";
import { ExtFile } from "@files-ui/react";
import { FileUpload } from "../ui/file-upload";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  FormLabel,
  FormControl,
  FormItem,
  UncontrolledFormMessage,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Inputs } from "../form/add-visualization-form";
import { Input } from "./input";
import { Textarea } from "./textarea";

interface VisualizationFileUploadProps {
  form: UseFormReturn<Inputs>; // Include the form context
  acceptedFiles: ExtFile[];
  updateFiles: (files: ExtFile[]) => void;
  removeFile: (id: string) => void;
  isPending: boolean;
}

export const ExelFileFormatter = ({
  form, // Include the form context
  acceptedFiles,
  updateFiles,
  removeFile,
  isPending,
}: VisualizationFileUploadProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Type project name here." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Type project description here."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormItem className="flex w-full flex-col gap-1.5">
        <FormLabel>Files</FormLabel>
        <FormControl>
          <FileUpload
            acceptedFiles={acceptedFiles}
            updateFiles={updateFiles}
            removeFile={removeFile}
            fileFormat="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </FormControl>
        <UncontrolledFormMessage
          message={form.formState.errors.fileType?.message}
        />
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
      </FormItem>
    </>
  );
};
