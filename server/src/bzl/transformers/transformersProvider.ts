import { VisualizationTypesEnum } from "types/visualizations";
import { wordCloudTransformer } from "./wordCloudTransformer";
import _ from "lodash";

export const transformerProvider = (
  type: VisualizationTypesEnum,
  mapping: any,
  values: any,
  allFileDetails: boolean
) => {
  switch (type) {
    case VisualizationTypesEnum.WORLD_CLOUD:
      return wordCloudTransformer(mapping, values, allFileDetails);
  }
};
