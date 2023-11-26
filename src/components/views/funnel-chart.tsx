'use client'
import * as React from "react";
import { EChartsOption } from "echarts/types/dist/echarts";
import { FunnelData } from "types/visualizations";
import {
  computeLegendColors,
  computeValues,
} from "@/lib/visualizations/pieFunnel/helper";
import Legend from "../ui/legend";
import { with_legend, with_options } from "@/lib/types/utils";
import { useThemeColors } from "../theme-provider";
import dynamic from "next/dynamic";

interface FunnelProp extends with_legend, with_options {
  data: FunnelData;
}
const ReactEcharts = dynamic(() => import("./generic/echarts"), { ssr: false });
const FunnelView = ({ data,  legend, options }: FunnelProp) => {
  const activeTheme = useThemeColors();
  const theme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : "light";
  const isDarkTheme = theme === "dark";
  const colors = isDarkTheme
    ? activeTheme.funnel.dark.colors
    : activeTheme.funnel.light.colors;

  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "funnel",
        minSize: "0%",
        maxSize: "100%",
        gap: 2,
        label: {
          show: true,
          position: "inside",
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: "solid",
          },
        },
        emphasis: {
          label: {
            fontSize: 20,
          },
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
export default FunnelView;
