import { Connection, Model } from 'mongoose';
import { ProjectType } from 'types/project';
import { VisualizationType } from 'types/visualizations';
import { Project } from './project/Project';
import { Visualization } from './visualization/Visualization';

export class ModelInstance {
  private _projectModel?: Model<ProjectType>;

  private _visualizationModel?: Model<VisualizationType>;

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
    if (!this._projectModel) {
      this._projectModel = this.project.getModel();
    }
    return this._projectModel;
  }

  get VisualizationModel(): Model<VisualizationType> {
    if (!this._visualizationModel) {
      this._visualizationModel = this.visualization.getModel();
    }
    return this._visualizationModel;
  }
}
