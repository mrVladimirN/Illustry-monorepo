import { VisualizationTypes } from '@illustry/types';
import dynamic from 'next/dynamic';
import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';
import { computeCategoriesCalendar } from '@/lib/visualizations/calendar/helper';
import FilteredCalendarShellView from './filter-calendar-shell';

type CalendarGraphShellProp = {
  data: VisualizationTypes.CalendarData;
} & WithLegend
  & WithOptions
  & WithFilter

const CalendarGraphView = dynamic(
  () => import('@/components/views/calendar-graph'),
  { ssr: false }
);

const CalendarGraphShellView = ({
  data,
  legend,
  options,
  filter
}: CalendarGraphShellProp) => {
  const { calendar } = data;
  const categories = computeCategoriesCalendar(calendar);

  return (
    <>
      {filter ? (
        <FilteredCalendarShellView
          options={options}
          calendar={calendar}
          categories={categories}
          legend={legend}
        />
      ) : (
        <>
          <CalendarGraphView
            options={options}
            calendar={calendar}
            categories={categories}
            legend={legend}
          />
        </>
      )}
    </>
  );
};

export default CalendarGraphShellView;
