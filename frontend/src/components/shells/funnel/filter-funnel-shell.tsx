'use client';

import { VisualizationTypes } from '@illustry/types';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import dynamic from 'next/dynamic';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

interface FilteredFunnelShellProp extends WithLegend, WithOptions {
  data: VisualizationTypes.FunnelData
}
const FunnelView = dynamic(
  () => import('@/components/views/funnel-chart'),
  { ssr: false }
);
const FilteredFunnelShellView = ({
  data,
  legend,
  options
}: FilteredFunnelShellProp) => {
  const [filteredData, setFilteredData] = useState<VisualizationTypes.FunnelData>(data);

  return (
    <>
      <CollapsableSearchBar
        data={data}
        setFilteredData={
          setFilteredData as Dispatch<
            SetStateAction<VisualizationTypes.FunnelData>
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
export default FilteredFunnelShellView;
