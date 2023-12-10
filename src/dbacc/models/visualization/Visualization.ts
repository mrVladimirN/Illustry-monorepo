import { Connection, Model, Schema } from 'mongoose';
import _ from 'lodash';
// eslint-disable-next-line import/no-unresolved
import { VisualizationType, VisualizationTypesEnum } from 'types/visualizations';

export default class Visualization {
  private readonly connection: Connection;

  private VisualizationModel?: Model<VisualizationType>;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  getModel(): Model<VisualizationType> {
    if (!this.VisualizationModel) {
      const VisualizationSchema = new Schema<VisualizationType>({
        projectName: { type: String, required: true },
        name: { type: String, required: true },
        description: {
          type: String,
          required: false,
          maxLength: 250,
          default: ''
        },
        type: {
          type: String,
          required: true,
          enum: _.values([
            VisualizationTypesEnum.CALENDAR,
            VisualizationTypesEnum.FORCE_DIRECTED_GRAPH,
            VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING,
            VisualizationTypesEnum.SANKEY,
            VisualizationTypesEnum.WORD_CLOUD
          ])
        },
        tags: [{ type: String, required: false }],
        data: { type: Schema.Types.Mixed, required: true },
        createdAt: { type: Date, required: false },
        updatedAt: { type: Date, required: false }
      });

      // Create indexes
      VisualizationSchema.index(
        { projectName: 1, type: 1, name: 1 },
        { unique: true, background: true }
      );
      VisualizationSchema.index({ projectName: 1, name: 1 });
      // VisualizationSchema.index({ name: "text", description: "text" });
      this.VisualizationModel = this.connection.model<VisualizationType>(
        'Visualization',
        VisualizationSchema
      );
    }

    return this.VisualizationModel;
  }
}
