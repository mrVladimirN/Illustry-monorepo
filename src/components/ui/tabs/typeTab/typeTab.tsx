/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-cycle
import { Inputs, fileTypes } from '@/components/form/add-visualization-form';
import { UseFormReturn } from 'react-hook-form';
import { ExtFile } from '@files-ui/react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../../form';
import ExcelFileFormatter from './excelFileFormatFormItem';
import JsonFileFormatter from './jsonFileFormatFormItem';
import { TabsContent } from '../../tabs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../select';
import CSVFileFormatter from './csvFileFormatFormItem';
import XMLFileFormatter from './xmlFileFormatFormItem';

interface TypeTabProps {
  form: UseFormReturn<Inputs>; // Include the form context
  // eslint-disable-next-line no-unused-vars
  handleFileTypeChange: (value: string) => void;
  selectedFileType: string;
  files: ExtFile[];
  updateFiles: (files: ExtFile[]) => void;
  removeFile: (id: string | number | undefined) => void;
}
function TypeTab({
  form,
  handleFileTypeChange,
  selectedFileType,
  files,
  updateFiles,
  removeFile
}: TypeTabProps) {
  const renderFiles = (fileType: string) => {
    if (fileType) {
      switch (fileType) {
        case fileTypes.JSON:
          return (
            <JsonFileFormatter
              acceptedFiles={files}
              updateFiles={updateFiles}
              removeFile={removeFile}
              form={form}
            />
          );
        case fileTypes.EXCEL:
          return (
            <ExcelFileFormatter
              acceptedFiles={files}
              updateFiles={updateFiles}
              removeFile={removeFile}
              form={form}
            />
          );
        case fileTypes.CSV:
          return (
            <CSVFileFormatter
              acceptedFiles={files}
              updateFiles={updateFiles}
              removeFile={removeFile}
              form={form}
            />
          );
        case fileTypes.XML:
          return (
            <XMLFileFormatter
              acceptedFiles={files}
              updateFiles={updateFiles}
              removeFile={removeFile}
              form={form}
            />
          );
        default:
          return null;
      }
    }
    return null;
  };
  return (
    <TabsContent className="w-50%" value="type">
      <div className="flex flex-col items-start gap-6 sm:flex-row">
        <FormField
          control={form.control}
          name="fileType"
          render={({ field }) => (
            <FormItem className="w-full mb-[5%]">
              <FormLabel>File Type</FormLabel>
              <FormControl>
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleFileTypeChange(value); // Call the handler when file type changes
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a File Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[fileTypes.JSON, fileTypes.CSV, fileTypes.EXCEL, fileTypes.XML].map(
                        (option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {renderFiles(selectedFileType)}
    </TabsContent>
  );
}
export default TypeTab;
