import { VisualizationTypes } from '@illustry/types';
import { visualizationDetailsExtractor, toStringWithDefault } from '../../../../utils/helper';

const pieChartFunnelTransformer = (
  mapping: Record<string, unknown>,
  values: string[] | number[],
  allFileDetails: boolean
) => {
  const baseValues = {
    name:
      typeof values[Number(mapping.names)] === 'string'
        ? values[Number(mapping.names)]
        : toStringWithDefault(values[Number(mapping.names)]),
    value:
      typeof values[Number(mapping.values)] === 'string'
        ? +(values[Number(mapping.values)] as string)
        : values[Number(mapping.values)]
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? {
      ...{ values: baseValues },
      ...visualizationDetails
    }
    : { values: baseValues };
};

const pieChartFunnelExtractorCsvOrExcel = (
  data: Record<string, Record<string, number>>[]
): VisualizationTypes.PieChartData => {
  const transformedData = data.reduce(
    (result, item) => {
      let pieChartFunnelData;
      const { name, value } = item.values as Record<string, unknown>;
      pieChartFunnelData = (result.values as Record<string, number>)[name as string] === value
        || null;
      if (!pieChartFunnelData) {
        pieChartFunnelData = { name, value };
        if (pieChartFunnelData.name && pieChartFunnelData.value) {
          result.values[`${pieChartFunnelData.name as string}`] = pieChartFunnelData.value as number
        }
      }
      return result;
    },

    { values: {} }
  );
  return transformedData as unknown as VisualizationTypes.PieChartData;
};

const pieChartFunnelValuesExtractorXml = (
  values: Record<string, unknown>[]
) => {
  const transformedData = values.map((el) => {
    const transformedValues: Record<string, number> = {};

    Object.keys(el).forEach((key) => {
      transformedValues[key] = +(el[key] as string[])[0];
    });

    return {
      ...transformedValues
    };
  });

  return transformedData[0];
};

const pieChartFunnelExtractorXml = (
  xmlData: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const {
    name, description, tags, type, data, values
  } = xmlData.root as Record<string, unknown>;
  const finalData = {
    data: {
      values: allFileDetails
        ? pieChartFunnelValuesExtractorXml(
          (data as Record<string, unknown>[])[0].values as Record<
            string,
            unknown
          >[]
        )
        : pieChartFunnelValuesExtractorXml(values as Record<string, unknown>[])
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

export { pieChartFunnelTransformer, pieChartFunnelExtractorCsvOrExcel, pieChartFunnelExtractorXml }