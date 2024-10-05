import * as fs from 'fs';
import { FileTypes, VisualizationTypes } from '@illustry/types';
import readline from 'readline';
import { parseStringPromise } from 'xml2js';
import {
  jsonDataProvider,
  exelOrCsvdataProvider,
  xmlDataProvider
} from '../bzl/transformers/preprocess/dataProvider';
import transformerProvider from '../bzl/transformers/preprocess/transformersProvider';
import FileError from '../errors/fileError';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const XlsxStreamReader = require('xlsx-stream-reader');

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
    const visualization = JSON.parse(finalText) as Record<string, unknown>;
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
      const visualization = (await parseStringPromise(finalText)) as Record<
        string,
        unknown
      >;
      const finalType = visualization
        && (visualization.root as Record<string, unknown>)
        && ((visualization.root as Record<string, unknown>).type as string[])
        && ((visualization.root as Record<string, unknown>).type as string[])
          .length > 0
        ? ((
          (visualization.root as Record<string, unknown>).type as string[]
        )[0] as VisualizationTypes.VisualizationTypesEnum)
        : visualizationType;
      resolve(xmlDataProvider(finalType, visualization, allFileDetails));
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
  const workBookReader = new XlsxStreamReader();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const computedRows: any[] = [];

  const buffer = fs.createReadStream(file.filePath);
  buffer.pipe(workBookReader);

  workBookReader.on('error', () => {
    reject(new FileError('Problems while uploading the files'));
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  workBookReader.on('worksheet', (workSheetReader: any) => {
    const sheets = fileDetails && fileDetails.sheets && fileDetails.sheets.length > 0
      ? +fileDetails.sheets
      : 1;
    if (workSheetReader.id > sheets) {
      workSheetReader.skip();
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    workSheetReader.on('row', (row: any) => {
      const includeHeaders = fileDetails && fileDetails.includeHeaders;
      if (!includeHeaders) {
        if (+row.attributes.r !== 1) {
          // skip first row (because it is header)
          computedRows.push(
            transformerProvider(
              visualizationType,
              fileDetails.mapping,
              row.values,
              allFileDetails
            )
          );
        }
      } else {
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
    workSheetReader.on('end', () => { });

    // call process after registering handlers
    workSheetReader.process();
  });

  workBookReader.on('end', async () => {
    await fs.promises.unlink(file.filePath);
    resolve(
      exelOrCsvdataProvider(visualizationType, computedRows, allFileDetails)
    );
  });
});

const readCsvFile = (
  file: FileTypes.FileProperties,
  fileDetails: FileTypes.FileDetails,
  visualizationType: VisualizationTypes.VisualizationTypesEnum,
  allFileDetails: boolean
) => {
  const computedRows: unknown[] = [];
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
      } else {
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
    readliner.on('close', () => {
      fs.unlinkSync(file.filePath);
      resolve(
        exelOrCsvdataProvider(visualizationType, computedRows as Record<string, unknown>[], allFileDetails)
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
) => Promise.all(files.map((file) => readExcelFile(file, fileDetails, visualizationType, allFileDetails)));

const jsonFilesToVisualizations = async (
  files: FileTypes.FileProperties[],
  visualizationType: VisualizationTypes.VisualizationTypesEnum,
  allFileDetails: boolean
) => Promise.all(files.map((file) => readJsonFile(file, visualizationType, allFileDetails)));

const csvFilesToVisualizations = async (
  files: FileTypes.FileProperties[],
  fileDetails: FileTypes.FileDetails,
  visualizationType: VisualizationTypes.VisualizationTypesEnum,
  allFileDetails: boolean
) => Promise.all(files.map((file) => readCsvFile(file, fileDetails, visualizationType, allFileDetails)));

const xmlFilesToVisualizations = async (
  files: FileTypes.FileProperties[],
  visualizationType: VisualizationTypes.VisualizationTypesEnum,
  allFileDetails: boolean
) => Promise.all(files.map((file) => readXmlFile(file, visualizationType, allFileDetails)));

export {
  excelFilesToVisualizations, jsonFilesToVisualizations, csvFilesToVisualizations, xmlFilesToVisualizations
};
