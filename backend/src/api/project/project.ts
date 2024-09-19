import { NextFunction, Request, Response } from 'express';
import * as Bluebird from 'bluebird';

import { generateErrorMessage } from 'zod-error';
import _ from 'lodash';
import {
  ProjectCreate,
  ProjectFilter,
  ProjectType,
  ProjectUpdate
} from 'types/project';

import { VisualizationCreate } from 'types/visualizations';
import prettifyZodError from '../../validators/prettifyError';
import Factory from '../../factory';
import { returnResponse } from '../../utils/helper';
import {
  projectCreateSchema,
  projectFilterSchema,
  projectUpdateSchema,
  visualizationTypeSchema
} from '../../validators/allValidators';

export const create = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const project: ProjectCreate = {
    name: request && request.body && request.body.projectName,
    description: request && request.body && request.body.projectDescription,
    isActive: request && request.body && request.body.isActive
  };
  const visualization: VisualizationCreate = {
    name: request && request.body && request.body.name,
    projectName: request && request.body && request.body.projectName,
    type: request && request.body && request.body.type,
    description: request && request.body && request.body.description,
    tags: request && request.body && request.body.tags,
    data: request && request.body && request.body.data
  };

  return Bluebird.Promise.resolve(projectCreateSchema.safeParse(project))
    .then((result) => {
      if (!result.success) {
        const errorMessage = generateErrorMessage(
          result.error.issues,
          prettifyZodError()
        );
        throw new Error(errorMessage);
      } else {
        if (
          !_.isNil(visualization)
          && !_.isNil(visualization.name)
          && !_.isNil(visualization.type)
          && !_.isNil(visualization.projectName)
        ) {
          return Bluebird.Promise.resolve(
            visualizationTypeSchema.safeParse(visualization)
          ).then((res) => {
            if (!res.success) {
              const errorMessage = generateErrorMessage(
                res.error.issues,
                prettifyZodError()
              );
              throw new Error(errorMessage);
            } else {
              return Factory.getInstance()
                .getBZL()
                .ProjectBZL.create(project)
                .then(() => Factory.getInstance()
                  .getBZL()
                  .VisualizationBZL.createOrUpdate(visualization));
            }
          });
        }
        return Bluebird.Promise.resolve(Factory.getInstance().getBZL().ProjectBZL.create(project));
      }
    })
    .asCallback((errGPC: Error, data: ProjectType) => returnResponse(response, errGPC, data, next))
    .catch((err: Error) => returnResponse(response, err, null, next));
};
export const update = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const project: ProjectUpdate = {
    description: request && request.body && request.body.description,
    isActive: request && request.body && request.body.isActive
  };
  const projectFilter: ProjectFilter = {
    name: request && request.body && request.body.name
  };
  return Bluebird.Promise.resolve(projectUpdateSchema.safeParse(project))
    .then((result) => {
      if (!result.success) {
        const errorMessage = generateErrorMessage(
          result.error.issues,
          prettifyZodError()
        );
        throw new Error(errorMessage);
      } else {
        return Bluebird.Promise.resolve(
          projectFilterSchema.safeParse(projectFilter)
        ).then((res) => {
          if (!res.success) {
            const errorMessage = generateErrorMessage(
              res.error.issues,
              prettifyZodError()
            );
            throw new Error(errorMessage);
          } else {
            return Factory.getInstance()
              .getBZL()
              .ProjectBZL.update(projectFilter, project);
          }
        });
      }
    })
    .asCallback((errGPC: Error, data: ProjectType) => returnResponse(response, errGPC, data, next))
    .catch((err: Error) => returnResponse(response, err, null, next));
};
export const findOne = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const projectFilter: ProjectFilter = {
    name: request && request.body && request.body.name
  };
  return Bluebird.Promise.resolve(projectFilterSchema.safeParse(projectFilter))
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
          .ProjectBZL.findByName(projectFilter);
      }
    })
    .asCallback((errGPC: Error, data: ProjectType) => returnResponse(response, errGPC, data, next))
    .catch((err: Error) => returnResponse(response, err, null, next));
};
// eslint-disable-next-line no-underscore-dangle
export const _delete = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const projectFilter: ProjectFilter = {
    name: request && request.body && request.body.name
  };
  return Bluebird.Promise.resolve(projectFilterSchema.safeParse(projectFilter))
    .then((result) => {
      if (!result.success) {
        const errorMessage = generateErrorMessage(
          result.error.issues,
          prettifyZodError()
        );
        throw new Error(errorMessage);
      } else {
        return Factory.getInstance().getBZL().ProjectBZL.delete(projectFilter);
      }
    })
    .asCallback((errGPC: Error, data: ProjectType) => returnResponse(response, errGPC, data, next))
    .catch((err: Error) => returnResponse(response, err, null, next));
};
export const browse = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const projectFilter: ProjectFilter = {
    name: request && request.body && request.body.name,
    text: request && request.body && request.body.text,
    page: request && request.body && request.body.page,
    sort: request && request.body && request.body.sort,
    per_page: request && request.body && request.body.per_page
  };
  return Bluebird.Promise.resolve(projectFilterSchema.safeParse(projectFilter))
    .then((result) => {
      if (!result.success) {
        const errorMessage = generateErrorMessage(
          result.error.issues,
          prettifyZodError()
        );
        throw new Error(errorMessage);
      } else {
        return Factory.getInstance().getBZL().ProjectBZL.browse(projectFilter);
      }
    })
    .asCallback((errGPC: Error, data: ProjectType) => returnResponse(response, errGPC, data, next))
    .catch((err: Error) => returnResponse(response, err, null, next));
};
