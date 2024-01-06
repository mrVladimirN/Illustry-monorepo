import { NodeLinkData } from 'types/visualizations';
import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';
import FilteredForcedLayoutGraphShellView from './filter-flg-shell';

interface ForcedLayoutGraphShellProp
  extends WithLegend,
    WithOptions,
    WithFilter {
  data: NodeLinkData;
}
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
