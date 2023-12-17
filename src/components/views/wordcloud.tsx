/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client';

import {
  EChartsOption,
  WordCloudSeriesOption
} from 'echarts/types/dist/echarts';
import {
  computeWords,
  computePropertiesForToolTip
} from '@/lib/visualizations/word-cloud/helper';
import { WordCloudData } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { useThemeColors } from '../theme-provider';
import ReactEcharts from './generic/echarts';

interface WordCloudProp extends WithLegend, WithOptions {
  data: WordCloudData;
}
const WordCloudView = ({ data }: WordCloudProp) => {
  const activeTheme = useThemeColors();
  const theme = typeof window !== 'undefined' ? localStorage.getItem('theme') : 'light';
  const isDarkTheme = theme === 'dark';
  const colors = isDarkTheme
    ? activeTheme.wordcloud.dark.colors
    : activeTheme.wordcloud.light.colors;

  const { words } = data;
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      // @ts-ignore
      formatter(params) {
        // @ts-ignore
        return computePropertiesForToolTip(
          // @ts-ignore
          params.data.properties,
          // @ts-ignore
          params.data.value
        );
      }
    },

    series: [
      {
        type: 'wordCloud',
        shape: 'circle',
        data: computeWords(words, colors),
        keepAspect: true,
        left: 'center',
        top: 'center',
        width: '100%',
        height: '100%',
        right: null,
        bottom: null,

        sizeRange: [50, 70],

        gridSize: 8,

        emphasis: {
          focus: 'self',

          textStyle: {
            textShadowBlur: 10,
            textShadowColor: '#333'
          }
        }
      }
    ] as WordCloudSeriesOption
  };
  return (
    <div className="w-full mt-4 h-screens-90 sm:mt-6 lg:mt-8">
      <ReactEcharts
        option={option}
        className="w-full h-[90vh] sm:h-120 lg:h-160"
      />
    </div>
  );
};
export default WordCloudView;
