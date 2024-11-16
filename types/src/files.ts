import { Request } from 'express';

type FileProperties = {
  filePath: string;
  type: string;
  delimiter?: string;
};

enum FileType {
  JSON = "JSON",
  EXCEL = "EXCEL",
  CSV = "CSV",
  XML = "XML"
};

type FileDetails = {
  fileType: FileType;
  includeHeaders?: boolean;
  separator?: string;
  mapping?: { [key: string]: string };
  sheets?: string;
};

type UploadedFile = {
  path: string;
  mimetype: string;
};

type RequestWithFiles = Request & {
  files: { file: UploadedFile[] };
};

type Response = {
  req?: {
    originalUrl?: string;
    probe?: {
      stop: (message: string) => void;
    };
  };
  status: (code: number) => Response;
  send: (data: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

export { FileProperties, Response, FileDetails, UploadedFile, RequestWithFiles, FileType }