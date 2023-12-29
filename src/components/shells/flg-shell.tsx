import {
  computeLinksFLG
} from '@/lib/visualizations/node-link/helper';
import { NodeLinkData } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';

  interface ForcedLayoutGraphShellProp extends WithLegend, WithOptions {
    data: NodeLinkData;
  }
const ForcedLayoutGraphView = dynamic(
  () => import('@/components/views/forced-layout-graph'),
  { ssr: false }
);
const ForcedLayoutGraphShellView = ({
  data,
  legend,
  options
}: ForcedLayoutGraphShellProp) => {
  const { nodes, links } = data;

  const edges = computeLinksFLG(links, nodes);
  return (
      <ForcedLayoutGraphView
        options={options}
        nodes={nodes}
        edges={edges}
        legend={legend}
      />
  );
};
export default ForcedLayoutGraphShellView;
