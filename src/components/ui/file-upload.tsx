import { Dropzone, FileMosaic, ExtFile } from '@files-ui/react';

interface FileUploadProps {
  acceptedFiles: ExtFile[];
  updateFiles: (incomingFiles: ExtFile[]) => void;
  removeFile: (id: string) => void;
  fileFormat: string
}

export const FileUpload = ({
  acceptedFiles,
  updateFiles,
  removeFile,
  fileFormat
}: FileUploadProps) => (
    <>
      <Dropzone
        onChange={updateFiles}
        value={acceptedFiles}
        accept= {fileFormat}
      >
        {acceptedFiles.map((file: any) => (
          <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
        ))}
      </Dropzone>
    </>
);
