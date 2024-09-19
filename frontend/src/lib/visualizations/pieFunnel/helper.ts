import { FunnelData, PieChartData } from 'types/visualizations';

export const computeValues = (
  data: PieChartData | FunnelData,
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
  data: PieChartData | FunnelData,
  colors: string[]
) => {
  const keys = Object.keys(data.values);
  const legendColorObject: { [key: string]: string } = {};

  keys.forEach((key, index) => {
    legendColorObject[key] = colors.length > index ? colors[index] as string : '';
  });

  return legendColorObject;
};
