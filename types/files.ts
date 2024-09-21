import { Request } from 'express';

type FileProperties = {
  filePath: string;
  type: string;
  delimiter?: string;
}

type FileDetails = {
  fileType: "JSON" | "EXCEL" | "CSV" | "XML";
  includeHeaders?: boolean;
  separator?: string;
  mapping?: any;
  sheets?: string;
}

type UploadedFile = {
  path: string;
  mimeType: string;
};

interface RequestWithFiles extends Request {
  files?: Express.Multer.File[];
}
export { FileProperties, FileDetails, UploadedFile, RequestWithFiles }