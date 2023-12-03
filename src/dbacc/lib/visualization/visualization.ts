 
import Bluebird from "bluebird";
import { ModelInstance } from "../../models/modelInstance";
import _ from "lodash";
import validator from "validator";
import { ExtendedVisualizationType, VisualizationCreate, VisualizationFilter, VisualizationType, VisualizationUpdate } from "types/visualizations";
import { ExtendedMongoQuery, MongoQuery } from "types/utils";

const PAGE_SIZE = 10;
export class Visualization {
  private modelInstance: ModelInstance;
  constructor(modelInstance: ModelInstance) {
    this.modelInstance = modelInstance;
  }

  createFilter(filter: VisualizationFilter): ExtendedMongoQuery {
    const query: MongoQuery = { $and: [] };
    if (filter.name) {
      (query["$and"] as Array<object>).push({
        name: filter.name,
      });
    }
    if (filter.projectName) {
      (query["$and"] as Array<object>).push({
        projectName: filter.projectName,
      });
    }
    if (filter.tags) {
      (query["$and"] as Array<object>).push({
        tags: { $in: filter.tags },
      });
    }
    if (filter.type) {
      if (typeof filter.type === "string") {
        (query["$and"] as Array<object>).push({
          type: filter.type,
        });
      } else {
        (query["$and"] as Array<object>).push({
          type: { $in: filter.type },
        });
      }
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
          {
            type: { $regex: regexPattern },
          },
          {
            tags: { $in: [regexPattern] },
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

  create(data: VisualizationCreate): Promise<VisualizationType> {
    return Promise.resolve().then(() => {
      if (_.isNil(data.createdAt)) {
        data.createdAt = new Date();
        data.updatedAt = new Date();
      }
      return this.modelInstance.VisualizationModel.create(data);
    });
  }

  findOne(filter: ExtendedMongoQuery): Promise<VisualizationType> {
    return Bluebird.resolve().then(() => {
      return this.modelInstance.VisualizationModel.findOne(filter.query);
    });
  }

  browse(filter: ExtendedMongoQuery): Promise<ExtendedVisualizationType> {
    return Promise.resolve()
      .then(() => {
        return this.modelInstance.VisualizationModel.find(
          filter.query ? filter.query : {},
          {
            __v: 0,
            _id: 0,
            data: 0,
            projectName: 0,
          },
          {
            sort: filter.sort ? filter.sort : { name: 1 },
            skip: filter && filter.page ? _.toNumber(filter.page) : 0,
            limit: filter.per_page,
          }
        );
      })
      .then(async (res) => {
        const count = await this.modelInstance.VisualizationModel.countDocuments(
          filter.query ? filter.query : {}
        );
        return {
          visualizations: res,
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
    data: VisualizationUpdate
  ): Promise<VisualizationType> {
    if (_.isNil(data.createdAt)) {
      data.createdAt = new Date();
    }
    if (_.isNil(data.updatedAt)) {
      data.updatedAt = new Date();
    }
    return Bluebird.resolve().then(() => {
      return this.modelInstance.VisualizationModel.findOneAndUpdate(
        filter.query,
        data,
        { upsert: true, new: true }
      );
    });
  }

  delete(filter: ExtendedMongoQuery): Promise<boolean> {
    return Promise.resolve().then(() => {
      return Bluebird.resolve(
        this.modelInstance.VisualizationModel.deleteOne(filter.query)
      ).thenReturn(true);
    });
  }
  deleteMany(filter: ExtendedMongoQuery): Promise<boolean> {
    return Promise.resolve().then(() => {
      return Bluebird.resolve(
        this.modelInstance.VisualizationModel.deleteMany(filter.query)
      ).thenReturn(true);
    });
  }
}
