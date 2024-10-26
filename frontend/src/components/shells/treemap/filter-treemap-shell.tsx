'use client';

import { VisualizationTypes } from '@illustry/types';
import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import { WithFullScreen, WithLegend, WithOptions } from '@/lib/types/utils';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

type FilteredTreemapShellViewProp = {
  categories: string[];
  nodes: VisualizationTypes.HierarchyNode[];
} & WithLegend
  & WithOptions
  & WithFullScreen

const TreeMapView = dynamic(
  () => import('@/components/views/treemap-chart'),
  { ssr: false }
);

const FilteredTreemapShellView = ({
  categories,
  nodes,
  legend,
  options,
  fullScreen
}: FilteredTreemapShellViewProp) => {
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
        type={VisualizationTypes.VisualizationTypesEnum.TREEMAP}
      />
      <>
        <TreeMapView options={options}
          nodes={filteredData.nodes}
          categories={filteredData.categories}
          legend={legend}
          fullScreen={fullScreen}
        />
      </>
    </>
  );
};

export default FilteredTreemapShellView;
