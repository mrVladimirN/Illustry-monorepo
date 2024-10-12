'use client';

import { VisualizationTypes } from '@illustry/types';
import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

type FilteredHierarchicalEdgeBundlingGraphShellProp = {
  nodes: VisualizationTypes.Node[];
  links: VisualizationTypes.Link[];
} & WithLegend
  & WithOptions

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
    nodes: VisualizationTypes.Node[];
    links: VisualizationTypes.Link[];
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
              nodes: VisualizationTypes.Node[];
              links: VisualizationTypes.Link[];
            }>
          >
        }
        type={VisualizationTypes.VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING}
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
