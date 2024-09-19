'use client';

import { Link, Node } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import dynamic from 'next/dynamic';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

interface FilteredMatrixShellProp extends WithLegend, WithOptions {
  nodes: Node[];
  links: Link[];
}
const MatrixView = dynamic(
  () => import('@/components/views/matrix'),
  {
    ssr: false
  }
);
const FilteredMatrixShellView = ({
  nodes,
  links,
  legend,
  options
}: FilteredMatrixShellProp) => {
  const [filteredData, setFilteredData] = useState<{
    nodes: Node[];
    links: Link[];
  }>({
    nodes,
    links
  });

  return (
    <>
      <CollapsableSearchBar
        data={{
          nodes,
          links
        }}
        setFilteredData={
          setFilteredData as Dispatch<
            SetStateAction<{
                nodes: Node[];
                links: Link[];
              }>
          >
        }
        type={visualizationTypesEnum.MATRIX}
      />
      <MatrixView
        options={options}
        nodes={filteredData.nodes}
        links={filteredData.links}
        legend={legend}
      />
    </>
  );
};
export default FilteredMatrixShellView;
