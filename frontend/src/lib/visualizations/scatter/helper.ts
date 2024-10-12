import { VisualizationTypes } from '@illustry/types';

const computeCategoriesScatter = (points: VisualizationTypes.ScatterPoint[]) => [
  ...new Set(
    points.map((p) => p.category)
  )
];

const computeColors = (categories: string[], colors: string[]) => {
  const color: { [key: string]: string } = {};
  categories.forEach((cat, index) => {
    color[cat] = colors[index] as string;
  });
  return color;
};

const computePoints = (
  points: VisualizationTypes.ScatterPoint[]
) => points.map((point) => [...point.value, point.category]);

export {
  computeCategoriesScatter,
  computeColors,
  computePoints
};
