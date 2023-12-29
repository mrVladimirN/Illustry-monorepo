import { WithLegend, WithOptions } from '@/lib/types/utils';
import {
  calculateMeanValue, computeCategories, computeMaxDepth, computeUniqueValues, createLevels
} from '@/lib/visualizations/hierarchy-charts/helper';
import dynamic from 'next/dynamic';
import { HierarchyData } from 'types/visualizations';

interface TreeMapShellProp extends WithLegend, WithOptions {
    data: HierarchyData;
  }
const TreeMapView = dynamic(
  () => import('@/components/views/treemap-chart'),
  { ssr: false }
);
const TreeMapShellView = ({
  data,
  legend,
  options
}:TreeMapShellProp) => {
  const { nodes } = data;
  const categories = computeCategories(nodes);
  const maxDepth = computeMaxDepth(nodes);
  const meanValue = calculateMeanValue(computeUniqueValues(nodes));
  const levels = createLevels(maxDepth);
  return (
      <TreeMapView
        options={options}
        legend={legend}
        nodes = {nodes}
        maxDepth={maxDepth}
        meanValue={meanValue}
        categories={categories}
        levels={levels}
      />
  );
};
export default TreeMapShellView;
