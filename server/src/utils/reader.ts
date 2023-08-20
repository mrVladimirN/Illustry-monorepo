import _ from "lodash";
import { Promise, reject, resolve } from "bluebird";
import * as fs from "fs";
import { FileError } from "../errors/fileError";

import { generateErrorMessage } from "zod-error";
import { prettifyZodError } from "../validators/prettifyError";
import { FileProperties } from "types/files";
import { VisualizationCreate } from "types/visualizations";
import { visualizationPartialTypeSchema } from "../validators/allValidators";

const readFile = (file: FileProperties) => {
  if (file.type === "application/json") {
    return new Promise((resolve, reject) => {
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
        const visualization = JSON.parse(finalText) as VisualizationCreate;
        const validvisualization =
          visualizationPartialTypeSchema.safeParse(visualization);

        if (!validvisualization.success) {
          const errorMessage = generateErrorMessage(
            validvisualization.error.issues,
            prettifyZodError()
          );
          reject(errorMessage);
        } else {
          resolve(visualization);
        }
      });
    });
  }
};
export const readFiles = (files: FileProperties[]) => {
  return Promise.map(files, (file) => {
    return Promise.resolve(readFile(file));
  }).then((files) => {
    return files;
  });
};
