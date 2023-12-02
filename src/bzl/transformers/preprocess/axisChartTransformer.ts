import _ from "lodash";
import { visualizationDetailsExtractor } from "../../../utils/helper";
import { AxisChartData } from "types/visualizations";

const computeValues = (
  values: unknown[],
  mapping: string
): { [element: string]: number[] } | undefined => {
  const indices = mapping
    .split(",")
    .map((index) => parseInt(index.trim(), 10))
    .filter((index) => !isNaN(index) && index >= 0 && index < values.length);

  const keyIndex = indices.find(
    (index) =>
      typeof values[index] === "string" && isNaN(+(values[index] as string))
  );

  if (keyIndex !== undefined) {
    const key = values[keyIndex] as string;
    const numericValues = indices
      .filter((index) => index !== keyIndex)
      .map((index) => +(values[index] as string));

    return { [key]: numericValues };
  }

  return undefined; // or handle the case where no valid key is found
};
export const axisChartTransformer = (
  mapping: Record<string, unknown>,
  values: unknown[],
  allFileDetails: boolean
) => {
  const baseValues = {
    data: computeValues(values, mapping.data as string),
    headers: values[_.toNumber(mapping.headers)],
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? {
        ...{ values: baseValues },
        ...visualizationDetails,
      }
    : { values: baseValues };
};

export const axisChartExtractor = (
  data: Record<string, unknown>[]
): AxisChartData => {
  const transformedData = data.reduce(
    (result, item) => {
      const axisData = item.values;
      let headersData;
      const { data, headers } = axisData as Record<string, unknown>;
      headersData = (result.headers as string[]).find(
        (h: string) => h === headers
      );
      if (_.isNil(headersData)) {
        headersData = headers as string;
        if (!_.isNil(headersData) && !_.isEmpty(headersData)) {
          (result.headers as string[]).push(headersData);
        }
      }
      if (!_.isNil(data)) {
        result.values = {
          ...(result.values as Record<string, unknown>),
          ...data as Record<string, unknown>,
        };
      }
      return result;
    },
    { headers: [], values: {} }
  );
  return transformedData as unknown as AxisChartData;
};
