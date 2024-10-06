import {
  DashboardTypes,
  UtilTypes,
  GenericTypes,
  VisualizationTypes
} from '@illustry/types';
import Factory from '../../factory';
import DbaccInstance from '../../dbacc/lib';
import NoDataFoundError from '../../errors/noDataFoundError';
import logger from '../../config/logger';
import DuplicatedElementError from '../../errors/duplicatedElementError';

class DashboardBZL implements GenericTypes.BaseBZL<
  DashboardTypes.DashboardCreate,
  DashboardTypes.DashboardUpdate,
  DashboardTypes.DashboardFilter,
  DashboardTypes.DashboardType,
  DashboardTypes.ExtendedDashboardType> {
  private dbaccInstance: DbaccInstance;

  constructor(dbaccInstance: DbaccInstance) {
    this.dbaccInstance = dbaccInstance;
  }

  async create(dashboard: DashboardTypes.DashboardCreate): Promise<DashboardTypes.DashboardType> {
    try {
      return await this.dbaccInstance.Dashboard.create(dashboard);
    } catch (err) {
      throw new DuplicatedElementError(
        `There already is a Dashboard named ${dashboard.name}`
      );
    }
  }

  async findOne(
    filter: DashboardTypes.DashboardFilter
  ): Promise<DashboardTypes.DashboardType> {
    let newFilter: UtilTypes.ExtendedMongoQuery = {};
    if (filter) {
      newFilter = this.dbaccInstance.Dashboard.createFilter(filter);
    }

    const foundDashboard = await this.dbaccInstance.Dashboard.findOne(newFilter);
    if (!foundDashboard) {
      logger.error(`No Dashboard was found with name ${filter.name}`);
      throw new NoDataFoundError(
        `No Dashboard was found with name ${filter.name}`
      );
    } else {
      const visualizationsData: VisualizationTypes.VisualizationType[] = [];
      const { visualizations, projectName } = foundDashboard;

      if (visualizations) {
        // eslint-disable-next-line no-restricted-syntax
        for (const vizusalization of Object.keys(visualizations)) {
          // eslint-disable-next-line no-await-in-loop
          const visualizationData = await Factory.getInstance()
            .getBZL()
            .VisualizationBZL
            .findOne({
              type: (visualizations as { [name: string]: string })[vizusalization],
              projectName,
              name: vizusalization
            });

          visualizationsData.push(visualizationData);
        }

        foundDashboard.visualizations = visualizationsData;
      }
    }

    return foundDashboard;
  }

  async browse(filter: DashboardTypes.DashboardFilter): Promise<DashboardTypes.ExtendedDashboardType> {
    let newFilter: UtilTypes.ExtendedMongoQuery = {};
    if (filter) {
      newFilter = this.dbaccInstance.Dashboard.createFilter(filter);
    }
    const dashboards = await this.dbaccInstance.Dashboard.browse(newFilter);
    return dashboards;
  }

  async update(
    filter: DashboardTypes.DashboardFilter,
    dashboard: DashboardTypes.DashboardUpdate
  ): Promise<DashboardTypes.DashboardType | null> {
    let newFilter: UtilTypes.ExtendedMongoQuery = {};
    if (filter) {
      newFilter = this.dbaccInstance.Dashboard.createFilter(filter);
    }
    return this.dbaccInstance.Dashboard.update(newFilter, dashboard);
  }

  async delete(filter: DashboardTypes.DashboardFilter): Promise<boolean> {
    let newDashboardFilter: UtilTypes.ExtendedMongoQuery = {};
    if (filter) {
      newDashboardFilter = this.dbaccInstance.Dashboard.createFilter(filter);
    }
    await Promise.resolve(this.dbaccInstance.Dashboard.delete(newDashboardFilter));
    return true;
  }
}

export default DashboardBZL;
