export interface FileProperties {
  filePath: string;
  type: string;
  delimiter?: string;
}

export interface FileDetails {
  fileType: "JSON" | "EXCEL" | "CSV" | "XML";
  includeHeaders?: boolean;
  separator?: string;
  mapping?: any;
  sheets?: string;
}
