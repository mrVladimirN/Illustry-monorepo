import { VisualizationTypesEnum } from "types/visualizations";
import { wordCloudTransformer } from "./transformers/wordCloudTransformer";
import { axisChartTransformer } from "./transformers/axisChartTransformer";
import { hierarchyTransformer } from "./transformers/hierarchyTransformers";
import { calendarTransformer } from "./transformers/calendarTransformers";
import { nodeLinkTransformer } from "./transformers/nodeLinkTransformers";
import { pieChartFunnelTransformer } from "./transformers/pieChartFunnelTransformer";
import { scatterTransformer } from "./transformers/scatterTransformer";

export const transformerProvider = (
  type: VisualizationTypesEnum,
  mapping: Record<string, unknown>,
  values: unknown[],
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
    case VisualizationTypesEnum.BAR_CHART:
    case VisualizationTypesEnum.LINE_CHART:
      return axisChartTransformer(mapping, values, allFileDetails);
    case VisualizationTypesEnum.PIE_CHART:
    case VisualizationTypesEnum.FUNNEL:
      return pieChartFunnelTransformer(mapping, values, allFileDetails);
    case VisualizationTypesEnum.SCATTER:
      return scatterTransformer(mapping, values, allFileDetails);
    case VisualizationTypesEnum.SUNBURST:
    case VisualizationTypesEnum.TREEMAP:
      return hierarchyTransformer(mapping, values, allFileDetails);
  }
};
