"use client";
import * as React from "react";

import { EChartsOption } from "echarts/types/dist/echarts";

import { AxisChartData } from "types/visualizations";
import {
  computeLegendColors,
  constructSeries,
} from "@/lib/visualizations/chart/helper";
import { SeriesOption } from "echarts";
import Legend from "../ui/legend";
import { with_legend, with_options } from "@/lib/types/utils";
import { useThemeColors } from "../theme-provider";
import dynamic from "next/dynamic";
interface AxisChartProp extends with_legend, with_options {
  data: AxisChartData;
  type: "line" | "bar";
}
const ReactEcharts = dynamic(() => import("./generic/echarts"), { ssr: false });
const AxisChartView = ({ data, type, legend, options }: AxisChartProp) => {
  const activeTheme = useThemeColors();
  const theme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : "light";
  const isDarkTheme = theme === "dark";
  const colors = isDarkTheme
    ? type === "bar"
      ? activeTheme.barChart.dark.colors
      : activeTheme.barChart.light.colors
    : type === "line"
    ? activeTheme.lineChart.dark.colors
    : activeTheme.lineChart.light.colors;

  const { headers, values } = data;
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },

    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: type === "line" ? false : true,
        data: headers,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: constructSeries(values, colors, false, type, false) as SeriesOption,
  };
  return (
    <div className="relative mt-[4%] flex flex-col items-center">
      {legend && <Legend legendData={computeLegendColors(data, colors)} />}
      <div className="w-full mt-4 h-[80vh]">
        <ReactEcharts option={option} className="w-full h-full" />
      </div>
    </div>
  );
};
export default AxisChartView;
