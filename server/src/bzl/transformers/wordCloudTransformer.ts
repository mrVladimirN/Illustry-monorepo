import _ from "lodash";

// TODO: mapping will have a type
export const wordCloudTransformer = (
  mapping: any,
  values: any,
  allFileDetails: boolean
) => {
  const baseValues = {
    name:
      values[_.toNumber(mapping.names)] &&
      typeof values[_.toNumber(mapping.names)] === "string"
        ? values[_.toNumber(mapping.names)]
        : "",
    value:
      values[_.toNumber(mapping.values)] &&
      typeof values[_.toNumber(mapping.values)] === "number"
        ? values[_.toNumber(mapping.values)]
        : 0,
    properties: values[_.toNumber(mapping.properties)],
  };
  const visualizationDetails = {
    visualizationName:
      values[_.toNumber(mapping.visualizationName)] &&
      typeof values[_.toNumber(mapping.visualizationName)] === "string" &&
      !_.isEmpty(values[_.toNumber(mapping.visualizationName)])
        ? values[_.toNumber(mapping.visualizationName)]
        : undefined,
    visualizationDescription:
      values[_.toNumber(mapping.visualizationDescription)] &&
      typeof values[_.toNumber(mapping.visualizationDescription)] === "string"
        ? values[_.toNumber(mapping.visualizationDescription)]
        : undefined,
    visualizationTags:
      values[_.toNumber(mapping.visualizationTags)] &&
      typeof values[_.toNumber(mapping.visualizationTags)] === "string"
        ? values[_.toNumber(mapping.visualizationTags)]
        : undefined,
  };
  return allFileDetails
    ? { ...baseValues, ...visualizationDetails }
    : baseValues;
};
