import _ from "lodash";
import { visualizationDetailsExtractor } from "../../../utils/helper";
import { ScatterData, ScatterPoint } from "types/visualizations";

const computeValues = (
  values: Record<string, unknown>,
  mapping: string
): number[] => {
  const value: number[] = [];
  mapping.split(",").forEach((row) => {
    if (
      !_.isNil(values[_.toNumber(row)]) &&
      typeof values[_.toNumber(row)] === "number" &&
      value.length <= 2
    ) {
      value.push(values[_.toNumber(row)] as number);
    }
  });
  while (value.length < 2) {
    value.push(0);
  }
  return value;
};
export const scatterTransformer = (
  mapping: Record<string, unknown>,
  values: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const baseValues = {
    value: computeValues(values, mapping.values as string),
    category: values[_.toNumber(mapping.categories)],
    properties:  values[_.toNumber(mapping.properties)],
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? {
        ...{ points: baseValues },
        ...visualizationDetails,
      }
    : { points: baseValues };
};

export const scatterExtractor = (data: Record<string, unknown>[]): ScatterData => {
  const transformedData = data.reduce(
    (result, item) => {
      let scatterData;
      const { category, value, properties} = item.points as Record<string, unknown>;
      scatterData = (result.points as ScatterPoint[]).find(
        (e: ScatterPoint) =>
          e.value[0] === (value as unknown[])[0] &&
          e.value[1] === (value as unknown[])[1] &&
          e.category === category
      );
      if (_.isNil(scatterData)) {
        scatterData = { category, value, properties };
        if (!_.isNil(scatterData.category) && !_.isNil(scatterData.value)) {
          (result.points as Record<string, unknown>[]).push(scatterData);
        }
      }
      return result;
    },
    { points: [] }
  );
  return transformedData as unknown as ScatterData;
};
