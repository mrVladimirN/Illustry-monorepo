import { WithLegend, WithOptions } from '@/lib/types/utils';
import { computeCategories } from '@/lib/visualizations/hierarchy-charts/helper';
import dynamic from 'next/dynamic';
import { HierarchyData } from 'types/visualizations';

interface SunBurstShellProp extends WithLegend, WithOptions {
    data: HierarchyData;
  }
const SunBurstGraphView = dynamic(
  () => import('@/components/views/sunburst-chart'),
  { ssr: false }
);
const SunBurstShellView = ({
  data,
  legend,
  options
}:SunBurstShellProp) => {
  const { nodes } = data;
  const categories = computeCategories(nodes);
  return (
      <SunBurstGraphView
        options={options}
        nodes={nodes}
        legend={legend}
        categories={categories}
      />
  );
};
export default SunBurstShellView;
