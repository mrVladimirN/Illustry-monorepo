import { CalendarData } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';
import { computeCategoriesCalendar } from '@/lib/visualizations/calendar/helper';

interface CalendarGraphShellProp extends WithLegend, WithOptions {
      data: CalendarData;
    }
const CalendarGraphView = dynamic(
  () => import('@/components/views/calendar-graph'),
  { ssr: false }
);
const CalendarGraphShellView = ({
  data,
  legend,
  options
}: CalendarGraphShellProp) => {
  const { calendar } = data;
  const categories = computeCategoriesCalendar(calendar);
  return (
        <CalendarGraphView
          options={options}
          calendar={calendar}
          categories={categories}
          legend={legend}
        />
  );
};
export default CalendarGraphShellView;
