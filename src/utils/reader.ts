import _ from "lodash";
import { Promise } from "bluebird";
import * as fs from "fs";
import { FileError } from "../errors/fileError";
import { FileDetails, FileProperties } from "types/files";
import { VisualizationTypesEnum } from "types/visualizations";
import {
  jsonDataProvider,
  excelDataProvider,
} from "../bzl/transformers/preprocess/dataProvider";
import { transformerProvider } from "../bzl/transformers/preprocess/transformersProvider";

const XlsxStreamReader = require("xlsx-stream-reader");

const readJsonFile = (
  file: FileProperties,
  visualizationType: VisualizationTypesEnum,
  allFileDetails: boolean
) => {
  return new Promise((resolve, reject) => {
    if (file.type !== "application/json") {
      reject(new FileError("The provided file is not JSON format"));
    }
    const buffer = fs.createReadStream(file.filePath);
    let finalText: string = "";
    buffer.on("error", (err: any) => {
      reject(new FileError("Problems while uploading the files"));
    });
    buffer.on("data", (data: string | Buffer) => {
      finalText = finalText + data;
    });
    buffer.on("end", () => {
      fs.unlinkSync(_.get(file, "filePath"));
      const visualization = JSON.parse(finalText) as Record<string, unknown>;
      resolve(
        jsonDataProvider(visualizationType, visualization, allFileDetails)
      );
    });
  });
};

const readExcelFile = (
  file: FileProperties,
  fileDetails: FileDetails,
  visualizationType: VisualizationTypesEnum,
  allFileDetails: boolean
) => {
  return new Promise((resolve, reject) => {
    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      reject(new FileError("The provided file is not EXCEL format"));
    }
    const workBookReader = new XlsxStreamReader();
    const computedRows: any = [];

    const buffer = fs.createReadStream(file.filePath);
    buffer.pipe(workBookReader);

    workBookReader.on("error", (error: any) => {
      reject(new FileError("Problems while uploading the files"));
    });

    workBookReader.on("worksheet", function (workSheetReader: any) {
      const sheets =
        fileDetails && fileDetails.sheets && !_.isEmpty(fileDetails.sheets)
          ? _.toNumber(fileDetails.sheets)
          : 1;
      if (workSheetReader.id > sheets) {
        workSheetReader.skip();
        return;
      }
      workSheetReader.on("row", function (row: any) {
        const includeHeaders = fileDetails && fileDetails.includeHeaders;
        if (!includeHeaders) {
          if (_.toNumber(row.attributes.r) !== 1) {
            //skip first row (because it is header)
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
      workSheetReader.on("end", function () {});

      // call process after registering handlers
      workSheetReader.process();
    });

    workBookReader.on("end", () => {
      fs.unlinkSync(_.get(file, "filePath"));
      resolve(
        excelDataProvider(visualizationType, computedRows, allFileDetails)
      );
    });
  });
};

export const excelFilesToVisualizations = (
  files: FileProperties[],
  fileDetails: FileDetails,
  visualizationType: VisualizationTypesEnum,
  allFileDetails: boolean
) => {
  return Promise.map(files, (file) => {
    return Promise.resolve(
      readExcelFile(file, fileDetails, visualizationType, allFileDetails)
    );
  }).then((files) => {
    return files;
  });
};

export const jsonFilesToVisualizations = (
  files: FileProperties[],
  visualizationType: VisualizationTypesEnum,
  allFileDetails: boolean
) => {
  return Promise.map(files, (file) => {
    return Promise.resolve(
      readJsonFile(file, visualizationType, allFileDetails)
    );
  }).then((files) => {
    return files;
  });
};
