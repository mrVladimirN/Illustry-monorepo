'use client';

import { EChartsOption } from 'echarts/types/dist/echarts';

import { AxisChartData } from 'types/visualizations';
import {
  computeLegendColors,
  constructSeries
} from '@/lib/visualizations/chart/helper';
import { SeriesOption } from 'echarts';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import Legend from '../ui/legend';
import { useThemeColors } from '../theme-provider';
import ReactEcharts from './generic/echarts';

interface AxisChartProp extends WithLegend, WithOptions {
  data: AxisChartData;
  type: 'line' | 'bar';
}
const AxisChartView = ({
  data, type, legend
}: AxisChartProp) => {
  const activeTheme = useThemeColors();
  const theme = typeof window !== 'undefined' ? localStorage.getItem('theme') : 'light';
  const isDarkTheme = theme === 'dark';
  let colors;

  if (isDarkTheme) {
    if (type === 'bar') {
      colors = activeTheme.barChart.dark.colors;
    } else if (type === 'line') {
      colors = activeTheme.lineChart.dark.colors;
    }
  } else if (type === 'bar') {
    colors = activeTheme.barChart.light.colors;
  } else if (type === 'line') {
    colors = activeTheme.lineChart.light.colors;
  }

  const { headers, values } = data;
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },

    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: type !== 'line',
        data: headers
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: constructSeries(values, colors as string[], false, type, false) as SeriesOption
  };
  return (
    <div className="relative mt-[4%] flex flex-col items-center">
      {legend && <Legend legendData={computeLegendColors(data, colors as string[])} />}
      <div className="w-full mt-4 h-[80vh]">
        <ReactEcharts option={option} className="w-full h-full" />
      </div>
    </div>
  );
};
export default AxisChartView;
