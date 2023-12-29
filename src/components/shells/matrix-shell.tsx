import { WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';
import { NodeLinkData } from 'types/visualizations';

interface MatrixShellProp extends WithLegend, WithOptions {
    data: NodeLinkData;
  }
const MatrixGraphView = dynamic(
  () => import('@/components/views/matrix'),
  { ssr: false }
);
const MatrixShellView = ({
  data,
  legend,
  options
}:MatrixShellProp) => (
      <MatrixGraphView
        options={options}
        data={data}
        legend={legend}
      />
);
export default MatrixShellView;
