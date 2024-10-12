import { VisualizationTypes } from '@illustry/types';
import dynamic from 'next/dynamic';
import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';
import FilteredForcedLayoutGraphShellView from './filter-forced-layout-graph-shell';

type ForcedLayoutGraphShellProp = {
  data: VisualizationTypes.NodeLinkData;
} & WithLegend
  & WithOptions
  & WithFilter

const ForcedLayoutGraphView = dynamic(
  () => import('@/components/views/forced-layout-graph'),
  { ssr: false }
);

const ForcedLayoutGraphShellView = ({
  data,
  legend,
  options,
  filter
}: ForcedLayoutGraphShellProp) => {
  const { nodes, links } = data;
  return (
    <>
      {filter ? (
        <FilteredForcedLayoutGraphShellView
          options={options}
          nodes={nodes}
          links={links}
          legend={legend}
        />
      ) : (
        <>
          <ForcedLayoutGraphView
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

export default ForcedLayoutGraphShellView;
