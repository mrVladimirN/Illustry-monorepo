import {
  VisualizationTypesEnum,
  VisualizationUpdate,
} from "types/visualizations";
import _ from "lodash";
import { visualizationPropertiesExtractor } from "../../../utils/helper";
import { nodesLinksExtractor } from "./nodeLinkTransformers";
import { wordsExtractor } from "./wordCloudTransformer";
import { calendarExtractor } from "./calendarTransformers";
import { axisChartExtractor } from "./axisChartTransformer";
import { pieChartFunnelExtractor } from "./pieChartFunnelTransformer";
import { scatterExtractor } from "./scatterTransformer";
import { hierarchyExtractor } from "./hierarchyTransformers";

export const exelDataProvider = (
  type: VisualizationTypesEnum,
  computedRows: Record<string, unknown>[],
  allFileDetails: boolean
) => {
  const data: VisualizationUpdate = {};
  switch (type) {
    case VisualizationTypesEnum.WORLD_CLOUD:
      if (allFileDetails) {
        const visualizationProperties =
          visualizationPropertiesExtractor(computedRows);
        _.set(data, "data", wordsExtractor(visualizationProperties.data));
        _.set(data, "name", visualizationProperties.name);
        _.set(data, "description", visualizationProperties.description);
        _.set(data, "tags", visualizationProperties.tags);
        _.set(data, "type", type);
        return data;
      } else {
        _.set(data, "data", wordsExtractor(computedRows));
        _.set(data, "type", type);
        return data;
      }
    case VisualizationTypesEnum.FORCE_DIRECTED_GRAPH:
    case VisualizationTypesEnum.SANKEY:
    case VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING:
      if (allFileDetails) {
        const visualizationProperties =
          visualizationPropertiesExtractor(computedRows);
        _.set(data, "data", nodesLinksExtractor(visualizationProperties.data));
        _.set(data, "name", visualizationProperties.name);
        _.set(data, "description", visualizationProperties.description);
        _.set(data, "tags", visualizationProperties.tags);
        _.set(data, "type", type);
        return data;
      } else {
        _.set(data, "data", nodesLinksExtractor(computedRows));
        _.set(data, "type", type);
        return data;
      }
    case VisualizationTypesEnum.CALENDAR:
      if (allFileDetails) {
        const visualizationProperties =
          visualizationPropertiesExtractor(computedRows);
        _.set(data, "data", calendarExtractor(visualizationProperties.data));
        _.set(data, "name", visualizationProperties.name);
        _.set(data, "description", visualizationProperties.description);
        _.set(data, "tags", visualizationProperties.tags);
        _.set(data, "type", type);
        return data;
      } else {
        _.set(data, "data", calendarExtractor(computedRows));
        _.set(data, "type", type);
        return data;
      }
    case VisualizationTypesEnum.BAR_CHART:
    case VisualizationTypesEnum.LINE_CHART:
      if (allFileDetails) {
        const visualizationProperties =
          visualizationPropertiesExtractor(computedRows);
        _.set(data, "data", axisChartExtractor(visualizationProperties.data));
        _.set(data, "name", visualizationProperties.name);
        _.set(data, "description", visualizationProperties.description);
        _.set(data, "tags", visualizationProperties.tags);
        _.set(data, "type", type);
        return data;
      } else {
        _.set(data, "data", axisChartExtractor(computedRows));
        _.set(data, "type", type);
        return data;
      }
    case VisualizationTypesEnum.FUNNEL:
    case VisualizationTypesEnum.PIE_CHART:
      if (allFileDetails) {
        const visualizationProperties =
          visualizationPropertiesExtractor(computedRows);
        _.set(
          data,
          "data",
          pieChartFunnelExtractor(visualizationProperties.data)
        );
        _.set(data, "name", visualizationProperties.name);
        _.set(data, "description", visualizationProperties.description);
        _.set(data, "tags", visualizationProperties.tags);
        _.set(data, "type", type);
        return data;
      } else {
        _.set(data, "data", pieChartFunnelExtractor(computedRows));
        _.set(data, "type", type);
        return data;
      }
    case VisualizationTypesEnum.SCATTER:
      if (allFileDetails) {
        const visualizationProperties =
          visualizationPropertiesExtractor(computedRows);
        _.set(data, "data", scatterExtractor(visualizationProperties.data));
        _.set(data, "name", visualizationProperties.name);
        _.set(data, "description", visualizationProperties.description);
        _.set(data, "tags", visualizationProperties.tags);
        _.set(data, "type", type);
        return data;
      } else {
        _.set(data, "data", scatterExtractor(computedRows));
        _.set(data, "type", type);
        return data;
      }
    case VisualizationTypesEnum.TREEMAP:
    case VisualizationTypesEnum.SUNBURST:
      if (allFileDetails) {
        const visualizationProperties =
          visualizationPropertiesExtractor(computedRows);
        _.set(data, "data", hierarchyExtractor(visualizationProperties.data));
        _.set(data, "name", visualizationProperties.name);
        _.set(data, "description", visualizationProperties.description);
        _.set(data, "tags", visualizationProperties.tags);
        _.set(data, "type", type);
        return data;
      } else {
        _.set(data, "data", hierarchyExtractor(computedRows));
        _.set(data, "type", type);
        return data;
      }
  }
};

export const jsonDataProvider = (
  type: VisualizationTypesEnum,
  computedData: Record<string, unknown>,
  allFileDetails: boolean
) => {
  let data: VisualizationUpdate = {};
  if (allFileDetails) {
    _.set(data, "data", computedData);
    _.set(data, "type", type);
    return data;
  } else {
    return computedData;
  }
};
