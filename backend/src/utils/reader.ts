/* eslint-disable no-unused-vars */
import * as fs from 'fs';
import { FileTypes, VisualizationTypes, TransformerTypes } from '@illustry/types';
import readline from 'readline';
import { parseStringPromise } from 'xml2js';
import * as ExcelJS from 'exceljs';
import { EventEmitter } from 'stream';
import {
  jsonDataProvider,
  exelOrCsvdataProvider,
  xmlDataProvider
} from '../bzl/transformers/preprocess/dataProvider';
import transformerProvider from '../bzl/transformers/preprocess/transformersProvider';
import FileError from '../errors/fileError';

const readJsonFile = (
  file: FileTypes.FileProperties,
  visualizationType: VisualizationTypes.VisualizationTypesEnum,
  allFileDetails: boolean
) => new Promise((resolve, reject) => {
  if (file.type !== 'application/json') {
    reject(new FileError('The provided file is not JSON format'));
  }
  const buffer = fs.createReadStream(file.filePath);
  let finalText: string = '';
  buffer.on('error', () => {
    reject(new FileError('Problems while uploading the files'));
  });
  buffer.on('data', (data: string | Buffer) => {
    finalText += data;
  });
  buffer.on('end', async () => {
    await fs.promises.unlink(file.filePath);
    const visualization = JSON.parse(finalText) as VisualizationTypes.VisualizationDataData;
    resolve(
      jsonDataProvider(visualizationType, visualization, allFileDetails)
    );
  });
});

const readXmlFile = (
  file: FileTypes.FileProperties,
  visualizationType: VisualizationTypes.VisualizationTypesEnum,
  allFileDetails: boolean
) => new Promise((resolve, reject) => {
  if (file.type !== 'text/xml') {
    reject(new FileError('The provided file is not XML format'));
  }
  const buffer = fs.createReadStream(file.filePath);
  let finalText: string = '';
  buffer.on('error', () => {
    reject(new FileError('Problems while uploading the files'));
  });
  buffer.on('data', (data: string | Buffer) => {
    finalText += data;
  });
  buffer.on('end', async () => {
    try {
      await fs.promises.unlink(file.filePath);
      const visualization = (await parseStringPromise(finalText)) as TransformerTypes.XMLVisualizationDetails;
      const { root } = visualization;
      const finalTypes: VisualizationTypes.VisualizationTypesEnum = root
        && root.type
        && root.type.length > 0
        ? root.type[0]
        : visualizationType;
      resolve(xmlDataProvider(finalTypes, visualization, allFileDetails));
    } catch (err) {
      reject(new FileError(`The file could not be parsed because of ${err}`));
    }
  });
});

const readExcelFile = (
  file: FileTypes.FileProperties,
  fileDetails: FileTypes.FileDetails,
  visualizationType: VisualizationTypes.VisualizationTypesEnum,
  allFileDetails: boolean
) => new Promise((resolve, reject) => {
  if (
    file.type
    !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    reject(new FileError('The provided file is not EXCEL format'));
  }
  const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(file.filePath, {
    worksheets: 'emit'
  }) as ExcelJS.stream.xlsx.WorkbookReader & EventEmitter;
  const computedRows: TransformerTypes.RowType[] = [];
  let includeHeaders = fileDetails.includeHeaders || false;

  workbookReader.on('end', async () => {
    await fs.promises.unlink(file.filePath);
    resolve(
      exelOrCsvdataProvider(visualizationType, computedRows, allFileDetails)
    );
  });

  workbookReader.on('worksheet', (worksheet: {
    id: number;
    emit: (event: string) => void;
    on: (event: string, arg: { (row: { values: (string | number)[]; }): void }) => void;
  }) => {
    const sheetsNr = fileDetails && fileDetails.sheets && fileDetails.sheets.length > 0
      ? +fileDetails.sheets
      : 1;
    if (worksheet.id > sheetsNr) {
      worksheet.emit('end');
      return;
    }

    worksheet.on('row', (row) => {
      if (!includeHeaders) {
        includeHeaders = true;
      } else if (row.values.length > 0 && fileDetails.mapping) {
        computedRows.push(
          transformerProvider(
            visualizationType,
            fileDetails.mapping,
            row.values,
            allFileDetails
          )
        );
      }
    });

    worksheet.on('end', () => {
    });
  });

  workbookReader.on('error', (err) => {
    reject(new FileError(`An error occurred: ${err}`));
  });
  workbookReader.read();
});

const readCsvFile = (
  file: FileTypes.FileProperties,
  fileDetails: FileTypes.FileDetails,
  visualizationType: VisualizationTypes.VisualizationTypesEnum,
  allFileDetails: boolean
) => {
  const computedRows: TransformerTypes.RowType[] = [];
  return new Promise((resolve, reject) => {
    if (file.type !== 'text/csv') {
      reject(new FileError('The provided file is not CSV format'));
    }
    const readStream = fs.createReadStream(file.filePath);
    const readliner = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity
    });
    let includeHeaders = fileDetails && fileDetails.includeHeaders;
    readliner.on('line', (line) => {
      if (!includeHeaders) {
        includeHeaders = true;
      } else if (fileDetails.mapping) {
        computedRows.push(
          transformerProvider(
            visualizationType,
            fileDetails.mapping,
            [
              '',
              ...line.split(
                fileDetails.separator ? fileDetails.separator : ','
              )
            ],
            allFileDetails
          )
        );
      }
    });
    readliner.on('close', async () => {
      await fs.promises.unlink(file.filePath);
      resolve(
        exelOrCsvdataProvider(visualizationType, computedRows, allFileDetails)
      );
    });
    readliner.on('error', (err) => {
      reject(new FileError(`An error occurred: ${err}`));
    });
  });
};

const excelFilesToVisualizations = async (
  files: FileTypes.FileProperties[],
  fileDetails: FileTypes.FileDetails,
  visualizationType: VisualizationTypes.VisualizationTypesEnum,
  allFileDetails: boolean
) => Promise.all(files.map((file) => readExcelFile(file, fileDetails, visualizationType, allFileDetails)).filter(Boolean));

const jsonFilesToVisualizations = async (
  files: FileTypes.FileProperties[],
  visualizationType: VisualizationTypes.VisualizationTypesEnum,
  allFileDetails: boolean
) => Promise.all(files.map((file) => readJsonFile(file, visualizationType, allFileDetails)).filter(Boolean));

const csvFilesToVisualizations = async (
  files: FileTypes.FileProperties[],
  fileDetails: FileTypes.FileDetails,
  visualizationType: VisualizationTypes.VisualizationTypesEnum,
  allFileDetails: boolean
) => Promise.all(files.map((file) => readCsvFile(file, fileDetails, visualizationType, allFileDetails)).filter(Boolean));

const xmlFilesToVisualizations = async (
  files: FileTypes.FileProperties[],
  visualizationType: VisualizationTypes.VisualizationTypesEnum,
  allFileDetails: boolean
) => Promise.all(files.map((file) => readXmlFile(file, visualizationType, allFileDetails)).filter(Boolean));

export {
  excelFilesToVisualizations, jsonFilesToVisualizations, csvFilesToVisualizations, xmlFilesToVisualizations
};
