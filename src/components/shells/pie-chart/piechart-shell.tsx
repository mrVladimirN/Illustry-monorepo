import { PieChartData } from 'types/visualizations';
import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';
import FilteredPieChartGraphView from './filter-piechart-shell';

interface PieChartShellProp extends WithLegend, WithOptions, WithFilter {
  data: PieChartData;
}
const PieChartGraphView = dynamic(
  () => import('@/components/views/pie-chart'),
  { ssr: false }
);
const PieChartShellView = ({
  data, legend, options, filter
}: PieChartShellProp) => (
  <>
    {filter ? (
      <FilteredPieChartGraphView options={options} data={data} legend={legend} />
    ) : (
      <>
        <PieChartGraphView options={options} data={data} legend={legend} />
      </>
    )}
  </>
);
export default PieChartShellView;
