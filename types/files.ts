export interface AcceptedFile {
  fileType: "CSV" | "JSON";
  files?: unknown;
}
export interface FileProperties {
    filePath: string;
    type: string;
    delimiter?: string;
  }