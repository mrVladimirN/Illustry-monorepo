import { VisualizationTypes } from '@illustry/types';
import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';
import {
  computeCategoriesScatter,
  computePoints
} from '@/lib/visualizations/scatter/helper';
import FilteredScatterGraphShellView from './filter-scatter-shell';

interface ScatterShellProp extends WithLegend, WithOptions, WithFilter {
  data: VisualizationTypes.ScatterData;
}
const ScatterGraphView = dynamic(() => import('@/components/views/scatter'), {
  ssr: false
});
const ScatterShellView = ({
  data,
  legend,
  options,
  filter
}: ScatterShellProp) => {
  const { points } = data;
  const computedPoints = computePoints(points);
  const categories = computeCategoriesScatter(points);
  return (
    <>
      {filter ? (
        <FilteredScatterGraphShellView
          options={options}
          points={computedPoints}
          categories={categories}
          legend={legend}
        />
      ) : (
        <>
          <ScatterGraphView
            options={options}
            points={computedPoints}
            categories={categories}
            legend={legend}
          />
        </>
      )}
    </>
  );
};
export default ScatterShellView;
