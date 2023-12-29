import { WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';
import { NodeLinkData } from 'types/visualizations';

interface HierarchicalEdgeBundlingShellProp extends WithLegend, WithOptions {
    data: NodeLinkData;
  }
const HierarchicalEdgeBundlingGraphView = dynamic(
  () => import('@/components/views/hierarchical-edge-bundling'),
  { ssr: false }
);
const HierarchicalEdgeBundlingShellView = ({
  data,
  legend,
  options
}:HierarchicalEdgeBundlingShellProp) => (
      <HierarchicalEdgeBundlingGraphView
        options={options}
        data={data}
        legend={legend}
      />
);
export default HierarchicalEdgeBundlingShellView;
