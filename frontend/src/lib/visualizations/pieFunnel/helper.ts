import { VisualizationTypes } from '@illustry/types';

export const computeValues = (
  data: VisualizationTypes.PieChartData | VisualizationTypes.FunnelData,
  colors: string[]
) => {
  const keys = Object.keys(data.values);
  return keys.map((key, index) => ({
    value: data.values[key],
    name: key,
    itemStyle: { color: colors.length >= index ? colors[index] : undefined }
  }));
};

export const computeLegendColors = (
  data: VisualizationTypes.PieChartData | VisualizationTypes.FunnelData,
  colors: string[]
) => {
  const keys = Object.keys(data.values);
  const legendColorObject: { [key: string]: string } = {};

  keys.forEach((key, index) => {
    legendColorObject[key] = colors.length > index ? colors[index] as string : '';
  });

  return legendColorObject;
};
