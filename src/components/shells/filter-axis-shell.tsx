'use client';

import { AxisChartData } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { useState } from 'react';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import CollapsableSearchBar from '../ui/collapsable-searchbar';
import AxisCharts from '../views/axis-charts';

interface FilteredAxisChartsShellProp extends WithLegend, WithOptions {
  data: AxisChartData;
  type: 'line' | 'bar';
}

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
    <AxisCharts options={options} data={filteredData} type={type} legend={legend} />
  </>
  );
};
export default FilteredAxisChartsShellView;
