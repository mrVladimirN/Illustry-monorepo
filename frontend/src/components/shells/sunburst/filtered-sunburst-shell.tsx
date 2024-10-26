'use client';

import { VisualizationTypes } from '@illustry/types';
import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import { WithFullScreen, WithLegend, WithOptions } from '@/lib/types/utils';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

type FilteredSunburstShellViewProp = {
  categories: string[];
  nodes: VisualizationTypes.HierarchyNode[];
} & WithLegend
  & WithOptions
  & WithFullScreen

const SunburstView = dynamic(
  () => import('@/components/views/sunburst-chart'),
  { ssr: false }
);

const FilteredSunburstShellView = ({
  categories,
  nodes,
  legend,
  options,
  fullScreen
}: FilteredSunburstShellViewProp) => {
  const [filteredData, setFilteredData] = useState<{
    categories: string[];
    nodes: VisualizationTypes.HierarchyNode[];
  }>({ categories, nodes });

  return (
    <>
      <CollapsableSearchBar
        data={{ categories, nodes }}
        setFilteredData={
          setFilteredData as Dispatch<
            SetStateAction<{
              categories: string[];
              nodes: VisualizationTypes.HierarchyNode[];
            }>
          >
        }
        type={VisualizationTypes.VisualizationTypesEnum.SUNBURST}
      />
      <>
        <SunburstView options={options}
          nodes={filteredData.nodes}
          categories={filteredData.categories}
          legend={legend}
          fullScreen={fullScreen} />
      </>
    </>
  );
};

export default FilteredSunburstShellView;
