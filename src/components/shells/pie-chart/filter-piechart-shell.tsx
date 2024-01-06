'use client';

import { PieChartData } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import dynamic from 'next/dynamic';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

interface FilteredPieChartShellProp extends WithLegend, WithOptions {
  data: PieChartData
}
const PieChartGraphView = dynamic(
  () => import('@/components/views/pie-chart'),
  { ssr: false }
);
const FilteredPieChartGraphShellView = ({
  data,
  legend,
  options
}: FilteredPieChartShellProp) => {
  const [filteredData, setFilteredData] = useState<PieChartData>(data);

  return (
    <>
      <CollapsableSearchBar
        data={data}
        setFilteredData={
          setFilteredData as Dispatch<
            SetStateAction<PieChartData>
          >
        }
        type={visualizationTypesEnum.PIE_CHART}
      />
      <>
        <PieChartGraphView options={options} data={filteredData} legend={legend} />
      </>
    </>
  );
};
export default FilteredPieChartGraphShellView;
