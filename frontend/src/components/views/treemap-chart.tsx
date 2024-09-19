/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client';

import { EChartsOption } from 'echarts';
import { HierarchyNode } from 'types/visualizations';
import {
  calculateMeanValue,
  computeMaxDepth,
  computeNodesHierarchy,
  computeUniqueValues,
  createLevels
} from '@/lib/visualizations/hierarchy-charts/helper';
import { computeLegendColors } from '@/lib/visualizations/calendar/helper';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import Legend from '../ui/legend';
import { useThemeColors } from '../theme-provider';
import ReactEcharts from './generic/echarts';

interface TreeMapProp extends WithLegend, WithOptions {
  categories: string[];
  nodes: HierarchyNode[];
}
const TreeMapView = ({ nodes, categories, legend }: TreeMapProp) => {
  const maxDepth = computeMaxDepth(nodes);
  const meanValue = calculateMeanValue(computeUniqueValues(nodes));
  const levels = createLevels(maxDepth);
  const activeTheme = useThemeColors();
  const theme = typeof window !== 'undefined' ? localStorage.getItem('theme') : 'light';
  const isDarkTheme = theme === 'dark';
  const colors = isDarkTheme
    ? activeTheme.treeMap.dark.colors
    : activeTheme.treeMap.light.colors;

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
        type: 'treemap',
        visibleMin: meanValue,
        data: computeNodesHierarchy(nodes, categories, colors),
        leafDepth: maxDepth,
        levels
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

export default TreeMapView;
