'use client';

import { VisualizationTypes } from '@illustry/types';
import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import { WithFullScreen, WithLegend, WithOptions } from '@/lib/types/utils';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

type FilteredMatrixShellProp = {
  nodes: VisualizationTypes.Node[];
  links: VisualizationTypes.Link[];
} & WithLegend
  & WithOptions
  & WithFullScreen

const MatrixView = dynamic(
  () => import('@/components/views/matrix'),
  {
    ssr: false
  }
);

const FilteredMatrixShellView = ({
  nodes,
  links,
  legend,
  options,
  fullScreen
}: FilteredMatrixShellProp) => {
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
        type={VisualizationTypes.VisualizationTypesEnum.MATRIX}
      />
      <MatrixView
        options={options}
        nodes={filteredData.nodes}
        links={filteredData.links}
        legend={legend}
        fullScreen={fullScreen}
      />
    </>
  );
};

export default FilteredMatrixShellView;
