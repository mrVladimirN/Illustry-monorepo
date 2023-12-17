/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client';

import { EChartsOption } from 'echarts';

import { HierarchyData } from 'types/visualizations';
import {
  computeCategories,
  computeNodesHierarchy
} from '@/lib/visualizations/hierarchy-charts/helper';
import { computeLegendColors } from '@/lib/visualizations/calendar/helper';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import Legend from '../ui/legend';
import { useThemeColors } from '../theme-provider';
import ReactEcharts from './generic/echarts';

interface SunburstViewProp extends WithLegend, WithOptions {
  data: HierarchyData;
}
const SunburstView = ({ data, legend }: SunburstViewProp) => {
  const activeTheme = useThemeColors();
  const theme = typeof window !== 'undefined' ? localStorage.getItem('theme') : 'light';
  const isDarkTheme = theme === 'dark';
  const colors = isDarkTheme
    ? activeTheme.sunburst.dark.colors
    : activeTheme.sunburst.light.colors;

  const { nodes } = data;
  const categories = computeCategories(nodes);
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      // @ts-ignore
      formatter(params) {
        // @ts-ignore
        return params.data.prop;
      }
    },
    series: [
      {
        type: 'sunburst',
        data: computeNodesHierarchy(nodes, categories, colors)
      }
    ]
  };
  return (
    <div className="relative mt-[4%] flex flex-col items-center">
      {legend && (
        <Legend legendData={computeLegendColors(categories, colors)} />
      )}
      <div className="w-full mt-4 h-[80vh]">
        <ReactEcharts option={option} className="w-full h-full" />
      </div>
    </div>
  );
};

export default SunburstView;
