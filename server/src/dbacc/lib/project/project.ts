import { Promise } from "bluebird";
import { ModelInstance } from "../../models/modelInstance";
import _ from "lodash";

import validator from "validator";
import { ExtendedMongoQuery, MongoQuery } from "types/utils";
import { ExtendedProjectType, ProjectCreate, ProjectFilter, ProjectType, ProjectUpdate } from "types/project";

const PAGE_SIZE = 10;
export class Project {
  private modelInstance: ModelInstance;
  constructor(modelInstance: ModelInstance) {
    this.modelInstance = modelInstance;
  }

  createFilter(filter: ProjectFilter): ExtendedMongoQuery {
    const query: MongoQuery = { $and: [] };
    if (filter.name) {
      (query["$and"] as Array<object>).push({
        name: filter.name,
      });
    }
    if(filter.isActive) {
      (query["$and"] as Array<object>).push({
        isActive: filter.isActive,
      });
    }
    if (filter.text) {
      const regexPattern = new RegExp(
        validator.blacklist(filter.text, "<>\"'&;@()[]{}/\\|%+=?~`,$"),
        "i"
      );
      (query["$and"] as Array<object>).push({
        $or: [
          {
            name: { $regex: regexPattern },
          },
          {
            description: { $regex: regexPattern },
          },
        ],
      });
    }

    if ((query["$and"] as Array<object>).length === 0) delete query["$and"];

    const skip =
      filter && filter.page && filter.page > 1
        ? filter.per_page
          ? (filter.page - 1) * filter.per_page
          : (filter.page - 1) * PAGE_SIZE
        : 0;
    let sort = {};
    if (filter.sort && filter.sort.element) {
      const sortField = filter.sort.element;
      const sortOrder = filter.sort.sortOrder === -1 ? -1 : 1;
      sort = { [sortField]: sortOrder };
    }
    return {
      query: query,
      page: skip,
      sort: sort,
      per_page: filter.per_page ? filter.per_page : PAGE_SIZE,
    };
  }

  create(data: ProjectCreate): Promise<ProjectType> {
    return Promise.resolve().then(() => {
      if (!data.isActive) {
        return this.modelInstance.ProjectModel.create(data);
      } else {
        return this.modelInstance.ProjectModel.updateMany(
          {},
          { $set: { isActive: false } }
        ).then(() => {
          return this.modelInstance.ProjectModel.create(data);
        });
      }
    });
  }

  findByName(filter: ExtendedMongoQuery): Promise<ProjectType> {
    return Promise.resolve().then(() => {
      return this.modelInstance.ProjectModel.findOne(filter.query, {
        __v: 0,
        _id: 0,
      });
    });
  }

  browse(filter: ExtendedMongoQuery): Promise<ExtendedProjectType> {
    return Promise.resolve()
      .then(() => {
        return this.modelInstance.ProjectModel.find(
          filter.query ? filter.query : {},
          {
            __v: 0,
            _id: 0,
          },
          {
            sort: filter.sort ? filter.sort : { name: 1 },
            skip: filter && filter.page ? filter.page : 0,
            limit: filter.per_page,
          }
        );
      })
      .then(async (res) => {
        const count = await this.modelInstance.ProjectModel.countDocuments(
          filter.query ? filter.query : {}
        );
        return {
          projects: res,
          pagination: {
            count: count,
            pageCount:
              count > 0
                ? count / (filter.per_page ? filter.per_page : PAGE_SIZE)
                : 1,
          },
        };
      });
  }

  update(
    filter: ExtendedMongoQuery,
    data: ProjectUpdate
  ): Promise<ProjectType> {
    return Promise.resolve().then(() => {
      if (!data.isActive) {
        return this.modelInstance.ProjectModel.findOneAndUpdate(
          filter.query,
          data,
          {
            upsert: true,
            new: true,
          }
        );
      } else {
        return this.modelInstance.ProjectModel.updateMany(
          {},
          { $set: { isActive: false } }
        ).then(() => {
          return this.modelInstance.ProjectModel.findOneAndUpdate(
            filter.query,
            data,
            {
              upsert: true,
              new: true,
            }
          );
        });
      }
    });
  }

  delete(filter: ExtendedMongoQuery): Promise<boolean> {
    return Promise.resolve()
      .then(() => {
        return this.modelInstance.ProjectModel.deleteOne(filter.query);
      })
      .thenReturn(true);
  }
}
