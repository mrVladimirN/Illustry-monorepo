import { VisualizationTypes } from '@illustry/types';
import { wordCloudTransformer } from './transformers/wordCloudTransformer';
import { axisChartTransformer } from './transformers/axisChartTransformer';
import { hierarchyTransformer } from './transformers/hierarchyTransformers';
import { calendarTransformer } from './transformers/calendarTransformers';
import { nodeLinkTransformer } from './transformers/nodeLinkTransformers';
import { pieChartFunnelTransformer } from './transformers/pieChartFunnelTransformer';
import { scatterTransformer } from './transformers/scatterTransformer';

const transformerProvider = (
  type: VisualizationTypes.VisualizationTypesEnum,
  mapping: { [key: string]: string },
  values: (string | number)[],
  allFileDetails: boolean
) => {
  switch (type) {
    case VisualizationTypes.VisualizationTypesEnum.WORD_CLOUD:
      return wordCloudTransformer(mapping, values, allFileDetails);
    case VisualizationTypes.VisualizationTypesEnum.FORCE_DIRECTED_GRAPH:
    case VisualizationTypes.VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING:
    case VisualizationTypes.VisualizationTypesEnum.SANKEY:
      return nodeLinkTransformer(mapping, values, allFileDetails);
    case VisualizationTypes.VisualizationTypesEnum.CALENDAR:
      return calendarTransformer(mapping, values, allFileDetails);
    case VisualizationTypes.VisualizationTypesEnum.BAR_CHART:
    case VisualizationTypes.VisualizationTypesEnum.LINE_CHART:
      return axisChartTransformer(mapping, values, allFileDetails);
    case VisualizationTypes.VisualizationTypesEnum.PIE_CHART:
    case VisualizationTypes.VisualizationTypesEnum.FUNNEL:
      return pieChartFunnelTransformer(mapping, values, allFileDetails);
    case VisualizationTypes.VisualizationTypesEnum.SCATTER:
      return scatterTransformer(mapping, values, allFileDetails);
    case VisualizationTypes.VisualizationTypesEnum.SUNBURST:
    case VisualizationTypes.VisualizationTypesEnum.TREEMAP:
      return hierarchyTransformer(mapping, values, allFileDetails);
    default: return null;
  }
};

export default transformerProvider;
