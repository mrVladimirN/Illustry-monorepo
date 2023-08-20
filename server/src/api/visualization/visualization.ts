import { Request, Response } from "express";
import * as Bluebird from "bluebird";
import _ from "lodash";
import { returnResponse } from "../../utils/helper";
import { FileError } from "../../errors/fileError";

import { Factory } from "../../factory";

import { generateErrorMessage } from "zod-error";
import { prettifyZodError } from "../../validators/prettifyError";
import { FileProperties } from "types/files";
import { VisualizationCreate, VisualizationType,VisualizationFilter } from "types/visualizations";
import { visualizationFilterSchema } from "../../validators/allValidators";

export const createOrUpdate = (
  request: Request,
  response: Response,
  next: Function
) => {
  const files = _.get(request, "files.File");
  if (_.isNil(files))
    return returnResponse(
      response,
      new FileError("No files uploaded"),
      null,
      next
    );
  const computedFiles: FileProperties[] = _.map(files, (f) => {
    return {
      filePath: _.get(f, "path") as unknown as string,
      type: _.get(f, "mimetype") as unknown as string,
    };
  });
  return Bluebird.Promise.resolve(
    Factory.getInstance()
      .getBZL()
      .VisualizationBZL.createOrUpdateFromFiles(computedFiles)
  )
    .asCallback((errGPC: Error, data: VisualizationType) => {
      return returnResponse(response, errGPC, data, next);
    })
    .catch((err: Error) => {
      return returnResponse(response, err, null, next);
    });
};
 
// export const update = (
//   request: Request,
//   response: Response,
//   next: Function
// ) => {
//   const VisualizationUpdate: VisualizationCreate = {
//     name: request && request.body && request.body.name,
//     description: request && request.body && request.body.description,
//     tags: request && request.body && request.body.tags,
//     projectName: request && request.body && request.body.projectName,
//     type: request && request.body && request.body.type,
//     data: undefined,
//   };

//   return Bluebird.Promise.resolve(
//     VisualizationPartialTypeSchema.safeParse(VisualizationUpdate)
//   )
//     .then((result) => {
//       if (!result.success) {
//         const errorMessage = generateErrorMessage(
//           result.error.issues,
//           prettifyZodError()
//         );
//         throw new Error(errorMessage);
//       } else {
//         return Factory.getInstance()
//           .getBZL()
//           .VisualizationBZL.createOrUpdate(VisualizationUpdate);
//       }
//     })
//     .asCallback((errGPC: Error, data: ProjectType) => {
//       return returnResponse(response, errGPC, data, next);
//     })
//     .catch((err: Error) => {
//       return returnResponse(response, err, null, next);
//     });
// };
export const findOne = (
  request: Request,
  response: Response,
  next: Function
) => {
  const visualizationFilter: VisualizationFilter = {
    name: request && request.params && request.params.name,
    type: request && request.body && request.body.type,
  };
  return Bluebird.Promise.resolve(
    visualizationFilterSchema.safeParse(visualizationFilter)
  )
    .then((result) => {
      if (!result.success) {
        const errorMessage = generateErrorMessage(
          result.error.issues,
          prettifyZodError()
        );
        throw new Error(errorMessage);
      } else {
        return Factory.getInstance()
          .getBZL()
          .VisualizationBZL.findOne(visualizationFilter);
      }
    })
    .asCallback((errGPC: Error, data: VisualizationType) => {
      return returnResponse(response, errGPC, data, next);
    })
    .catch((err: Error) => {
      return returnResponse(response, err, null, next);
    });
};

export const browse = (
  request: Request,
  response: Response,
  next: Function
) => {
  const visualizationFilter: VisualizationFilter = {
    text: request && request.body && request.body.text,
    page: request && request.body && request.body.page,
    sort: request && request.body && request.body.sort,
  };
  return Bluebird.Promise.resolve(
    visualizationFilterSchema.safeParse(visualizationFilter)
  )
    .then((result) => {
      if (!result.success) {
        const errorMessage = generateErrorMessage(
          result.error.issues,
          prettifyZodError()
        );
        throw new Error(errorMessage);
      } else {
        return Factory.getInstance()
          .getBZL()
          .VisualizationBZL.browse(visualizationFilter);
      }
    })
    .asCallback((errGPC: Error, data: VisualizationType) => {
      return returnResponse(response, errGPC, data, next);
    })
    .catch((err: Error) => {
      return returnResponse(response, err, null, next);
    });
};

export const _delete = (
  request: Request,
  response: Response,
  next: Function
) => {
  const VisualizationFilter: VisualizationFilter = {
    name: request && request.body && request.body.name,
    type: request && request.body && request.body.type,
    projectName: request && request.body && request.body.projectName,
  };
  return Bluebird.Promise.resolve(
    visualizationFilterSchema.safeParse(VisualizationFilter)
  )
    .then((result) => {
      if (!result.success) {
        const errorMessage = generateErrorMessage(
          result.error.issues,
          prettifyZodError()
        );
        throw new Error(errorMessage);
      } else {
        return Factory.getInstance()
          .getBZL()
          .VisualizationBZL.delete(VisualizationFilter);
      }
    })
    .asCallback((errGPC: Error, data: VisualizationType) => {
      return returnResponse(response, errGPC, data, next);
    })
    .catch((err: Error) => {
      return returnResponse(response, err, null, next);
    });
};
