import { NextFunction, Request, Response } from 'express';
import { generateErrorMessage } from 'zod-error';
import { DashboardTypes } from '@illustry/types';
import prettifyZodError from '../../validators/prettifyError';
import Factory from '../../factory';
import { returnResponse } from '../../utils/helper';
import {
  dashboardCreateSchema,
  dashboardFilterSchema,
  dashboardUpdateSchema
} from '../../validators/allValidators';

const create = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      dashboardName,
      dashboardDescription,
      name,
      visualizations
    } = request.body;

    const dashboard: DashboardTypes.DashboardCreate = {
      name: dashboardName,
      description: dashboardDescription,
      projectName: name,
      visualizations
    };

    const dashboardValidationResult = dashboardCreateSchema.safeParse(dashboard);
    if (!dashboardValidationResult.success) {
      const errorMessage = generateErrorMessage(
        dashboardValidationResult.error.issues,
        prettifyZodError()
      );
      throw new Error(errorMessage);
    }

    await Factory.getInstance().getBZL().DashboardBZL.create(dashboard);

    returnResponse(response, null, { dashboard }, next);
  } catch (err) {
    returnResponse(response, (err as Error), null, next);
  }
};

const update = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name,
      description,
      visualizations
    } = request.body;

    const dashboardFilter: DashboardTypes.DashboardFilter = {
      name
    };

    const dashboard: DashboardTypes.DashboardUpdate = {
      description,
      visualizations
    };

    const dashboardValidationResult = dashboardUpdateSchema.safeParse(dashboard);
    if (!dashboardValidationResult.success) {
      const errorMessage = generateErrorMessage(
        dashboardValidationResult.error.issues,
        prettifyZodError()
      );
      throw new Error(errorMessage);
    }

    const dashboardFilterValidationResult = dashboardFilterSchema.safeParse(dashboardFilter);
    if (!dashboardFilterValidationResult.success) {
      const errorMessage = generateErrorMessage(
        dashboardFilterValidationResult.error.issues,
        prettifyZodError()
      );
      throw new Error(errorMessage);
    }

    const data = await Factory.getInstance()
      .getBZL()
      .DashboardBZL
      .update(dashboardFilter, dashboard);

    returnResponse(response, null, data, next);
  } catch (err) {
    returnResponse(response, (err as Error), null, next);
  }
};

const findOne = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params: { name } } = request;

    const dashboardFilter: DashboardTypes.DashboardFilter = {
      name
    };

    const result = dashboardFilterSchema.safeParse(dashboardFilter);

    if (!result.success) {
      const errorMessage = generateErrorMessage(
        result.error.issues,
        prettifyZodError()
      );
      throw new Error(errorMessage);
    }

    const data = await Factory.getInstance()
      .getBZL()
      .DashboardBZL
      .findOne(dashboardFilter);

    returnResponse(response, null, data, next);
  } catch (err) {
    returnResponse(response, (err as Error), null, next);
  }
};

const _delete = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name
    } = request.body;

    const dashboardFilter: DashboardTypes.DashboardFilter = {
      name
    };

    const result = dashboardFilterSchema.safeParse(dashboardFilter);

    if (!result.success) {
      const errorMessage = generateErrorMessage(
        result.error.issues,
        prettifyZodError()
      );
      throw new Error(errorMessage);
    }

    const data = await Factory.getInstance()
      .getBZL()
      .DashboardBZL
      .delete(dashboardFilter);

    returnResponse(response, null, data, next);
  } catch (err) {
    returnResponse(response, (err as Error), null, next);
  }
};

const browse = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name,
      text,
      page,
      sort,
      per_page: perPage
    } = request.body;

    const dashboardFilter: DashboardTypes.DashboardFilter = {
      name,
      text,
      page,
      sort,
      per_page: perPage
    };

    const result = dashboardFilterSchema.safeParse(dashboardFilter);

    if (!result.success) {
      const errorMessage = generateErrorMessage(
        result.error.issues,
        prettifyZodError()
      );
      throw new Error(errorMessage);
    }

    const data = await Factory.getInstance()
      .getBZL()
      .DashboardBZL
      .browse(dashboardFilter);

    returnResponse(response, null, data, next);
  } catch (err) {
    returnResponse(response, (err as Error), null, next);
  }
};

export {
  create, update, findOne, _delete, browse
};
