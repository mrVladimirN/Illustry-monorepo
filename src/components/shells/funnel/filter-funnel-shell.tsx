'use client';

import { FunnelData } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import dynamic from 'next/dynamic';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

interface FilteredFunnelProp extends WithLegend, WithOptions {
  data: FunnelData
}
const FunnelView = dynamic(
  () => import('@/components/views/funnel-chart'),
  { ssr: false }
);
const FilteredFunnelView = ({
  data,
  legend,
  options
}: FilteredFunnelProp) => {
  const [filteredData, setFilteredData] = useState<FunnelData>(data);

  return (
    <>
      <CollapsableSearchBar
        data={data}
        setFilteredData={
          setFilteredData as Dispatch<
            SetStateAction<FunnelData>
          >
        }
        type={visualizationTypesEnum.FUNNEL}
      />
      <FunnelView
        options={options}
        data={filteredData}
        legend={legend}
      />
    </>
  );
};
export default FilteredFunnelView;
