import { Connection, Model, Schema } from 'mongoose';
import { ProjectType } from 'types/project';

export class Project {
  private readonly connection: Connection;

  private projectModel?: Model<ProjectType>;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  getModel(): Model<ProjectType> {
    if (!this.projectModel) {
      const ProjectSchema = new Schema<ProjectType>({
        name: { type: String, required: true, unique: true },
        description: {
          type: String, required: false, maxLength: 50, default: ''
        },
        createdAt: { type: Date, required: false },
        updatedAt: { type: Date, required: false },
        isActive: { type: Boolean, required: true, default: false }
      });

      ProjectSchema.index({ name: 'text', description: 'text' });

      this.projectModel = this.connection.model<ProjectType>(
        'Project',
        ProjectSchema
      );
    }

    return this.projectModel;
  }
}
