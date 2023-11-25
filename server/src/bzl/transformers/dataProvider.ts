import {
  VisualizationTypesEnum,
  VisualizationUpdate,
} from "types/visualizations";
import _ from "lodash";
import { extractVisualizationProperties } from "../../utils/helper";
import { nodesLinksExtractor } from "./nodeLinkTransformers";

export const exelDataProvider = (
  type: VisualizationTypesEnum,
  computedRows: any,
  allFileDetails: boolean
) => {
  const data: VisualizationUpdate = {};
  switch (type) {
    case VisualizationTypesEnum.WORLD_CLOUD:
      if (allFileDetails) {
        const visualizationProperties =
          extractVisualizationProperties(computedRows);
        _.set(data, "data", visualizationProperties.data);
        _.set(data, "name", visualizationProperties.name);
        _.set(data, "description", visualizationProperties.description);
        _.set(data, "tags", visualizationProperties.tags);
        _.set(data, "type", type);
        return data;
      } else {
        _.set(data, "data", computedRows);
        _.set(data, "type", type);
        return data;
      }
    case VisualizationTypesEnum.FORCE_DIRECTED_GRAPH:
    case VisualizationTypesEnum.SANKEY:
    case VisualizationTypesEnum.MATRIX:
    case VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING:
      if (allFileDetails) {
        const visualizationProperties =
          extractVisualizationProperties(computedRows);
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
  }
};

export const jsonDataProvider = (
  type: VisualizationTypesEnum,
  computedData: any,
  allFileDetails: boolean
) => {
  let data: VisualizationUpdate = {};
  switch (type) {
    case VisualizationTypesEnum.WORLD_CLOUD:
      if (allFileDetails) {
        _.set(data, "data", computedData);
        _.set(data, "type", type);
        return data;
      } else {
        return computedData;
      }
    case VisualizationTypesEnum.FORCE_DIRECTED_GRAPH:
    case VisualizationTypesEnum.SANKEY:
    case VisualizationTypesEnum.MATRIX:
    case VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING:
      if (allFileDetails) {
        _.set(data, "data", nodesLinksExtractor(computedData));
        _.set(data, "type", type);
        return data;
      } else {
        return computedData;
      }
    default:
      return computedData;
  }
};
