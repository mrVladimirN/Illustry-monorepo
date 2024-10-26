import type { z } from 'zod';
import { ValidatorSchemas } from '@illustry/types';

type Inputs = z.infer<typeof ValidatorSchemas.visualizationFileSchema>;
type ExcelType = z.infer<typeof ValidatorSchemas.excelFileSchema>;
type JSONType = z.infer<typeof ValidatorSchemas.jsonFileSchema>;
type CSVType = z.infer<typeof ValidatorSchemas.csvFileSchema>;

export type {
  Inputs, ExcelType, JSONType, CSVType
};
