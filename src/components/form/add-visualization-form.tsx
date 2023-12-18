/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */

'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { catchError } from '@/lib/utils';
import 'dotenv/config';
import { Form } from '@/components/ui/form';
import { ExtFile } from '@files-ui/react';
import {
  csvSchema,
  excelSchema,
  jsonSchema,
  visualizationSchema,
  visualizationTypesEnum
} from '@/lib/validation/visualizations';
import { FileDetails } from 'types/files';
import {
  VisualizationTypesEnum,
  VisualizationUpdate
} from 'types/visualizations';
import { useState, useTransition } from 'react';
import { createOrUpdateVisualization } from '@/app/_actions/visualization';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import MappingTab from '../ui/tabs/mappingTab/mappingTab';
import TypeTab from '../ui/tabs/typeTab/typeTab';

export type Inputs = z.infer<typeof visualizationSchema>;
export type ExcelType = z.infer<typeof excelSchema>;
export type JSONType = z.infer<typeof jsonSchema>;
export type CSVType = z.infer<typeof csvSchema>;
// eslint-disable-next-line no-shadow
export enum fileTypes {
  JSON = 'JSON',
  EXCEL = 'EXCEL',
  CSV = 'CSV',
  XML = 'XML',
}
export function AddVisualizationForm() {
  const router = useRouter();
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [isPending, startTransition] = useTransition();
  const [selectedFileType, setSelectedFileType] = useState<string>(
    fileTypes.JSON
  );

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);
  };

  const removeFile = (id: string | number | undefined) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const form = useForm<Inputs>({
    resolver: zodResolver(visualizationSchema),
    defaultValues: {
      fileType: fileTypes.JSON
    }
  });

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        if (files.length > 0) {
          const formData = new FormData();
          const fileDetails: FileDetails = {
            fileType: data.fileType,
            includeHeaders: (data as ExcelType).includeHeaders,
            mapping: (data as ExcelType).mapping,
            sheets: (data as ExcelType).sheets,
            separator: (data as unknown as CSVType).separator
          };
          formData.append('fullDetails', data.fullDetails.toString());
          formData.append('fileDetails', JSON.stringify(fileDetails));
          const visualizationDetails: VisualizationUpdate = {
            name: (data as ExcelType).name as string,
            type: (data as ExcelType).type as unknown as VisualizationTypesEnum,
            description: (data as ExcelType).description,
            tags: (data as ExcelType).tags?.split(',')
          };
          formData.append(
            'visualizationDetails',
            JSON.stringify(visualizationDetails)
          );
          files.forEach((f) => {
            formData.append('file', f.file as File);
          });
          await createOrUpdateVisualization(formData);
          form.reset();
          setFiles([]); // Clear the files
          toast.success('Visualizations added successfully.');
          router.push('/visualizations');
          router.refresh();
        } else {
          toast.error('No files selected.');
        }
      } catch (err) {
        toast.error('Something went wrong.');
        catchError(err);
      }
    });
  }

  const handleFileTypeChange = (value: string) => {
    if (value !== selectedFileType) {
      setSelectedFileType(value);
      form.reset({
        fileType: value as any,
        type: visualizationTypesEnum.WORD_CLOUD,
        name: '',
        tags: '',
        includeHeaders: false,
        description: '',
        mapping: { names: '', values: '', properties: '' }
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
