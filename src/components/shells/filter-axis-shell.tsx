'use client';

import { AxisChartData } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { useState } from 'react';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import dynamic from 'next/dynamic';
import CollapsableSearchBar from '../ui/collapsable-searchbar';

interface FilteredAxisChartsShellProp extends WithLegend, WithOptions {
  data: AxisChartData;
  type: 'line' | 'bar';
}
const AxisChartsView = dynamic(() => import('@/components/views/axis-charts'), {
  ssr: false
});
const FilteredAxisChartsShellView = ({
  data,
  legend,
  options,
  type
}: FilteredAxisChartsShellProp) => {
  const [filteredData, setFilteredData] = useState<AxisChartData>(data);
  return (
  <>
    <CollapsableSearchBar data = {data} setFilteredData ={setFilteredData} type={type === 'line' ? visualizationTypesEnum.LINE_CHART : visualizationTypesEnum.BAR_CHART}/>
    <AxisChartsView options={options} data={filteredData} type={type} legend={legend} />
  </>
  );
};
export default FilteredAxisChartsShellView;
