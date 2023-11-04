import React from "react";
import { ExtFile } from "@files-ui/react";
import { FileUpload } from "../../file-upload";
 
import {
  FormLabel,
  FormControl,
  FormItem,
  UncontrolledFormMessage,
 
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Inputs } from "../../../form/add-visualization-form";


interface VisualizationFileUploadProps {
  form: UseFormReturn<Inputs>; // Include the form context
  acceptedFiles: ExtFile[];
  updateFiles: (files: ExtFile[]) => void;
  removeFile: (id: string) => void;
}

export const ExelFileFormatter = ({
  form, // Include the form context
  acceptedFiles,
  updateFiles,
  removeFile,
}: VisualizationFileUploadProps) => {
  return (
    <>
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
      </FormItem>
    </>
  );
};
