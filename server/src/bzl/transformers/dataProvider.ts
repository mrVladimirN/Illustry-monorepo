import { VisualizationTypesEnum } from "types/visualizations";
import _ from "lodash";
import { extractVisualizationProperties } from "../../utils/helper";
import { VisualizationUpdate } from "index";

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
        _.set(data, "data.words", visualizationProperties.data);
        _.set(data, "name", visualizationProperties.name);
        _.set(data, "description", visualizationProperties.description);
        _.set(data, "tags", visualizationProperties.tags);
        _.set(data, "type", type);
        return data;
      } else {
        _.set(data, "data.words", computedRows);
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
        _.set(data, "data.words", computedData);
        _.set(data, "type", type);
        return data;
      } else {
        return computedData;
      }
    default:
      return computedData;
  }
};
