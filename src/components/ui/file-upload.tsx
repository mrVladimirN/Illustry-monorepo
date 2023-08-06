
import { Dropzone, FileMosaic, ExtFile } from "@files-ui/react";
interface FileUploadProps {
  acceptedFiles: ExtFile[];
  updateFiles: (incomingFiles: ExtFile[]) => void;
  removeFile: (id: string) => void;
}

export const FileUpload = ({
  acceptedFiles,
  updateFiles,
  removeFile,
}: FileUploadProps) => {
  return (
    <>
      <Dropzone
        onChange={updateFiles}
        value={acceptedFiles}
        accept="application/json"
      >
        {acceptedFiles.map((file: any) => (
          <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
        ))}
      </Dropzone>
    </>
  );
};
