'use client';

import { Link, Node } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import dynamic from 'next/dynamic';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

interface FilteredSankeyGraphShellProp extends WithLegend, WithOptions {
  nodes: Node[];
  links: Link[];
}
const SankeyGraphView = dynamic(
  () => import('@/components/views/sankey-diagram'),
  { ssr: false }
);
const FilteredSankeyGraphShellView = ({
  nodes,
  links,
  legend,
  options
}: FilteredSankeyGraphShellProp) => {
  const [filteredData, setFilteredData] = useState<{
    nodes: Node[];
    links: Link[];
  }>({
    nodes,
    links
  });

  return (
    <>
      <CollapsableSearchBar
        data={{
          nodes,
          links
        }}
        setFilteredData={
          setFilteredData as Dispatch<
            SetStateAction<{
                nodes: Node[];
                links: Link[];
              }>
          >
        }
        type={visualizationTypesEnum.SANKEY}
      />
      <SankeyGraphView
        options={options}
        nodes={filteredData.nodes}
        links={filteredData.links}
        legend={legend}
      />
    </>
  );
};
export default FilteredSankeyGraphShellView;
