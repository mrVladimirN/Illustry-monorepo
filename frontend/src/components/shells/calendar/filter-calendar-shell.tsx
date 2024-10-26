'use client';

import { VisualizationTypes } from '@illustry/types';
import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import { WithFullScreen, WithLegend, WithOptions } from '@/lib/types/utils';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

type FilteredCalendarShellProp = {
  categories: string[];
  calendar: VisualizationTypes.CalendarType[];
} & WithLegend
  & WithOptions
  & WithFullScreen

const CalendarView = dynamic(
  () => import('@/components/views/calendar-graph'),
  {
    ssr: false
  }
);
const FilteredCalendarShellView = ({
  categories,
  calendar,
  legend,
  options,
  fullScreen
}: FilteredCalendarShellProp) => {
  const [filteredData, setFilteredData] = useState<{
    categories: string[];
    calendar: VisualizationTypes.CalendarType[];
  }>({
    categories,
    calendar
  });
  return (
    <>
      <CollapsableSearchBar
        data={{
          categories,
          calendar
        }}
        setFilteredData={
          setFilteredData as Dispatch<
            SetStateAction<{
              categories: string[];
              calendar: VisualizationTypes.CalendarType[];
            }>
          >
        }
        type={VisualizationTypes.VisualizationTypesEnum.CALENDAR}
      />
      <CalendarView
        options={options}
        calendar={filteredData.calendar}
        categories={filteredData.categories}
        legend={legend}
        fullScreen={fullScreen}
      />
    </>
  );
};

export default FilteredCalendarShellView;
