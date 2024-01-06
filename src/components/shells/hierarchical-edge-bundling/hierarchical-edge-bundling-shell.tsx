import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';
import { NodeLinkData } from 'types/visualizations';
import FilteredHierarchicalEdgeBundlingGraphView from './filter-hierarchical-edge-bundling';

interface HierarchicalEdgeBundlingShellProp extends WithLegend, WithOptions, WithFilter {
  data: NodeLinkData;
}
const HierarchicalEdgeBundlingGraphView = dynamic(
  () => import('@/components/views/hierarchical-edge-bundling'),
  { ssr: false }
);
const HierarchicalEdgeBundlingShellView = ({
  data,
  legend,
  options,
  filter
}: HierarchicalEdgeBundlingShellProp) => {
  const { nodes, links } = data;
  return (
    <>
      {filter ? (
        <FilteredHierarchicalEdgeBundlingGraphView
          options={options}
          nodes={nodes}
          links={links}
          legend={legend}
        />
      ) : (
        <>
          <HierarchicalEdgeBundlingGraphView
            options={options}
            nodes={nodes}
            links={links}
            legend={legend}
          />
        </>
      )}
    </>
  );
};
export default HierarchicalEdgeBundlingShellView;
