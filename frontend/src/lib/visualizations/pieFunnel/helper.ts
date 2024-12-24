import { VisualizationTypes } from '@illustry/types';

const computeValues = (
  data: VisualizationTypes.PieChartData | VisualizationTypes.FunnelData,
  colors: string[]
) => {
  const { values } = data;
  const keys = Object.keys(values);
  return keys.map((key, index) => ({
    value: values[key],
    name: key,
    itemStyle: { color: colors.length >= index ? colors[index] : undefined }
  }));
};

const computeLegendColors = (
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

export {
  computeValues,
  computeLegendColors
};
