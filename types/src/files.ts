import { Request } from 'express';

type FileProperties = {
  filePath: string;
  type: string;
  delimiter?: string;
}
enum FileType {
  JSON = "JSON",
  EXCEL = "EXCEL",
  CSV = "CSV",
  XML = "XML"
}
type FileDetails = {
  fileType: FileType;
  includeHeaders?: boolean;
  separator?: string;
  mapping?: any;
  sheets?: string;
}

type UploadedFile = {
  path: string;
  mimetype: string;
};

type RequestWithFiles = Request & {
  files: { file: UploadedFile[] }
}
export { FileProperties, FileDetails, UploadedFile, RequestWithFiles }