'use client';

import { Link, Node } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import dynamic from 'next/dynamic';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

interface FilteredHierarchicalEdgeBundlingGraphShellProp extends WithLegend, WithOptions {
  nodes: Node[];
  links: Link[];
}
const HierarchicalEdgeBundlingGraphView = dynamic(
  () => import('@/components/views/hierarchical-edge-bundling'),
  { ssr: false }
);
const FilteredHierarchicalEdgeBundlingGraphShellView = ({
  nodes,
  links,
  legend,
  options
}: FilteredHierarchicalEdgeBundlingGraphShellProp) => {
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
        type={visualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING}
      />
      <HierarchicalEdgeBundlingGraphView
        options={options}
        nodes={filteredData.nodes}
        links={filteredData.links}
        legend={legend}
        containered={false}
      />
    </>
  );
};
export default FilteredHierarchicalEdgeBundlingGraphShellView;
