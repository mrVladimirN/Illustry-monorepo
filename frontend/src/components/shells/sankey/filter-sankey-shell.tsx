'use client';

import { VisualizationTypes } from '@illustry/types';
import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

interface FilteredSankeyGraphShellProp extends WithLegend, WithOptions {
  nodes: VisualizationTypes.Node[];
  links: VisualizationTypes.Link[];
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
