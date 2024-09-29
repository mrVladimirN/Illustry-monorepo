import validator from 'validator';
import {
  VisualizationTypes, GenericTypes, UtilTypes
} from '@illustry/types';
import ModelInstance from '../../models/modelInstance';

const PAGE_SIZE = 10;
class Visualization implements GenericTypes.BaseLib<
  VisualizationTypes.VisualizationCreate,
  VisualizationTypes.VisualizationUpdate,
  VisualizationTypes.VisualizationFilter,
  VisualizationTypes.VisualizationType,
  VisualizationTypes.ExtendedVisualizationType> {
  private modelInstance: ModelInstance;

  constructor(modelInstance: ModelInstance) {
    this.modelInstance = modelInstance;
  }

  createFilter(filter: VisualizationTypes.VisualizationFilter): UtilTypes.ExtendedMongoQuery {
    const query: UtilTypes.MongoQuery = { $and: [] };
    if (filter.name) {
      (query.$and as Array<object>).push({
        name: filter.name
      });
    }
    if (filter.projectName) {
      (query.$and as Array<object>).push({
        projectName: filter.projectName
      });
    }
    if (filter.tags) {
      (query.$and as Array<object>).push({
        tags: { $in: filter.tags }
      });
    }
    if (filter.type) {
      if (typeof filter.type === 'string') {
        (query.$and as Array<object>).push({
          type: filter.type
        });
      } else {
        (query.$and as Array<object>).push({
          type: { $in: filter.type }
        });
      }
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
          },
          {
            type: { $regex: regexPattern }
          },
          {
            tags: { $in: [regexPattern] }
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

  create(data: VisualizationTypes.VisualizationCreate): Promise<VisualizationTypes.VisualizationType> {
    return Promise.resolve()
      .then(() => {
        const newData = { ...data };
        if (!newData.createdAt) {
          newData.createdAt = new Date();
          newData.updatedAt = new Date();
        }
        return this.modelInstance.VisualizationModel.create(newData);
      });
  }

  findOne(filter: UtilTypes.ExtendedMongoQuery): Promise<VisualizationTypes.VisualizationType | null> {
    return Promise.resolve()
      .then(() => this.modelInstance.VisualizationModel.findOne(filter.query));
  }

  browse(filter: UtilTypes.ExtendedMongoQuery): Promise<VisualizationTypes.ExtendedVisualizationType> {
    return Promise.resolve()
      .then(() => this.modelInstance.VisualizationModel.find(
        filter.query ? filter.query : {},
        {
          __v: 0,
          _id: 0,
          data: 0,
          projectName: 0
        },
        {
          sort: filter.sort ? filter.sort : { name: 1 },
          skip: filter && filter.page ? Number(filter.page) : 0,
          limit: filter.per_page
        }
      ))
      .then(async (res) => {
        const count = await this.modelInstance.VisualizationModel.countDocuments(
          filter.query ? filter.query : {}
        );
        return {
          visualizations: res,
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
    data: VisualizationTypes.VisualizationUpdate
  ): Promise<VisualizationTypes.VisualizationType | null> {
    const newData = { ...data };
    if (!newData.createdAt) {
      newData.createdAt = new Date();
    }
    newData.updatedAt = new Date();
    return Promise.resolve()
      .then(() => this.modelInstance.VisualizationModel.findOneAndUpdate(
        filter.query,
        newData,
        { upsert: true, new: true }
      ));
  }

  async delete(filter: UtilTypes.ExtendedMongoQuery): Promise<boolean> {
    await Promise.resolve()
      .then(() => this.modelInstance.VisualizationModel.deleteOne(filter.query));
    return true;
  }

  async deleteMany(filter: UtilTypes.ExtendedMongoQuery): Promise<boolean> {
    await Promise.resolve()
      .then(() => this.modelInstance.VisualizationModel.deleteMany(filter.query));
    return true;
  }
}

export default Visualization;