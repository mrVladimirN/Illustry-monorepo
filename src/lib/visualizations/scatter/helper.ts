import { ScatterData, ScatterPoint } from 'types/visualizations';

export const computeCategoriesScatter = (points: ScatterPoint[]) => [
  ...new Set(
    points.map((p) => p.category)
  )
];

export const computeColors = (categories: string[], colors: string[]) => {
  const color: { [key: string]: string } = {};
  categories.forEach((cat, index) => {
    color[cat] = colors[index] as string;
  });
  return color;
};

export const computePoints = (points:ScatterPoint[]) => points.map((point) => [...point.value, point.category]);
