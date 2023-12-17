import { AxisChartData } from 'types/visualizations';

export const constructSeries = (
  values: { [key: string]: number[] },
  colors: string[],
  stacked: boolean,
  type: string,
  area?: boolean
) => {
  const seriesArray: {
    name: string;
    type: string;
    stack: string | undefined;
    color: string | undefined;
    areaStyle?: object;
    emphasis: { focus: string };
    data: number[] | undefined;
  }[] = [];

  const keys = Object.keys(values);
  keys.forEach((key, index) => {
    const seriesMember = {
      name: key,
      type,
      stack: stacked ? 'Total' : undefined,
      color: colors.length >= index ? colors[index] : undefined,
      areaStyle: area
        ? {
          color: colors.length >= index ? colors[index] : undefined
        }
        : undefined,
      emphasis: {
        focus: 'series'
      },
      data: values[key]
    };
    seriesArray.push(seriesMember);
  });
  return seriesArray;
};

export const computeLegendColors = (
  data: AxisChartData,
  colors: string[]
) => {
  const keys = Object.keys(data.values);
  const legendColorObject: { [key: string]: string } = {};

  keys.forEach((key, index) => {
    legendColorObject[key] = colors.length > index ? (colors[index] as string) : '';
  });

  return legendColorObject;
};
