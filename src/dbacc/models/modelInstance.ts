import { Connection, Model } from 'mongoose';
import { ProjectType } from 'types/project';
import { VisualizationType } from 'types/visualizations';
import Project from './project/Project';
import Visualization from './visualization/Visualization';

export default class ModelInstance {
  private projectModel?: Model<ProjectType>;

  private visualizationModel?: Model<VisualizationType>;

  private readonly connection: Connection;

  private readonly visualization: Visualization;

  private readonly project: Project;

  constructor(connection: Connection) {
    this.connection = connection;
    this.connection.setMaxListeners(100);
    this.visualization = new Visualization(this.connection);
    this.project = new Project(this.connection);
  }

  get ProjectModel(): Model<ProjectType> {
    if (!this.projectModel) {
      this.projectModel = this.project.getModel();
    }
    return this.projectModel;
  }

  get VisualizationModel(): Model<VisualizationType> {
    if (!this.visualizationModel) {
      this.visualizationModel = this.visualization.getModel();
    }
    return this.visualizationModel;
  }
}
