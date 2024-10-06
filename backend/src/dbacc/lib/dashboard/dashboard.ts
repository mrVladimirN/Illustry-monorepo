import validator from 'validator';
import {
  DashboardTypes, GenericTypes, UtilTypes
} from '@illustry/types';
import ModelInstance from '../../models/modelInstance';

const PAGE_SIZE = 10;
class Dashboard implements GenericTypes.BaseLib<
  DashboardTypes.DashboardCreate,
  DashboardTypes.DashboardUpdate,
  DashboardTypes.DashboardFilter,
  DashboardTypes.DashboardType,
  DashboardTypes.ExtendedDashboardType> {
  private modelInstance: ModelInstance;

  constructor(modelInstance: ModelInstance) {
    this.modelInstance = modelInstance;
  }

  createFilter(filter: DashboardTypes.DashboardFilter): UtilTypes.ExtendedMongoQuery {
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

    let skip: number = 0;
    if (filter && filter.page && filter.page > 1) {
      if (filter.per_page) {
        skip = (filter.page - 1) * filter.per_page;
      } else {
        skip = (filter.page - 1) * PAGE_SIZE;
      }
    }

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

  create(data: DashboardTypes.DashboardCreate): Promise<DashboardTypes.DashboardType> {
    return Promise.resolve()
      .then(() => {
        const finalData = { ...data };
        if (!finalData.createdAt) {
          finalData.createdAt = new Date();
          finalData.updatedAt = new Date();
        }
        return this.modelInstance.DashboardModel.create(finalData);
      });
  }

  findOne(filter: UtilTypes.ExtendedMongoQuery): Promise<DashboardTypes.DashboardType | null> {
    return Promise.resolve()
      .then(() => this.modelInstance.DashboardModel.findOne(filter.query));
  }

  browse(filter: UtilTypes.ExtendedMongoQuery): Promise<DashboardTypes.ExtendedDashboardType> {
    return Promise.resolve()
      .then(() => this.modelInstance.DashboardModel.find(
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
        const count = await this.modelInstance.DashboardModel.countDocuments(
          filter.query ? filter.query : {}
        );
        return {
          dashboards: res,
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
    data: DashboardTypes.DashboardUpdate
  ): Promise<DashboardTypes.DashboardType | null> {
    const finalData = { ...data };
    if (!finalData.createdAt) {
      finalData.createdAt = new Date();
    }
    finalData.updatedAt = new Date();
    return Promise.resolve()
      .then(() => this.modelInstance.DashboardModel.findOneAndUpdate(
        filter.query,
        finalData,
        { upsert: true, new: true }
      ));
  }

  async delete(filter: UtilTypes.ExtendedMongoQuery): Promise<boolean> {
    await Promise.resolve()
      .then(() => this.modelInstance.DashboardModel.deleteOne(filter.query));
    return true;
  }

  async deleteMany(filter: UtilTypes.ExtendedMongoQuery): Promise<boolean> {
    await Promise.resolve()
      .then(() => this.modelInstance.DashboardModel.deleteMany(filter.query));
    return true;
  }
}

export default Dashboard;
