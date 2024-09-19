/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client';

import { EChartsOption } from 'echarts/types/dist/echarts';
import {
  computeCategoriesSankey,
  computeNodesSankey
} from '@/lib/visualizations/node-link/helper';
import { Link, Node } from 'types/visualizations';
import { computeLegendColors } from '@/lib/visualizations/calendar/helper';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import Legend from '../ui/legend';
import { useThemeColors } from '../theme-provider';
import ReactEcharts from './generic/echarts';

interface SankeyGraphProp extends WithLegend, WithOptions {
links: Link[],
nodes: Node[],
}
const SankeyGraphView = ({
  links,
  nodes,
  legend
}: SankeyGraphProp) => {
  const activeTheme = useThemeColors();
  const theme = typeof window !== 'undefined' ? localStorage.getItem('theme') : 'light';
  const isDarkTheme = theme === 'dark';
  const colors = isDarkTheme
    ? activeTheme.sankey.dark.colors
    : activeTheme.sankey.light.colors;
  const categories: string[] = computeCategoriesSankey(nodes);

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

    animation: false,
    emphasis: {
      focus: 'adjacency',
      lineStyle: {
        width: 3
      }
    },
    series: [
      {
        type: 'sankey',
        emphasis: {
          focus: 'adjacency'
        },
        nodeAlign: 'right',
        data: computeNodesSankey(nodes, categories, colors),
        links,
        lineStyle: {
          color: 'source',
          curveness: 0.5
        }
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
export default SankeyGraphView;
