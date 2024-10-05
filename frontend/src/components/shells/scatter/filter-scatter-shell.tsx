'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

interface FilteredScatterShellViewProp extends WithLegend, WithOptions {
    points: (string | number)[][];
    categories: string[];
  }
const ScatterGraphView = dynamic(
  () => import('@/components/views/scatter'),
  { ssr: false }
);
const FilteredScatterGraphShellView = ({
  points,
  categories,
  legend,
  options
}: FilteredScatterShellViewProp) => {
  const [filteredData, setFilteredData] = useState<{
    points:(string | number)[][];
    categories: string[];
      }>({
        points,
        categories
      });

  return (
    <>
      <CollapsableSearchBar
        data={{
          points,
          categories
        }}
        setFilteredData={
          setFilteredData as Dispatch<
            SetStateAction<{
                points: (string | number)[][];
                categories: string[];
              }>
          >
        }
        type={visualizationTypesEnum.SCATTER}
      />
       <>
          <ScatterGraphView
            options={options}
            points={filteredData.points}
            categories={filteredData.categories}
            legend={legend}
          />
        </>
    </>
  );
};
export default FilteredScatterGraphShellView;
