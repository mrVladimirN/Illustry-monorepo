import _ from "lodash";

export const wordCloudTransformer = (
  mapping: Record<string, unknown>,
  values: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const baseValues = {
    name: values[_.toNumber(mapping.names)],
    value: values[_.toNumber(mapping.values)],
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
    ? {
        ...{ words: baseValues },
        ...visualizationDetails,
      }
    : { words: baseValues };
};
