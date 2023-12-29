import {
  computeCategoriesSankey,
  computeLinksSankey
} from '@/lib/visualizations/node-link/helper';
import { NodeLinkData } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';

interface SankeyGraphShellProp extends WithLegend, WithOptions {
  data: NodeLinkData;
}
const SankeyGraphView = dynamic(
  () => import('@/components/views/sankey-diagram'),
  { ssr: false }
);
const SankeyGraphShellView = ({
  data,
  legend,
  options
}: SankeyGraphShellProp) => {
  const { nodes, links } = data;
  const categories: string[] = computeCategoriesSankey(nodes);
  const newLinks = computeLinksSankey(links);
  return (
    <SankeyGraphView
      options={options}
      nodes={nodes}
      links={newLinks}
      categories={categories}
      legend={legend}
    />
  );
};
export default SankeyGraphShellView;
