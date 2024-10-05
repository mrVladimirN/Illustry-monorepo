import { VisualizationTypes } from '@illustry/types';
import dynamic from 'next/dynamic';
import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';

interface AxisChartsShellProp extends WithLegend, WithOptions, WithFilter {
  data: VisualizationTypes.AxisChartData;
  type: 'line' | 'bar';
}

const AxisChartsView = dynamic(() => import('@/components/views/axis-charts'), {
  ssr: false
});

const FilteredAxisChartsShellView = dynamic(
  () => import('@/components/shells/axis/filter-axis-shell'),
  {
    ssr: false
  }
);

const AxisChartsShellView = ({
  data,
  legend,
  options,
  type,
  filter
}: AxisChartsShellProp) => (
  <>
    {filter ? (
      <FilteredAxisChartsShellView
        options={options}
        data={data}
        type={type}
        legend={legend}
      />
    ) : (
      <>
        <AxisChartsView options={options} data={data} type={type} legend={legend} />
      </>
    )}
  </>
);

export default AxisChartsShellView;
