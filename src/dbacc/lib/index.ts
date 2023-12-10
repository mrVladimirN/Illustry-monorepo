import { Connection } from 'mongoose';
import { ModelInstance } from '../models/modelInstance';
import { Visualization } from './visualization/visualization';
import { Project } from './project/project';

export class DbaccInstance {
  private project!: Project;

  private visualization!: Visualization;

  private modelInstance:ModelInstance;

  constructor(dbConnection: Connection) {
    this.modelInstance = new ModelInstance(dbConnection);
  }

  get Project(): Project {
    return this.project ? this.project : new Project(this.modelInstance);
  }

  get Visualization(): Visualization {
    return this.visualization ? this.visualization : new Visualization(this.modelInstance);
  }
}
