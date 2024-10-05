import dynamic from 'next/dynamic';
import { VisualizationTypes } from '@illustry/types';
import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';
import { computeCategories } from '@/lib/visualizations/hierarchy-charts/helper';
import FilteredTreemapShellView from './filter-treemap-shell';

interface TreeMapShellProp extends WithLegend, WithOptions, WithFilter {
  data: VisualizationTypes.HierarchyData;
}
const TreeMapView = dynamic(() => import('@/components/views/treemap-chart'), {
  ssr: false
});
const TreeMapShellView = ({
  data,
  legend,
  options,
  filter
}: TreeMapShellProp) => {
  const { nodes } = data;
  const categories = computeCategories(nodes);
  return (
    <>
      {filter ? (
        <FilteredTreemapShellView
          options={options}
          nodes={nodes}
          categories={categories}
          legend={legend}
        />
      ) : (
        <>
          <TreeMapView
            options={options}
            nodes={nodes}
            categories={categories}
            legend={legend}
          />
        </>
      )}
    </>
  );
};
export default TreeMapShellView;
