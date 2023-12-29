import { PieChartData } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';

interface PieChartShellProp extends WithLegend, WithOptions {
    data: PieChartData;
  }
const PieChartGraphView = dynamic(
  () => import('@/components/views/pie-chart'),
  { ssr: false }
);
const PieChartShellView = ({
  data,
  legend,
  options
}:PieChartShellProp) => (
      <PieChartGraphView
        options={options}
        data={data}
        legend={legend}
      />
);
export default PieChartShellView;
