import { VisualizationTypesEnum } from "types/visualizations";
import { wordCloudTransformer } from "./wordCloudTransformer";
import { nodeLinkTransformer } from "./nodeLinkTransformers";
import _ from "lodash";
import { calendarTransformer } from "./calendarTransformers";

export const transformerProvider = (
  type: VisualizationTypesEnum,
  mapping: Record<string, unknown>,
  values: Record<string, unknown>,
  allFileDetails: boolean
) => {
  switch (type) {
    case VisualizationTypesEnum.WORLD_CLOUD:
      return wordCloudTransformer(mapping, values, allFileDetails);
    case VisualizationTypesEnum.FORCE_DIRECTED_GRAPH:
    case VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING:
    case VisualizationTypesEnum.SANKEY:
      return nodeLinkTransformer(mapping, values, allFileDetails);
    case VisualizationTypesEnum.CALENDAR:
      return calendarTransformer(mapping, values, allFileDetails);
  }
};
