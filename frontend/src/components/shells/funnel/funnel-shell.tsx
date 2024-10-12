import { VisualizationTypes } from '@illustry/types';
import dynamic from 'next/dynamic';
import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';
import FilteredFunnelShellView from './filter-funnel-shell';

type FunnelShellProp = {
  data: VisualizationTypes.FunnelData;
} & WithLegend
  & WithOptions
  & WithFilter

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
