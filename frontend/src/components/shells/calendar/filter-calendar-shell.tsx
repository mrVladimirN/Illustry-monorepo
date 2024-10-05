'use client';

import { VisualizationTypes } from '@illustry/types';
import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

interface FilteredCalendarShellProp extends WithLegend, WithOptions {
  categories: string[];
  calendar: VisualizationTypes.CalendarType[];
}
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
  options
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
        type={visualizationTypesEnum.CALENDAR}
      />
      <CalendarView
        options={options}
        calendar={filteredData.calendar}
        categories={filteredData.categories}
        legend={legend}
      />
    </>
  );
};
export default FilteredCalendarShellView;
