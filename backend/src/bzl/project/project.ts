import _ from 'lodash';
import {
  ExtendedProjectType,
  ProjectCreate,
  ProjectFilter,
  ProjectType,
  ProjectUpdate
} from 'types/project';
import { ExtendedMongoQuery } from 'types/utils';
import DbaccInstance from '../../dbacc/lib';
import NoDataFoundError from '../../errors/noDataFoundError';
import logger from '../../config/logger';
import DuplicatedElementError from '../../errors/duplicatedElementError';

export default class ProjectBZL {
  private dbaccInstance: DbaccInstance;

  constructor(dbaccInstance: DbaccInstance) {
    this.dbaccInstance = dbaccInstance;
  }

  create(project: ProjectCreate): Promise<ProjectType> {
    const newProject = _.cloneDeep(project);
    if (_.isNil(project.createdAt)) {
      newProject.createdAt = new Date();
      newProject.updatedAt = new Date();
    }
    return this.dbaccInstance.Project.create(newProject).catch(() => {
      throw new DuplicatedElementError(
        `There already is a project named ${project.name}`
      );
    });
  }

  findByName(filter: ProjectFilter): Promise<ProjectType> {
    let newFilter: ExtendedMongoQuery = {};
    if (!_.isNil(filter)) {
      newFilter = this.dbaccInstance.Project.createFilter(filter);
    }
    return this.dbaccInstance.Project.findByName(newFilter).then((res) => {
      if (_.isNil(res)) {
        logger.error(`No data was found with name ${filter.name}`);
        throw new NoDataFoundError(
          `No data was found with name ${filter.name}`
        );
      } else {
        return res;
      }
    });
  }

  browse(filter: ProjectFilter): Promise<ExtendedProjectType> {
    let newFilter: ExtendedMongoQuery = {};
    if (!_.isNil(filter)) {
      newFilter = this.dbaccInstance.Project.createFilter(filter);
    }

    return this.dbaccInstance.Project.browse(newFilter);
  }

  update(filter: ProjectFilter, project: ProjectUpdate): Promise<ProjectType> {
    let newFilter: ExtendedMongoQuery = {};
    if (!_.isNil(filter)) {
      newFilter = this.dbaccInstance.Project.createFilter(filter);
    }
    return this.findByName(filter).then(() => {
      const newProject = _.cloneDeep(project);
      if (_.isNil(project.createdAt)) {
        newProject.createdAt = new Date();
      }
      _.set(project, 'updatedAt', new Date());
      return this.dbaccInstance.Project.update(newFilter, newProject);
    });
  }

  delete(filter: ProjectFilter): Promise<boolean> {
    let newProjectFilter: ExtendedMongoQuery = {};
    let newVisualizationFilter: ExtendedMongoQuery = {};
    if (!_.isNil(filter)) {
      newProjectFilter = this.dbaccInstance.Project.createFilter(filter);
      newVisualizationFilter = this.dbaccInstance.Visualization.createFilter({
        projectName: filter.name
      });
    }
    return Promise.resolve(this.dbaccInstance.Project.delete(newProjectFilter))
      .then(() => Promise.resolve(
        this.dbaccInstance.Visualization.deleteMany(newVisualizationFilter)
      ))
      .then(() => true);
  }
}