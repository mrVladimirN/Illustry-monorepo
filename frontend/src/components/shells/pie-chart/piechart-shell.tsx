import { VisualizationTypes } from '@illustry/types';
import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';
import FilteredPieChartGraphShellView from './filter-piechart-shell';

interface PieChartShellProp extends WithLegend, WithOptions, WithFilter {
  data: VisualizationTypes.PieChartData;
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
      <FilteredPieChartGraphShellView options={options} data={data} legend={legend} />
    ) : (
      <>
        <PieChartGraphView options={options} data={data} legend={legend} />
      </>
    )}
  </>
);
export default PieChartShellView;
