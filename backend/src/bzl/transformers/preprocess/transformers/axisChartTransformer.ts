import { TransformerTypes, VisualizationTypes } from '@illustry/types';
import { visualizationDetailsExtractor } from '../../../../utils/helper';

const computeValues = (
  values: (string | number)[],
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
  mapping: { [key: string]: string },
  values: (string | number)[],
  allFileDetails: boolean
): TransformerTypes.FullAxisChartValuesDetails | TransformerTypes.SimpleAxisChartValuesDetails => {
  const { headers, data } = mapping;
  const computedValues: TransformerTypes.AxisChartValuesType = {
    data: computeValues(values, data as string),
    headers:
      typeof values[+headers] === 'string'
        ? values[+headers] as string
        : values[+headers]?.toString()
  };
  if (allFileDetails) {
    const { visualizationDescription, visualizationName, visualizationTags } = visualizationDetailsExtractor(mapping, values);
    const fullComputedValues: TransformerTypes.FullAxisChartValuesDetails = {
      values: computedValues,
      visualizationDescription,
      visualizationName,
      visualizationTags
    };
    return fullComputedValues;
  }
  return { values: computedValues };
};

const axisChartExtractorCsvOrExcel = (
  data: TransformerTypes.FullAxisChartValuesDetails[] | TransformerTypes.SimpleAxisChartValuesDetails[]
): VisualizationTypes.AxisChartData => {
  const result: VisualizationTypes.AxisChartData = {
    headers: [],
    values: {}
  };

  data.forEach((item) => {
    const { values: axisData } = item;
    const { data: dData, headers } = axisData;

    if (headers && !result.headers.includes(headers)) {
      result.headers.push(headers);
    }

    if (dData) {
      result.values = { ...result.values, ...dData };
    }
  });

  return result;
};

const axisChartValuesExtractorXml = (values: { [key: string]: string[] }[]): { [key: string]: number[] } => {
  const transformedData = values.map((item) => {
    const transformedValues: { [key: string]: number[] } = {};
    Object.keys(item).forEach((key) => {
      const valueArray = item[key];
      transformedValues[key] = valueArray.map((value) => +value);
    });
    return transformedValues;
  });
  return transformedData[0];
};

const axisChartExtractorXml = (
  xmlData: TransformerTypes.XMLVisualizationDetails,
  allFileDetails: boolean
): VisualizationTypes.VisualizationCreate | { data: VisualizationTypes.AxisChartData } => {
  const {
    name, description, tags, type, data: rootData
  } = xmlData.root;
  const { headers, values } = rootData[0] as TransformerTypes.XMLAxisData;
  const data: { data: VisualizationTypes.AxisChartData } = {
    data: {
      headers,
      values: axisChartValuesExtractorXml(values)
    }
  };
  if (allFileDetails) {
    return {
      ...data,
      ...{
        name: name[0],
        description: description ? description[0] : '',
        tags,
        type: type[0]
      }
    };
  }
  return data;
};

export {
  axisChartTransformer, axisChartExtractorXml, axisChartExtractorCsvOrExcel, computeValues
};
