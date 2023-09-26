import { PieChartData } from "types/visualizations";

export const computeValues = (data: PieChartData, colors: string[]) => {
  const keys = Object.keys(data.values);
  return keys.map((key, index) => {
    return {
      value: data.values[key],
      name: key,
      itemStyle: { color: colors.length >= index ? colors[index] : undefined },
    };
  });
};
