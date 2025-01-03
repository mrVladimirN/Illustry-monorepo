'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import { VisualizationTypes } from '@illustry/types';
import { WithFullScreen, WithLegend, WithOptions } from '@/lib/types/utils';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

type FilteredTimelineShellViewProp = {
  data: VisualizationTypes.TimelineData;
} & WithLegend
  & WithOptions
  & WithFullScreen

const TimelineView = dynamic(
  () => import('@/components/views/timeline'),
  { ssr: false }
);

const FilteredTimelineShellView = ({
  data,
  legend,
  options,
  fullScreen
}: FilteredTimelineShellViewProp) => {
  const [filteredData, setFilteredData] = useState<VisualizationTypes.TimelineData>(data);

  return (
    <>
      <CollapsableSearchBar
        data={data}
        setFilteredData={
          setFilteredData as Dispatch<
            SetStateAction<VisualizationTypes.TimelineData>
          >
        }
        type={VisualizationTypes.VisualizationTypesEnum.TIMELINE}
      />
      <>
        <TimelineView
          options={options}
          data={filteredData}
          legend={legend}
          fullScreen={fullScreen}
        />
      </>
    </>
  );
};

export default FilteredTimelineShellView;
