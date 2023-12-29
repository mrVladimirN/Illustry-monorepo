import { AxisChartData } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';

interface AxisChartsShellProp extends WithLegend, WithOptions {
      data: AxisChartData;
      type: 'line' | 'bar';
    }
const AxisChartsView = dynamic(
  () => import('@/components/views/axis-charts'),
  { ssr: false }
);
const AxisChartsShellView = ({
  data,
  legend,
  options,
  type
}: AxisChartsShellProp) => (
        <AxisChartsView
          options={options}
          data={data}
          type={type}
          legend={legend}
        />
);
export default AxisChartsShellView;
