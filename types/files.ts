export interface FileProperties {
  filePath: string;
  type: string;
  delimiter?: string;
}

export interface FileDetails {
  fileType: "JSON" | "EXCEL" | "CSV";
  includeHeaders?: boolean;
  separator?: string;
  mapping?: any;
  sheets?: string;
}
