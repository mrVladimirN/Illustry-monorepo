'use client';

import { VisualizationTypes } from '@illustry/types';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import dynamic from 'next/dynamic';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

interface FilteredTreemapShellViewProp extends WithLegend, WithOptions {
  categories: string[];
  nodes: VisualizationTypes.HierarchyNode[];
}
const TreeMapView = dynamic(
  () => import('@/components/views/treemap-chart'),
  { ssr: false }
);
const FilteredTreemapShellView = ({
  categories,
  nodes,
  legend,
  options
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
        type={visualizationTypesEnum.TREEMAP}
      />
      <>
        <TreeMapView options={options}
          nodes={filteredData.nodes}
          categories={filteredData.categories} legend={legend} />
      </>
    </>
  );
};
export default FilteredTreemapShellView;
