'use client';

import { VisualizationTypes } from '@illustry/types';
import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

interface FilteredPieChartShellProp extends WithLegend, WithOptions {
  data: VisualizationTypes.PieChartData
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
  const [filteredData, setFilteredData] = useState<VisualizationTypes.PieChartData>(data);

  return (
    <>
      <CollapsableSearchBar
        data={data}
        setFilteredData={
          setFilteredData as Dispatch<
            SetStateAction<VisualizationTypes.PieChartData>
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
