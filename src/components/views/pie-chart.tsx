"use client";
import * as React from "react";
import ReactEcharts from "./generic/echarts";
import { EChartsOption } from "echarts/types/dist/echarts";
import { PieChartData } from "types/visualizations";
import {
  computeLegendColors,
  computeValues,
} from "@/lib/visualizations/pieFunnel/helper";
import Legend from "../ui/legend";
import { with_legend, with_options } from "@/lib/types/utils";
import { useThemeColors } from "../theme-provider";

interface PieProp extends with_legend, with_options {
  data: PieChartData;
}

const PieView = ({ data,  legend, options }: PieProp) => {
  const activeTheme = useThemeColors();
  const theme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : "light";
  const isDarkTheme = theme === "dark";
  const colors = isDarkTheme
    ? activeTheme.pieChart.dark.colors
    : activeTheme.pieChart.light.colors;

  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: true,
        },
        data: computeValues(data, colors),
      },
    ],
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
export default PieView;
