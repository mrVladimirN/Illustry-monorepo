import { ScatterData } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';
import { computeCategoriesScatter, computePoints } from '@/lib/visualizations/scatter/helper';

interface ScatterShellProp extends WithLegend, WithOptions {
    data: ScatterData;
  }
const ScatterGraphView = dynamic(
  () => import('@/components/views/scatter'),
  { ssr: false }
);
const ScatterShellView = ({
  data,
  legend,
  options
}:ScatterShellProp) => {
  const { points } = data;
  const computedPoints = computePoints(points);
  const categories = computeCategoriesScatter(points);
  return (
      <ScatterGraphView
        options={options}
        points={computedPoints}
        categories={categories}
        legend={legend}
      />
  );
};
export default ScatterShellView;
