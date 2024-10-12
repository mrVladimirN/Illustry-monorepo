import dynamic from 'next/dynamic';
import { VisualizationTypes } from '@illustry/types';
import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';
import FilteredTimelineShellView from './filter-timeline-shell';

type TimelineShellProp = {
  data: VisualizationTypes.TimelineData;
} & WithLegend
  & WithOptions
  & WithFilter

const TimelineGraphView = dynamic(() => import('@/components/views/timeline'), {
  ssr: false
});

const TimelineShellView = ({
  data,
  legend,
  options,
  filter
}: TimelineShellProp) => (
  <>
    {filter ? (
      <FilteredTimelineShellView
        options={options}
        data={data}
        legend={legend}
      />
    ) : (
      <>
        <TimelineGraphView options={options} data={data} legend={legend} />
      </>
    )}
  </>
);

export default TimelineShellView;
