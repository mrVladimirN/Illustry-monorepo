import { FunnelData, PieChartData } from "types/visualizations";

export const computeValues = (data: PieChartData| FunnelData, colors: string[]) => {
  const keys = Object.keys(data.values);
  return keys.map((key, index) => {
    return {
      value: data.values[key],
      name: key,
      itemStyle: { color: colors.length >= index ? colors[index] : undefined },
    };
  });
};
