import { NextFunction, Request, Response } from 'express';
import { FileTypes, VisualizationTypes, ValidatorSchemas } from '@illustry/types';
import { returnResponse } from '../../utils/helper';
import FileError from '../../errors/fileError';
import Factory from '../../factory';

const createOrUpdate = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let requestFiles: FileTypes.UploadedFile[] = [];
    if (request && (request as FileTypes.RequestWithFiles).files) {
      const { files: { file } } = request as FileTypes.RequestWithFiles;
      requestFiles = file;
    }
    if (!requestFiles) {
      return returnResponse(
        response,
        new FileError('No files uploaded'),
        null,
        next
      );
    }

    const computedFiles: FileTypes.FileProperties[] = requestFiles.map((f) => ({
      filePath: f.path,
      type: f.mimetype
    }));

    const { fileDetails: reqFDet, visualizationDetails: reqVisDet, fullDetails } = request.body;

    let fileDetails;
    let visualizationDetails;

    if (reqFDet) {
      fileDetails = JSON.parse(reqFDet);
    }

    if (reqVisDet) {
      visualizationDetails = JSON.parse(reqVisDet);
    }

    const allFileDetails = fullDetails === 'true';
    const data = await Factory.getInstance()
      .getBZL()
      .VisualizationBZL.createOrUpdateFromFiles(
        computedFiles,
        allFileDetails,
        visualizationDetails,
        fileDetails
      );

    return returnResponse(response, null, data, next);
  } catch (err) {
    return returnResponse(response, (err as Error), null, next);
  }
};

const findOne = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params: { name }, body: { type } } = request;

    const visualizationFilter: VisualizationTypes.VisualizationFilter = {
      name,
      type
    };

    ValidatorSchemas.validateWithSchema<Record<string, unknown>>(ValidatorSchemas.visualizationFilterSchema, visualizationFilter);

    const data = await Factory.getInstance()
      .getBZL()
      .VisualizationBZL.findOne(visualizationFilter);

    return returnResponse(response, null, data, next);
  } catch (err) {
    return returnResponse(response, (err as Error), null, next);
  }
};

const browse = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      body: {
        text, page, sort, per_page: perPage
      }
    } = request;

    const visualizationFilter: VisualizationTypes.VisualizationFilter = {
      text,
      page,
      sort,
      per_page: perPage
    };

    ValidatorSchemas.validateWithSchema<Record<string, unknown>>(ValidatorSchemas.visualizationFilterSchema, visualizationFilter);

    const data = await Factory.getInstance()
      .getBZL()
      .VisualizationBZL.browse(visualizationFilter);

    return returnResponse(response, null, data, next);
  } catch (err) {
    return returnResponse(response, (err as Error), null, next);
  }
};

const _delete = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body: { name, type, projectName } } = request;

    const visualizationFilter: VisualizationTypes.VisualizationFilter = {
      name,
      type,
      projectName
    };

    ValidatorSchemas.validateWithSchema<Record<string, unknown>>(ValidatorSchemas.visualizationFilterSchema, visualizationFilter);

    const data = await Factory.getInstance()
      .getBZL()
      .VisualizationBZL.delete(visualizationFilter);

    return returnResponse(response, null, data, next);
  } catch (err) {
    return returnResponse(response, (err as Error), null, next);
  }
};

export {
  createOrUpdate, findOne, browse, _delete
};
