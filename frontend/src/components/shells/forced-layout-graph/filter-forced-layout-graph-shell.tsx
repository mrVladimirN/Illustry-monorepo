'use client';

import { VisualizationTypes } from '@illustry/types';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import dynamic from 'next/dynamic';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

interface FilteredForcedLayoutGraphShellProp extends WithLegend, WithOptions {
  nodes: VisualizationTypes.Node[];
  links: VisualizationTypes.Link[];
}
const ForcedLayoutGraphView = dynamic(
  () => import('@/components/views/forced-layout-graph'),
  {
    ssr: false
  }
);
const FilteredForcedLayoutGraphShellView = ({
  nodes,
  links,
  legend,
  options
}: FilteredForcedLayoutGraphShellProp) => {
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
        type={visualizationTypesEnum.FORCE_DIRECTED_GRAPH}
      />
      <ForcedLayoutGraphView
        options={options}
        nodes={filteredData.nodes}
        links={filteredData.links}
        legend={legend}
      />
    </>
  );
};
export default FilteredForcedLayoutGraphShellView;
