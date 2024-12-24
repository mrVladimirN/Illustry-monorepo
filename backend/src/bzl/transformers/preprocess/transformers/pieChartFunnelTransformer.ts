import { TransformerTypes, VisualizationTypes } from '@illustry/types';
import { visualizationDetailsExtractor, toStringWithDefault } from '../../../../utils/helper';

const pieChartFunnelTransformer = (
  mapping: { [key: string]: string },
  values: (string | number)[],
  allFileDetails: boolean
): TransformerTypes.FullPieChartValuesDetails | TransformerTypes.SimplePieChartValuesDetails => {
  const { names, values: mValues } = mapping;
  const computedValues: TransformerTypes.PieFunnelChartValuesType = {
    name:
      typeof values[+names] === 'string'
        ? values[+names] as string
        : toStringWithDefault(values[+names]),
    value:
      typeof values[+mValues] === 'string'
        ? +(values[+mValues] as string)
        : values[+mValues] as number
  };
  if (allFileDetails) {
    const { visualizationDescription, visualizationName, visualizationTags } = visualizationDetailsExtractor(mapping, values);
    const fullComputedValues: TransformerTypes.FullPieChartValuesDetails = {
      values: computedValues,
      visualizationDescription,
      visualizationName,
      visualizationTags
    };
    return fullComputedValues;
  }
  return { values: computedValues };
};

const pieChartFunnelExtractorCsvOrExcel = (
  data: TransformerTypes.FullPieChartValuesDetails[] | TransformerTypes.SimplePieChartValuesDetails[]
): VisualizationTypes.PieChartData => {
  const transformedData = data.reduce(
    (result, item) => {
      let pieChartFunnelData = null;
      const { name, value } = item.values;
      pieChartFunnelData = (result.values as Record<string, number>)[name] === value;
      if (!pieChartFunnelData) {
        pieChartFunnelData = { name, value };
        if (pieChartFunnelData.name && pieChartFunnelData.value) {
          // eslint-disable-next-line no-param-reassign
          (result.values as Record<string, number>)[`${pieChartFunnelData.name as string}`] = pieChartFunnelData.value;
        }
      }
      return result;
    },

    { values: {} }
  );
  return transformedData;
};

const pieChartFunnelValuesExtractorXml = (
  values: {
    [key: string]: string[];
}[]
) => {
  const transformedData = values.map((el) => {
    const transformedValues: { [key: string]: number } = {};

    Object.keys(el).forEach((key) => {
      transformedValues[key] = +el[key][0];
    });

    return {
      ...transformedValues
    };
  });

  return transformedData[0];
};

const pieChartFunnelExtractorXml = (
  xmlData: TransformerTypes.XMLVisualizationDetails,
  allFileDetails: boolean
): VisualizationTypes.VisualizationCreate | { data: VisualizationTypes.PieChartData } => {
  const {
    name, description, tags, type, data: rootData
  } = xmlData.root;
  const { values } = rootData[0] as TransformerTypes.XMLPieChartFunnelData;
  const data: { data: VisualizationTypes.FunnelData | VisualizationTypes.PieChartData } = {
    data: {
      values: pieChartFunnelValuesExtractorXml(values)
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

export { pieChartFunnelTransformer, pieChartFunnelExtractorCsvOrExcel, pieChartFunnelExtractorXml };
