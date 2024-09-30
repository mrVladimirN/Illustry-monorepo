import { VisualizationTypes } from '@illustry/types';
import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';
import FilteredFunnelShellView from './filter-funnel-shell';

interface FunnelShellProp extends WithLegend, WithOptions, WithFilter {
  data: VisualizationTypes.FunnelData;
}
const FunnelView = dynamic(() => import('@/components/views/funnel-chart'), {
  ssr: false
});
const FunnelShellView = ({
  data, legend, options, filter
}: FunnelShellProp) => (
  <>
    {filter ? (
      <FilteredFunnelShellView
        options={options}
        data={data}
        legend={legend}
      />
    ) : (
      <>
        <FunnelView
          options={options}
          data={data}
          legend={legend}
        />
      </>
    )}
  </>
);
export default FunnelShellView;
