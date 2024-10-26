'use client';

import { VisualizationTypes } from '@illustry/types';
import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import { WithFullScreen, WithLegend, WithOptions } from '@/lib/types/utils';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

type FilteredSankeyGraphShellProp = {
  nodes: VisualizationTypes.Node[];
  links: VisualizationTypes.Link[];
} & WithLegend
  & WithOptions
  & WithFullScreen

const SankeyGraphView = dynamic(
  () => import('@/components/views/sankey-diagram'),
  { ssr: false }
);

const FilteredSankeyGraphShellView = ({
  nodes,
  links,
  fullScreen = true,
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
        type={VisualizationTypes.VisualizationTypesEnum.SANKEY}
      />
      <SankeyGraphView
        fullScreen={fullScreen}
        options={options}
        nodes={filteredData.nodes}
        links={filteredData.links}
        legend={legend}
      />
    </>
  );
};

export default FilteredSankeyGraphShellView;
