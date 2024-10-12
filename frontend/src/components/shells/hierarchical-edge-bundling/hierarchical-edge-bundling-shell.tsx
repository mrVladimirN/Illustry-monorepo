import dynamic from 'next/dynamic';
import { VisualizationTypes } from '@illustry/types';
import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';
import FilteredHierarchicalEdgeBundlingGraphShellView from './filter-hierarchical-edge-bundling-shell';

type HierarchicalEdgeBundlingShellProp = {
  data: VisualizationTypes.NodeLinkData;
  containered: boolean
} & WithLegend
  & WithOptions
  & WithFilter

const HierarchicalEdgeBundlingGraphView = dynamic(
  () => import('@/components/views/hierarchical-edge-bundling'),
  { ssr: false }
);

const HierarchicalEdgeBundlingShellView = ({
  data,
  legend,
  options,
  filter,
  containered
}: HierarchicalEdgeBundlingShellProp) => {
  const { nodes, links } = data;
  return (
    <>
      {filter ? (
        <FilteredHierarchicalEdgeBundlingGraphShellView
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
            containered={containered}
          />
        </>
      )}
    </>
  );
};

export default HierarchicalEdgeBundlingShellView;
