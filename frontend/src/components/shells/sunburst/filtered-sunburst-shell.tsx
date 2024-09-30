'use client';

import { VisualizationTypes } from '@illustry/types';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import dynamic from 'next/dynamic';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

interface FilteredSunburstShellViewProp extends WithLegend, WithOptions {
  categories: string[];
  nodes: VisualizationTypes.HierarchyNode[];
}
const SunburstView = dynamic(
  () => import('@/components/views/sunburst-chart'),
  { ssr: false }
);
const FilteredSunburstShellView = ({
  categories,
  nodes,
  legend,
  options
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
        type={visualizationTypesEnum.SUNBURST}
      />
      <>
        <SunburstView options={options}
          nodes={filteredData.nodes}
          categories={filteredData.categories} legend={legend} />
      </>
    </>
  );
};
export default FilteredSunburstShellView;
