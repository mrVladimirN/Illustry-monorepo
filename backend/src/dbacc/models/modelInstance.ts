import { Connection, Model } from 'mongoose';
import { ProjectTypes, VisualizationTypes } from '@illustry/types'
import Project from './project/Project';
import Visualization from './visualization/Visualization';

class ModelInstance {
  private projectModel?: Model<ProjectTypes.ProjectType>;

  private visualizationModel?: Model<VisualizationTypes.VisualizationType>;

  private readonly connection: Connection;

  private readonly visualization: Visualization;

  private readonly project: Project;

  constructor(connection: Connection) {
    this.connection = connection;
    this.connection.setMaxListeners(100);
    this.visualization = new Visualization(this.connection);
    this.project = new Project(this.connection);
  }

  get ProjectModel(): Model<ProjectTypes.ProjectType> {
    if (!this.projectModel) {
      this.projectModel = this.project.getModel();
    }
    return this.projectModel;
  }

  get VisualizationModel(): Model<VisualizationTypes.VisualizationType> {
    if (!this.visualizationModel) {
      this.visualizationModel = this.visualization.getModel();
    }
    return this.visualizationModel;
  }
}

export default ModelInstance;