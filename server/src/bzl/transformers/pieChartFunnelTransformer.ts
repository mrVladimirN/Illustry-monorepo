import _ from "lodash";
import { visualizationDetailsExtractor } from "../../utils/helper";

export const pieChartFunnelTransformer = (
  mapping: Record<string, unknown>,
  values: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const baseValues = {
    name: values[_.toNumber(mapping.names)],
    value: values[_.toNumber(mapping.values)],
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? {
        ...{ values: baseValues },
        ...visualizationDetails,
      }
    : { values: baseValues };
};

export const pieChartFunnelExtractor = (data: Record<string, unknown>[]) => {
  const transformedData = data.reduce(
    (result, item) => {
      let pieChartFunnelData;
      const { name, value } = item.values as Record<string, unknown>;
      pieChartFunnelData =  (result.values as Record<string, number>)[name as string] === value || null
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
  return transformedData;
};
