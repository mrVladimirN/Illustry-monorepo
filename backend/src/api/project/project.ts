import { NextFunction, Request, Response } from 'express';
import { generateErrorMessage } from 'zod-error';
import { ProjectTypes, VisualizationTypes } from '@illustry/types';
import prettifyZodError from '../../validators/prettifyError';
import Factory from '../../factory';
import { returnResponse } from '../../utils/helper';
import {
  projectCreateSchema,
  projectFilterSchema,
  projectUpdateSchema,
  visualizationTypeSchema
} from '../../validators/allValidators';

const create = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      projectName,
      projectDescription,
      isActive,
      name,
      type,
      description,
      tags,
      data
    } = request.body;

    const project: ProjectTypes.ProjectCreate = {
      name: projectName,
      description: projectDescription,
      isActive
    };

    const visualization: VisualizationTypes.VisualizationCreate = {
      name,
      projectName,
      type,
      description,
      tags,
      data
    };

    const projectValidationResult = projectCreateSchema.safeParse(project);
    if (!projectValidationResult.success) {
      const errorMessage = generateErrorMessage(
        projectValidationResult.error.issues,
        prettifyZodError()
      );
      throw new Error(errorMessage);
    }

    if (
      visualization.name
      && visualization.type
      && visualization.projectName
    ) {
      const visualizationValidationResult = visualizationTypeSchema.safeParse(visualization);
      if (!visualizationValidationResult.success) {
        const errorMessage = generateErrorMessage(
          visualizationValidationResult.error.issues,
          prettifyZodError()
        );
        throw new Error(errorMessage);
      }
    }

    await Factory.getInstance().getBZL().ProjectBZL.create(project);

    if (visualization && visualization.name && visualization.type && visualization.projectName) {
      await Factory.getInstance().getBZL().VisualizationBZL.createOrUpdate(visualization);
    }

    returnResponse(response, null, project, next);
  } catch (err) {
    returnResponse(response, (err as Error), null, next);
  }
};

const update = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      description,
      isActive
    } = request.body;

    const projectFilter: ProjectTypes.ProjectFilter = {
      name
    };

    const project: ProjectTypes.ProjectUpdate = {
      description,
      isActive
    };

    const projectValidationResult = projectUpdateSchema.safeParse(project);
    if (!projectValidationResult.success) {
      const errorMessage = generateErrorMessage(
        projectValidationResult.error.issues,
        prettifyZodError()
      );
      throw new Error(errorMessage);
    }

    const projectFilterValidationResult = projectFilterSchema.safeParse(projectFilter);
    if (!projectFilterValidationResult.success) {
      const errorMessage = generateErrorMessage(
        projectFilterValidationResult.error.issues,
        prettifyZodError()
      );
      throw new Error(errorMessage);
    }

    const data = await Factory.getInstance()
      .getBZL()
      .ProjectBZL
      .update(projectFilter, project);

    returnResponse(response, null, data, next);
  } catch (err) {
    returnResponse(response, (err as Error), null, next);
  }
};

const findOne = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      name
    } = request.body;

    const projectFilter: ProjectTypes.ProjectFilter = {
      name
    };

    const result = projectFilterSchema.safeParse(projectFilter);

    if (!result.success) {
      const errorMessage = generateErrorMessage(
        result.error.issues,
        prettifyZodError()
      );
      throw new Error(errorMessage);
    }

    const data = await Factory.getInstance()
      .getBZL()
      .ProjectBZL
      .findOne(projectFilter);

    returnResponse(response, null, data, next);
  } catch (err) {
    returnResponse(response, (err as Error), null, next);
  }
};

const _delete = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      name
    } = request.body;

    const projectFilter: ProjectTypes.ProjectFilter = {
      name
    };

    const result = projectFilterSchema.safeParse(projectFilter);

    if (!result.success) {
      const errorMessage = generateErrorMessage(
        result.error.issues,
        prettifyZodError()
      );
      throw new Error(errorMessage);
    }

    const data = await Factory.getInstance()
      .getBZL()
      .ProjectBZL
      .delete(projectFilter);

    returnResponse(response, null, data, next);
  } catch (err) {
    returnResponse(response, (err as Error), null, next);
  }
};

const browse = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      text,
      page,
      sort,
      per_page: perPage
    } = request.body;

    const projectFilter: ProjectTypes.ProjectFilter = {
      name,
      text,
      page,
      sort,
      per_page: perPage
    };

    const result = projectFilterSchema.safeParse(projectFilter);

    if (!result.success) {
      const errorMessage = generateErrorMessage(
        result.error.issues,
        prettifyZodError()
      );
      throw new Error(errorMessage);
    }

    const data = await Factory.getInstance()
      .getBZL()
      .ProjectBZL
      .browse(projectFilter);

    returnResponse(response, null, data, next);
  } catch (err) {
    returnResponse(response, (err as Error), null, next);
  }
};

export {
  create, update, findOne, _delete, browse
};
