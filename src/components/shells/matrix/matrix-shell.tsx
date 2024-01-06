import { WithFilter, WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';
import { NodeLinkData } from 'types/visualizations';
import FilteredMatrixShellView from './filter-matrix-shell';

interface MatrixShellProp extends WithLegend, WithOptions, WithFilter {
  data: NodeLinkData;
}
const MatrixGraphView = dynamic(() => import('@/components/views/matrix'), {
  ssr: false
});
const MatrixShellView = ({
  data, legend, options, filter
}: MatrixShellProp) => {
  const { nodes, links } = data;
  return (
    <>
      {filter ? (
        <FilteredMatrixShellView
          options={options}
          nodes={nodes}
          links={links}
          legend={legend}
        />
      ) : (
        <>
          <MatrixGraphView
            options={options}
            nodes={nodes}
            links={links}
            legend={legend}
          />
        </>
      )}
    </>
  );
};
export default MatrixShellView;
