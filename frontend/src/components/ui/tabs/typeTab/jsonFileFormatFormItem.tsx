/* eslint-disable no-unused-vars */

import { ExtFile } from '@files-ui/react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormLabel,
  FormControl,
  FormItem,
  UncontrolledFormMessage
} from '@/components/ui/form';
import FileUpload from '../../file-upload';
// eslint-disable-next-line import/no-cycle
import { Inputs } from '../../../form/add-visualization-form';

interface VisualizationFileUploadProps {
  form: UseFormReturn<Inputs>; // Include the form context
  acceptedFiles: ExtFile[];
  updateFiles: (files: ExtFile[]) => void;
  removeFile: (id: string | number | undefined) => void;
}

const JsonFileFormatter = ({
  form, // Include the form context
  acceptedFiles,
  updateFiles,
  removeFile
}: VisualizationFileUploadProps) => (
    <FormItem className="flex w-full flex-col gap-1.5">
      <FormLabel>Files</FormLabel>
      <FormControl>
        <FileUpload
          acceptedFiles={acceptedFiles}
          updateFiles={updateFiles}
          removeFile={removeFile}
          fileFormat="application/json"
        />
      </FormControl>
      <UncontrolledFormMessage
        message={form.formState.errors.fileType?.message}
      />

    </FormItem>
);
export default JsonFileFormatter;
