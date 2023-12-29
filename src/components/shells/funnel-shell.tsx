import { FunnelData } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';

interface FunnelShellProp extends WithLegend, WithOptions {
    data: FunnelData;
  }
const FunnelView = dynamic(
  () => import('@/components/views/funnel-chart'),
  { ssr: false }
);
const FunnelShellView = ({
  data,
  legend,
  options
}:FunnelShellProp) => (
      <FunnelView
        options={options}
        data={data}
        legend={legend}
      />
);
export default FunnelShellView;
