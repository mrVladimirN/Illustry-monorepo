import { VisualizationTypes } from '@illustry/types';
import dynamic from 'next/dynamic';
import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';
import FilteredPieChartGraphShellView from './filter-piechart-shell';

type PieChartShellProp = {
  data: VisualizationTypes.PieChartData;
} & WithLegend
  & WithOptions
  & WithFilter

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
