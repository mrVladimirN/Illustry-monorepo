export interface FileProperties {
  filePath: string;
  type: string;
  delimiter?: string;
}

export interface FileDetails {
  fileType: "JSON" | "EXEL";
  type?: string;
  includeHeaders?: boolean;
  mapping?: any;
  sheets?: string;
}
