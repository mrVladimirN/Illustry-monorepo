import _ from "lodash";
import { visualizationDetailsExtractor } from "../../../../utils/helper";
import { PieChartData } from "types/visualizations";

export const pieChartFunnelTransformer = (
  mapping: Record<string, unknown>,
  values: unknown[],
  allFileDetails: boolean
) => {
  const baseValues = {
    name: values[_.toNumber(mapping.names)],
    value:
      typeof values[_.toNumber(mapping.values)] === "string"
        ? +(values[_.toNumber(mapping.values)] as string)
        : values[_.toNumber(mapping.values)],
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? {
        ...{ values: baseValues },
        ...visualizationDetails,
      }
    : { values: baseValues };
};

export const pieChartFunnelExtractorCsvOrExcel = (
  data: Record<string, unknown>[]
): PieChartData => {
  const transformedData = data.reduce(
    (result, item) => {
      let pieChartFunnelData;
      const { name, value } = item.values as Record<string, unknown>;
      pieChartFunnelData =
        (result.values as Record<string, number>)[name as string] === value ||
        null;
      if (_.isNil(pieChartFunnelData)) {
        pieChartFunnelData = { name, value };
        if (
          !_.isNil(pieChartFunnelData.name) &&
          !_.isNil(pieChartFunnelData.value)
        ) {
          (result.values as Record<string, number>)[
            pieChartFunnelData.name as string
          ] = pieChartFunnelData.value as number;
        }
      }
      return result;
    },

    { values: {} }
  );
  return transformedData as unknown as PieChartData;
};

const pieChartFunnelValuesExtractorXml = (
  values: Record<string, unknown>[]
) => {
  const transformedData = values.map((el) => {
    const transformedValues: Record<string, number> = {};

    // Transform each array of strings to an array of numbers
    Object.keys(el).forEach((key) => {
      transformedValues[key] = +(el[key] as string[])[0]
    });

    return {
      ...transformedValues,
    };
  });

  // Return the transformed object inside the array
  return transformedData[0];
};

export const pieChartFunnelExtractorXml = (
  xmlData: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const { name, description, tags, type, data, values } =
    xmlData.root as Record<string, unknown>;
  const finalData = {
    data: {
      values: allFileDetails
        ? pieChartFunnelValuesExtractorXml((data as any[])[0].values)
        : pieChartFunnelValuesExtractorXml(values as Record<string, unknown>[]),
    },
  };
  return allFileDetails
    ? {
        ...finalData,
        ...{
          name: (name as string[])[0] as string,
          description: (description as string[])[0] as string,
          tags: tags as string[],
          type: type as string,
        },
      }
    : finalData;
};
