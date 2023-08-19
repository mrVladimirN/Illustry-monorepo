"use client";
import React, { useRef, useEffect } from "react";


// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
import { SankeyChart, GraphChart, HeatmapChart  } from "echarts/charts";
// Import the tooltip, title, rectangular coordinate system, dataset and transform components
import {
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  VisualMapComponent,
  CalendarComponent 
} from "echarts/components";

import { SVGRenderer } from "echarts/renderers";

import { EChartsOption, SetOptionOpts, HeatmapSeriesOption } from "echarts/types/dist/echarts";

export interface ReactEChartsProps<T> {
  option: T;
  className?: string ;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "dark";
}

const ReactEcharts = <T extends EChartsOption>({
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
    LegendComponent ,
    HeatmapChart,
    VisualMapComponent,
    CalendarComponent 
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
    if (chartRef.current !== null) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      chart?.setOption(option as any, settings);
    }
  }, [option, settings, theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return (
    <div ref={chartRef} className={className}  />
  );
};

export default ReactEcharts;
