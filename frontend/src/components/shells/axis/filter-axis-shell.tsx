'use client';

import { VisualizationTypes } from '@illustry/types';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { WithFullScreen, WithLegend, WithOptions } from '@/lib/types/utils';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

type FilteredAxisChartsShellProp = {
  data: VisualizationTypes.AxisChartData;
  type: 'line' | 'bar';
} & WithLegend
  & WithOptions
  & WithFullScreen

const AxisChartsView = dynamic(() => import('@/components/views/axis-charts'), {
  ssr: false
});

const FilteredAxisChartsShellView = ({
  data,
  legend,
  options,
  type,
  fullScreen
}: FilteredAxisChartsShellProp) => {
  const [filteredData, setFilteredData] = useState<VisualizationTypes.AxisChartData>(data);
  return (
    <>
      <CollapsableSearchBar
        data={data}
        setFilteredData={setFilteredData}
        type={type === 'line'
          ? VisualizationTypes.VisualizationTypesEnum.LINE_CHART
          : VisualizationTypes.VisualizationTypesEnum.BAR_CHART} />
      <AxisChartsView
        options={options}
        data={filteredData}
        type={type}
        legend={legend}
        fullScreen={fullScreen}
      />
    </>
  );
};

export default FilteredAxisChartsShellView;
