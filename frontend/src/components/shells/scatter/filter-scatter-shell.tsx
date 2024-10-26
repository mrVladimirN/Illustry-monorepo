'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import { VisualizationTypes } from '@illustry/types';
import { WithFullScreen, WithLegend, WithOptions } from '@/lib/types/utils';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

type FilteredScatterShellViewProp = {
  points: (string | number)[][];
  categories: string[];
} & WithLegend
  & WithOptions
  & WithFullScreen

const ScatterGraphView = dynamic(
  () => import('@/components/views/scatter'),
  { ssr: false }
);

const FilteredScatterGraphShellView = ({
  points,
  categories,
  legend,
  options,
  fullScreen
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
        type={VisualizationTypes.VisualizationTypesEnum.SCATTER}
      />
      <>
        <ScatterGraphView
          options={options}
          points={filteredData.points}
          categories={filteredData.categories}
          legend={legend}
          fullScreen={fullScreen}
        />
      </>
    </>
  );
};

export default FilteredScatterGraphShellView;
