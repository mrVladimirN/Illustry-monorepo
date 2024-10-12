'use client';

import { useRef, useEffect, JSX } from 'react';
import 'echarts-wordcloud';
import * as echarts from 'echarts/core';
import {
  SankeyChart,
  GraphChart,
  HeatmapChart,
  LineChart,
  BarChart,
  ScatterChart,
  PieChart,
  TreemapChart,
  SunburstChart,
  FunnelChart
} from 'echarts/charts';
import {
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  VisualMapComponent,
  CalendarComponent,
  ToolboxComponent
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import {
  EChartsOption,
  SetOptionOpts,
  WordCloudSeriesOption
} from 'echarts';

type ReactEChartsProps<T> = {
  option: T;
  className?: string;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
  style?: object;
}

const ReactEcharts = <T extends EChartsOption | WordCloudSeriesOption>({
  option,
  className,
  settings,
  loading,
  theme,
  style
}: ReactEChartsProps<T>): JSX.Element => {
  echarts.use([
    GraphChart,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    SVGRenderer,
    TransformComponent,
    SankeyChart,
    LegendComponent,
    HeatmapChart,
    VisualMapComponent,
    CalendarComponent,
    LineChart,
    PieChart,
    BarChart,
    ToolboxComponent,
    ScatterChart,
    TreemapChart,
    SunburstChart,
    FunnelChart
  ]);

  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chart
    let chart: echarts.ECharts | undefined;
    if (chartRef.current !== null) {
      chart = echarts.init(chartRef.current, theme);
    }

    const resizeChart = () => {
      chart?.resize();
    };

    window.addEventListener('resize', resizeChart);

    return () => {
      chart?.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    let chart: echarts.ECharts | undefined;
    if (chartRef.current !== null) {
      chart = echarts.getInstanceByDom(chartRef.current);
      chart?.setOption(option as EChartsOption, settings);
      // eslint-disable-next-line no-unused-expressions
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [option, settings, theme, loading]);

  return <div ref={chartRef} className={className} style={style} />;
};

export default ReactEcharts;
