import {
  computeLinksSankey
} from '@/lib/visualizations/node-link/helper';
import { VisualizationTypes } from '@illustry/types';
import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';
import FilteredSankeyGraphShellView from './filter-sankey-shell';

interface SankeyGraphShellProp extends WithLegend, WithOptions, WithFilter {
  data: VisualizationTypes.NodeLinkData;
}
const SankeyGraphView = dynamic(
  () => import('@/components/views/sankey-diagram'),
  { ssr: false }
);
const SankeyGraphShellView = ({
  data,
  legend,
  options,
  filter
}: SankeyGraphShellProp) => {
  const { nodes, links } = data;
  const newLinks = computeLinksSankey(links);

  return (
    <>
      {filter ? (
        <FilteredSankeyGraphShellView
          options={options}
          nodes={nodes}
          links={newLinks}
          legend={legend}
        />
      ) : (
        <>
          <SankeyGraphView
            options={options}
            nodes={nodes}
            links={newLinks}
            legend={legend}
          />
        </>
      )}
    </>
  );
};
export default SankeyGraphShellView;
