'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import { VisualizationTypes } from '@illustry/types';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

interface FilteredTimelineShellViewProp extends WithLegend, WithOptions {
  data: VisualizationTypes.TimelineData;
}
const TimelineView = dynamic(
  () => import('@/components/views/timeline'),
  { ssr: false }
);
const FilteredTimelineShellView = ({
  data,
  legend,
  options
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
        type={visualizationTypesEnum.TIMELINE}
      />
      <>
        <TimelineView
          options={options}
          data={filteredData}
          legend={legend}
        />
      </>
    </>
  );
};
export default FilteredTimelineShellView;
