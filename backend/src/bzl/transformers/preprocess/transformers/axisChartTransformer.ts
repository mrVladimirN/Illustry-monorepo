
import { VisualizationTypes } from '@illustry/types';
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

  return undefined;
};

const axisChartTransformer = (
  mapping: Record<string, string>,
  values: string[] | number[],
  allFileDetails: boolean
) => {
  const baseValues = {
    data: computeValues(values, mapping.data as string),
    headers:
      typeof values[+mapping.headers] === 'string'
        ? values[+mapping.headers]
        : values[+mapping.headers]?.toString()
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);

  return allFileDetails
    ? {
      ...{ values: baseValues },
      ...visualizationDetails
    }
    : { values: baseValues };
};

const axisChartExtractorCsvOrExcel = (
  recordedData: Record<string, unknown>[]
): VisualizationTypes.AxisChartData => {
  const result: VisualizationTypes.AxisChartData = {
    headers: [],
    values: {}
  };

  recordedData.forEach((item) => {
    const { values: axisData } = item;
    const { data, headers } = axisData as { data?: Record<string, number[]>; headers?: string };

    if (headers && !result.headers.includes(headers)) {
      result.headers.push(headers);
    }

    if (data) {
      result.values = { ...result.values, ...data };
    }
  });

  return result;
};

const axisChartValuesExtractorXml = (values: Record<string, unknown>[]): Record<string, number[]> => {
  const transformedData = values.map((item) => {
    const transformedValues: Record<string, number[]> = {};

    // Iterate over each key in the item
    Object.keys(item).forEach((key) => {
      const valueArray = item[key] as string[];
      transformedValues[key] = valueArray.map((value) => Number(value));
    });

    return transformedValues;
  });

  return transformedData[0];
};

const axisChartExtractorXml = (
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

export { axisChartTransformer, axisChartExtractorXml, axisChartExtractorCsvOrExcel }