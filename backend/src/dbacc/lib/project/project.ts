import validator from 'validator';
import {
  ProjectTypes, GenericTypes, UtilTypes
} from '@illustry/types';
import ModelInstance from '../../models/modelInstance';

const PAGE_SIZE = 10;
class Project implements GenericTypes.BaseLib<
  ProjectTypes.ProjectCreate,
  ProjectTypes.ProjectUpdate,
  ProjectTypes.ProjectFilter,
  ProjectTypes.ProjectType,
  ProjectTypes.ExtendedProjectType> {
  private modelInstance: ModelInstance;

  constructor(modelInstance: ModelInstance) {
    this.modelInstance = modelInstance;
  }

  createFilter(filter: ProjectTypes.ProjectFilter): UtilTypes.ExtendedMongoQuery {
    const query: UtilTypes.MongoQuery = { $and: [] };
    if (filter.name) {
      (query.$and as Array<object>).push({
        name: filter.name
      });
    }
    if (filter.isActive) {
      (query.$and as Array<object>).push({
        isActive: filter.isActive
      });
    }
    if (filter.text) {
      const regexPattern = new RegExp(
        validator.blacklist(filter.text, "<>\"'&;@()[]{}/\\|%+=?~`,$"),
        'i'
      );
      (query.$and as Array<object>).push({
        $or: [
          {
            name: { $regex: regexPattern }
          },
          {
            description: { $regex: regexPattern }
          }
        ]
      });
    }

    if ((query.$and as Array<object>).length === 0) delete query.$and;

    const skip = filter && filter.page && filter.page > 1
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
      query,
      page: skip,
      sort,
      per_page: filter.per_page ? filter.per_page : PAGE_SIZE
    };
  }

  create(data: ProjectTypes.ProjectCreate): Promise<ProjectTypes.ProjectType> {
    return Promise.resolve()
      .then(() => {
        if (!data.createdAt) {
          data.createdAt = new Date();
          data.updatedAt = new Date();
        }
        if (!data.isActive) {
          return this.modelInstance.ProjectModel.create(data);
        }
        return this.modelInstance.ProjectModel.updateMany(
          {},
          { $set: { isActive: false } }
        ).then(() => this.modelInstance.ProjectModel.create(data));
      });
  }

  findOne(filter: UtilTypes.ExtendedMongoQuery): Promise<ProjectTypes.ProjectType | null> {
    return Promise.resolve()
      .then(() => this.modelInstance.ProjectModel.findOne(filter.query, {
        __v: 0,
        _id: 0
      }));
  }

  browse(filter: UtilTypes.ExtendedMongoQuery): Promise<ProjectTypes.ExtendedProjectType> {
    return Promise.resolve()
      .then(() => this.modelInstance.ProjectModel.find(
        filter.query ? filter.query : {},
        {
          __v: 0,
          _id: 0
        },
        {
          sort: filter.sort ? filter.sort : { name: 1 },
          skip: filter && filter.page ? filter.page : 0,
          limit: filter.per_page
        }
      ))
      .then(async (res) => {
        const count = await this.modelInstance.ProjectModel.countDocuments(
          filter.query ? filter.query : {}
        );
        return {
          projects: res,
          pagination: {
            count,
            pageCount:
              count > 0
                ? count / (filter.per_page ? filter.per_page : PAGE_SIZE)
                : 1
          }
        };
      });
  }

  update(
    filter: UtilTypes.ExtendedMongoQuery,
    data: ProjectTypes.ProjectUpdate
  ): Promise<ProjectTypes.ProjectType | null> {
    return Promise.resolve()
      .then(async () => {
        const foundProject = await this.findOne(filter);
        if (foundProject) {
          if (!data.createdAt) {
            data.createdAt = new Date();
          }
        }
        data.updatedAt = new Date();
        if (!data.isActive) {
          return this.modelInstance.ProjectModel.findOneAndUpdate(
            filter.query,
            data,
            {
              upsert: true,
              new: true
            }
          );
        }
        return this.modelInstance.ProjectModel.updateMany(
          {},
          { $set: { isActive: false } }
        )
          .then(() => this.modelInstance.ProjectModel.findOneAndUpdate(
            filter.query,
            data,
            {
              upsert: true,
              new: true
            }
          ));
      });
  }

  async delete(filter: UtilTypes.ExtendedMongoQuery): Promise<boolean> {
    await Promise.resolve()
      .then(() => this.modelInstance.ProjectModel.deleteOne(filter.query));
    return true;
  }
}
export default Project;