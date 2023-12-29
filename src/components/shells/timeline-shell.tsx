import { WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';
import { TimelineData } from 'types/visualizations';

interface TimelineShellProp extends WithLegend, WithOptions {
    data: TimelineData;
  }
const TimelineGraphView = dynamic(
  () => import('@/components/views/timeline'),
  { ssr: false }
);
const TimelineShellView = ({
  data,
  legend,
  options
}:TimelineShellProp) => (
      <TimelineGraphView
        options={options}
        data={data}
        legend={legend}
      />
);
export default TimelineShellView;
