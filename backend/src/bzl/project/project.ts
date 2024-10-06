import {
  ProjectTypes,
  UtilTypes,
  GenericTypes
} from '@illustry/types';
import DbaccInstance from '../../dbacc/lib';
import NoDataFoundError from '../../errors/noDataFoundError';
import logger from '../../config/logger';
import DuplicatedElementError from '../../errors/duplicatedElementError';

class ProjectBZL implements GenericTypes.BaseBZL<
  ProjectTypes.ProjectCreate,
  ProjectTypes.ProjectUpdate,
  ProjectTypes.ProjectFilter,
  ProjectTypes.ProjectType,
  ProjectTypes.ExtendedProjectType> {
  private dbaccInstance: DbaccInstance;

  constructor(dbaccInstance: DbaccInstance) {
    this.dbaccInstance = dbaccInstance;
  }

  async create(project: ProjectTypes.ProjectCreate): Promise<ProjectTypes.ProjectType> {
    try {
      return await this.dbaccInstance.Project.create(project);
    } catch {
      throw new DuplicatedElementError(
        `There already is a project named ${project.name}`
      );
    }
  }

  async findOne(filter: ProjectTypes.ProjectFilter): Promise<ProjectTypes.ProjectType> {
    let newFilter: UtilTypes.ExtendedMongoQuery = {};
    if (filter) {
      newFilter = this.dbaccInstance.Project.createFilter(filter);
    }
    const foundProject = await this.dbaccInstance.Project.findOne(newFilter);
    if (!foundProject) {
      logger.error(`No project was found with name ${filter.name}`);
      throw new NoDataFoundError(
        `No project was found with name ${filter.name}`
      );
    } else {
      return foundProject;
    }
  }

  async browse(filter: ProjectTypes.ProjectFilter): Promise<ProjectTypes.ExtendedProjectType> {
    let newFilter: UtilTypes.ExtendedMongoQuery = {};
    if (filter) {
      newFilter = this.dbaccInstance.Project.createFilter(filter);
    }
    const projects = await this.dbaccInstance.Project.browse(newFilter);
    return projects;
  }

  async update(
    filter: ProjectTypes.ProjectFilter,
    project: ProjectTypes.ProjectUpdate
  ): Promise<ProjectTypes.ProjectType | null> {
    let newFilter: UtilTypes.ExtendedMongoQuery = {};
    if (filter) {
      newFilter = this.dbaccInstance.Project.createFilter(filter);
    }
    return this.dbaccInstance.Project.update(newFilter, project);
  }

  async delete(filter: ProjectTypes.ProjectFilter): Promise<boolean> {
    let newProjectFilter: UtilTypes.ExtendedMongoQuery = {};
    let newVisualizationFilter: UtilTypes.ExtendedMongoQuery = {};
    let newDashboardFilter: UtilTypes.ExtendedMongoQuery = {};
    if (filter) {
      newProjectFilter = this.dbaccInstance.Project.createFilter(filter);
      newVisualizationFilter = this.dbaccInstance.Visualization.createFilter({
        projectName: filter.name
      });
      newDashboardFilter = this.dbaccInstance.Dashboard.createFilter({
        projectName: filter.name
      });
    }
    await Promise.resolve(this.dbaccInstance.Visualization.deleteMany(newVisualizationFilter));
    await Promise.resolve(this.dbaccInstance.Dashboard.deleteMany(newDashboardFilter));
    await Promise.resolve(this.dbaccInstance.Project.delete(newProjectFilter));

    return true;
  }
}

export default ProjectBZL;
