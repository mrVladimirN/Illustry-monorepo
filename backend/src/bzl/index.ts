import DbaccInstance from '../dbacc/lib';
import VisualizationBZL from './visualization/visualization';
import ProjectBZL from './project/project';

class BZLInstance {
  private dbaccInstance: DbaccInstance;

  private projectBZL!: ProjectBZL;

  private visualizationBZL!: VisualizationBZL;

  constructor(dbaaccInstance: DbaccInstance) {
    this.dbaccInstance = dbaaccInstance;
  }

  get ProjectBZL() {
    return this.projectBZL
      ? this.projectBZL
      : new ProjectBZL(this.dbaccInstance);
  }

  get VisualizationBZL() {
    return this.visualizationBZL
      ? this.visualizationBZL
      : new VisualizationBZL(this.dbaccInstance);
  }
}

export default BZLInstance;