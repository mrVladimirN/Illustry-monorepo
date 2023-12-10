/* eslint-disable no-param-reassign */

import _ from 'lodash';
import { AxisChartData } from 'types/visualizations';
import { visualizationDetailsExtractor } from '../../../../utils/helper';

const computeValues = (
  values: unknown[],
  mapping: string
): { [element: string]: number[] } | undefined => {
  const indices = mapping
    .split(',')
    .map((index) => parseInt(index.trim(), 10))
    .filter((index) => !Number.isNaN(index) && index >= 0 && index < values.length);

  const keyIndex = indices.find(
    (index) => typeof values[index] === 'string' && Number.isNaN(+(values[index] as string))
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
    headers:
      typeof values[_.toNumber(mapping.headers)] === 'string'
        ? values[_.toNumber(mapping.headers)]
        : _.toString(values[_.toNumber(mapping.headers)])
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? {
      ...{ values: baseValues },
      ...visualizationDetails
    }
    : { values: baseValues };
};

export const axisChartExtractorCsvOrExcel = (
  recordedData : Record<string, unknown>[]
): AxisChartData => {
  const transformedData = recordedData.reduce(
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
          ...(data as Record<string, unknown>)
        };
      }
      return result;
    },
    { headers: [], values: {} }
  );
  return transformedData as unknown as AxisChartData;
};
const axisChartValuesExtractorXml = (values: Record<string, unknown>[]) => {
  const transformedData = values.map((item) => {
    const transformedValues: Record<string, number[]> = {};

    // Transform each array of strings to an array of numbers
    Object.keys(item).forEach((key) => {
      transformedValues[key] = (item[key] as string[]).map((value: string) => Number(value));
    });

    return {
      ...transformedValues
    };
  });

  // Return the transformed object inside the array
  return transformedData[0];
};

export const axisChartExtractorXml = (
  xmlData: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const {
    name, description, tags, type, data, headers, values
  } = xmlData.root as Record<string, unknown>;
  const finalData = {
    data: {
      headers: allFileDetails
        ? (data as Record<string, unknown>[])[0].headers
        : (headers as Record<string, string>[]),
      values: allFileDetails
        ? axisChartValuesExtractorXml(
          ((data as Record<string, unknown>[])[0].values) as Record<string, unknown>[]
        )
        : axisChartValuesExtractorXml(values as Record<string, unknown>[])
    }
  };
  return allFileDetails
    ? {
      ...finalData,
      ...{
        name: (name as string[])[0] as string,
        description: (description as string[])[0] as string,
        tags: tags as string[],
        type: type as string
      }
    }
    : finalData;
};
