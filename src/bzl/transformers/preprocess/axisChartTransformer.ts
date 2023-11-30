import _ from "lodash";
import { visualizationDetailsExtractor } from "../../../utils/helper";
import { AxisChartData } from "types/visualizations";

const computeValues = (
  values: Record<string, unknown>,
  mapping: string
): { [row: string]: unknown }[] => {
  return mapping.split(",").map((row) => {
    return { [row]: values[_.toNumber(row)] ? values[_.toNumber(row)] : null };
  });
};
export const axisChartTransformer = (
  mapping: Record<string, unknown>,
  values: Record<string, unknown>,
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
  const result: Record<string, unknown> = {};
  const headers: string[] = [];

  data.forEach((item) => {
    const itemData = (item.values as Record<string, unknown>).data as Record<
      string,
      unknown
    >[];
    const itemLength = itemData.length;
    for (let i = 0; i < itemLength; i++) {
      const keys = Object.keys(itemData[i]);

      keys.forEach((key: string) => {
        if (!result[key]) {
          result[key] = [];
        }

        itemData.forEach((entry) => {
          const value = entry[key] as number;
          if (value !== undefined) {
            (result[key] as number[]).push(value !== null ? value : 0);
          }
        });
      });
    }
    const itemHeaders = (item.values as Record<string, unknown>).headers;
    if (itemHeaders) {
      headers.push(itemHeaders as string);
    }
  });
  Object.keys(result).forEach((key) => {
    const stringElement = (result[key] as (string | number)[]).find((el) => {
      return typeof el === "string";
    });
    if (key === null) {
      result[key] = 0;
    }
    if (stringElement) {
      (result[stringElement] as Record<string, number>[]) = (
        result[key] as Record<string, number>[]
      ).filter((el) => Number.isFinite(el));
      delete result[key];
    } else {
      delete result[key];
    }
  });
  return { values: { ...result }, headers } as AxisChartData;
};
