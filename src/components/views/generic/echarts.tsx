"use client";
import React, { useRef, useEffect } from "react";

import "echarts-wordcloud";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
import {
  SankeyChart,
  GraphChart,
  HeatmapChart,
  LineChart,
  BarChart,
  ScatterChart,
  PieChart,
} from "echarts/charts";
// Import the tooltip, title, rectangular coordinate system, dataset and transform components
import {
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  VisualMapComponent,
  CalendarComponent,
  ToolboxComponent,
} from "echarts/components";

import { SVGRenderer } from "echarts/renderers";

import {
  EChartsOption,
  SetOptionOpts,
  WordCloudSeriesOption,
} from "echarts/types/dist/echarts";

export interface ReactEChartsProps<T> {
  option: T;
  className?: string;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "dark";
}

const ReactEcharts = <T extends EChartsOption | WordCloudSeriesOption>({
  option,
  className,
  settings,
  loading,
  theme,
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
  ]);

  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chart
    let chart: echarts.ECharts | undefined;
    if (chartRef.current !== null) {
      chart = echarts.init(chartRef.current, theme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    let chart: echarts.ECharts | undefined;
    if (chartRef.current !== null) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      chart?.setOption(option as EChartsOption, settings);
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [option, settings, theme, loading]);

  return <div ref={chartRef} className={className} />;
};

export default ReactEcharts;
